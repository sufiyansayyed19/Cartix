import React,{ createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";
    const delivery_fee = 10;
    const [ search, setSearch ] = useState('');
    const [ showSearch, setShowSearch ] = useState(true);
    const [ cartItems, setCartItems ] = useState({});
    const navigate = useNavigate();


    // Product.jsx: to add item in cart from product page
    const addToCart = async (itemId, size)=> {
        if (!size){
            toast.error('Please Select the Size');
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }


    // Navbar.jsx: to get quantity of items to show on bag
    const getCartCount = ()=> {
        let totalCount = 0;
        for(const items in cartItems){
            for (const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error){

                }
            }
            
        }
        return totalCount;
    }

    useEffect( ()=>{
        console.log(cartItems);
    },[cartItems]
    )


    // TO update in cartData the modification of quantity made by input or dutbin --->Cart.jsx
    const updateQuantity = async (itemId, size, quantity)=> {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }


    // Page: Cart: to get total amount of price of product of card
    const getCartAmount = async => {
        let totalAmount = 0;
        for (const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for (const item in cartItems[items]){
                try{
                    if (cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    } 


    const value = {
        products, 
        currency, 
        delivery_fee,
        search, 
        setSearch, 
        showSearch, 
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,


    };

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )


}

export default ShopContextProvider;