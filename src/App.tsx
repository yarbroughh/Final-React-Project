//A layout that includies navigation and footer and uses "Outlet" to show
//route components. Also handles the cart with useState, 
// including displaying count of items in nav.

import './App.css';
import Navigation from './Navigation';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import type { StoreItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<StoreItem[]>([]); //Add state for cart

  const handleAddToCart = (item: StoreItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleClearCart = () => { //clear cart items after order submission
    setCartItems([]);
  };

  return (
    <>
      <Navigation cartCount={cartItems.length} /> {/*Count # of cart items in nav bar*/}
      <Outlet context={{ addToCart: handleAddToCart, cartItems, clearCart: handleClearCart }} />
      <Footer />
    </>
  );
}

export default App;
