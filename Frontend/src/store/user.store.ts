import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  displayName: string;
  email: string;
}

interface Details {
  email: string;
  password: string;
}

interface UserState {
  user: User;
  token: string;
  login: (details: Details) => Promise<void>;
  logout: (token: string) => Promise<void>;
  refreshAccessToken: ()=>Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  user: {
    id: "",
    displayName: "",
    email: "",
  },
  token: "",
  login: (details) => {
    const url = "http://localhost:3001/api/v1/users/login";
    return new Promise<void>(async (resolve, reject) => {
        axios
        .post(url, details,{withCredentials: true})
        .then((response)=>{
            console.log(response);
            set(()=>({token: response.data.data.accessToken}))
            resolve()
        })
        .catch((err)=>{
            console.log(err);
            set(()=>({token: ""}))
            reject(err.response.data.message)
        })
    });
  },
  logout: (token: string) => {return new Promise<void>(async(resolve, reject)=>{
    const url = "http://localhost:3001/api/v1/users/logout";
    axios.post(url,{},{
        headers:{
            'Authorization':`Bearer ${token}`
        },
        withCredentials: true
    })
    .then(()=>{
        set(()=>({token: ""}))
        resolve()
    })
    .catch(async (err)=>{
        console.log(err);
        if(err.response.data.message === 'ACCESS_TOKEN_EXPIRED'){
            await useUserStore.getState().refreshAccessToken()
            await useUserStore.getState().logout(useUserStore.getState().token)
        }
        else reject(err)
    })
    
  })},
  refreshAccessToken: ()=>{
    return new Promise<void>(async(resolve, reject)=>{
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:3001/api/v1',
            withCredentials: true,
          });
        axiosInstance
        .post('/users/refreshAccessToken')
        .then((response)=>{
            set(()=>({token: response.data.data.accessToken}))
            resolve()
        })
        .catch((err)=>{reject(err)})
    })
  }
}));

export { useUserStore };
