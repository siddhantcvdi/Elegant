import {create} from "zustand";
import axios from "axios";

interface Category{
    _id: string;
    name: string;
}

interface CategoryState {
    categories: Category[];
    fetchCategories: () => Promise<void>;
}

const useCategoriesStore = create<CategoryState>((set) => ({
    categories: [],
    fetchCategories: () => {
        const url = "http://localhost:3001/api/v1/categories/all";
        return new Promise<void>((resolve, reject) => {
            axios
                .get(url)
                .then((response) => {
                    console.log(response.data.data);
                    set(() => ({categories: response.data.data}));
                    resolve();
                })
                .catch((err) => {
                    console.log(err);
                    reject(err.response.data.message);
                });
        });
    },
}));

export default useCategoriesStore;