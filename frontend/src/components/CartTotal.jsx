import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

// Page: Cart

const CartTotal = () => {
    
    const { currency , delivery_fee, getCartAmount, products } = useContext(ShopContext);
    const [cartAmount, setCartAmount] = useState(0);

    useEffect(() => {
      const fetchCartAmount = async () => {
        const amount = await getCartAmount();
        setCartAmount(amount);
      };
  
      fetchCartAmount();
    }, [getCartAmount]); 

    return (
        <div className='w-full'>
        <div className='text-2xl'>
          <Title text1={'CART'} text2={'TOTALS'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{currency} {cartAmount}.00</p>
            </div>
            <hr />
            <div className= 'flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency} {delivery_fee}.00 </p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Total</p>
                <p>{currency} {products.length === 0 ? "Loading..." : cartAmount+ delivery_fee}.00</p>
            </div>
        </div>
    </div>
  )
}

export default CartTotal