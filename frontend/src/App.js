import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [itemsUpdated, setItemsUpdated] = useState(false);

  const handleItemSaved = () => {
    setItemsUpdated(!itemsUpdated); // Toggle state to refresh items list
  };
  return (
    <div className="App">
      <Header/>
      <ItemForm onItemSaved={handleItemSaved}/>
      <ItemList itemsUpdated={itemsUpdated}/>
    </div>
  );
}

export default App;
