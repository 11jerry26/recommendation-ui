import { Product } from "@/utils/t-type";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore('productStore',() => {
    const currentProduct = ref<Product | null>(null)
    const setCurrentProduct = (product : Product) => {
        currentProduct.value = product
    }

    return{
        currentProduct,
        setCurrentProduct
    }
},{
    persist:true
})