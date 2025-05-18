import './App.css';
import Navigation from './Navigation';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import type { StoreItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<StoreItem[]>([]); //Add state for cart*

  const handleAddToCart = (item: StoreItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleClearCart = () => { //the cart items need to be cleared after order submission
    setCartItems([]);
  };

  return (
    <>
      <Navigation cartCount={cartItems.length} /> {/*Add to display # of items in nav bar*/}
      <Outlet context={{ addToCart: handleAddToCart, cartItems, clearCart: handleClearCart }} />
      <Footer />
    </>
  );
}

export default App;
