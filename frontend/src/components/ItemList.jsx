// src/components/ItemList.js
import React, { useState, useEffect } from 'react';
import axios from '../axios';  // Import the custom axios instance

const ItemList = ({ itemsUpdated }) => {
  const [items, setItems] = useState([]);

  // Fetch items from the backend
  useEffect(() => {
    axios.get('items')  // No need to specify the base URL, since it's already set in axios.js
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the items:', error);
      });
  }, [itemsUpdated]);  // Refetch items when the `itemsUpdated` state changes

  // Handle item deletion
  const handleDelete = (id) => {
    axios.delete(`items/${id}`)  // Specify the endpoint relative to the base URL
      .then(response => {
        setItems(items.filter(item => item.id !== id)); // Remove item from the list
      })
      .catch(error => {
        console.error('There was an error deleting the item:', error);
      });
  };

  return (
    <div className="item-list-container">
      <h2>Items</h2>
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id} className="item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
