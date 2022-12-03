import { useState, useEffect } from "react";
import { useShopContext } from "../contexts/ShopContext";


export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const items = localStorage.getItem(key);
        if(!items) {
            return initialValue
        }

        if(items) {
            console.log(items)
            const data = JSON.parse(items);

            return data
        }

        if(typeof initialValue === "function"){
            return initialValue();
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export const useStorageFunctions = () => {
    const [savedShops, setSavedShops] = useLocalStorage("saved-shops", []);
    const { shops } = useShopContext();

    const isLiked = (id) => {
        if(savedShops.filter(item => item._id === id).length > 0){
          return true
        }
        return false
    }
    
    const likeShop = (id) => {
        const likedShop = shops.find(item => item._id === id);

        setSavedShops(prev => {
            return [...prev, {
                _id: likedShop._id,
                businessName: likedShop.businessName,
                image: likedShop.image,
                liked: true

            }]
        })
    }

    const unLikeShop = (id) => {
        setSavedShops(savedShops.filter(item => {
            return item._id !== id
        }))
    }

    return {isLiked, likeShop, unLikeShop, savedShops};

}