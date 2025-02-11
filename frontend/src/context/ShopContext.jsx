import React,{ createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets"; for local data
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token , setToken] = useState("");
    const navigate = useNavigate();

    //run getProducts while mounting
    useEffect( ()=>{
        getProductsData();
    },[]);

    

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
        console.log(token);

        // Bug: without backend monogDB cart entry frontend is updating cart state variable and showing in cart
        if (token) {
            try{
                await axios.post(backendUrl+ '/api/cart/add', {itemId, size}, {headers:{token}});

            } catch (error){
                console.log(error);
                toast.error(error.message);
            }
        }
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
                   console.log(error);
                   toast.error(error.message);
                }
            }
            
        }
        return totalCount;
    }

    // useEffect( ()=>{
    //     // console.log(cartItems);
    // },[cartItems]
    // )


    // TO update in cartData the modification of quantity made by input or dutbin --->Cart.jsx
    const updateQuantity = async (itemId, size, quantity)=> {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if (token){
            try{
                await axios.post(backendUrl + '/api/cart/update', {itemId,size,quantity}, {headers:{token}});
            } catch (error){

            }
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{}, {headers: {token}});
            if (response.data.success){
                setCartItems(response.data.cartData);
            }
        } catch (error){    
            console.log(error);
            toast.error(error.message);
        }
    }

    // Page: Cart: to get total amount of price of product of card
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems){
            let itemInfo =  products.find((product)=> product._id === items);
            for (const item in cartItems[items]){
                try{
                    if (cartItems[items][item] > 0 && itemInfo){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }
        return totalAmount;
    } 

    // Get products from mongoDB       
    const getProductsData = async ()=>{
        try{
            const response = await axios.get(backendUrl + '/api/product/list');
            // console.log(response.data);
            if (response.data.success){
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    
    //when browser is refreshed, token from the local storage will be uploaded to token state variable while mouting if exists   
    useEffect(()=>{
        if (!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    },[]);

    const value = {
        products, 
        currency, 
        delivery_fee,
        search, 
        setSearch, 
        showSearch, 
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,


    };

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )


}

export default ShopContextProvider;