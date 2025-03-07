import { create } from "zustand";

interface LoadingState {
    loading: Record<string, boolean>;
    setLoading: (key:string, value: boolean) => void;
  }

const useLoadingStore = create<LoadingState>((set)=>({
    loading: {},
    setLoading: (key, value)=>set(state=>({
        loading: {...state.loading, [key]:value}
    }))
}))

export {useLoadingStore}