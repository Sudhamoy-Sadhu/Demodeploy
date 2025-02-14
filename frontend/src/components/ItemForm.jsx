// src/components/ItemForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemForm.css';

const ItemForm = ({ itemId, onItemSaved }) => {
  const [item, setItem] = useState({
    name: '',
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch item data if editing an existing item
  useEffect(() => {
    if (itemId) {
      setIsEditing(true);
      axios.get(`http://localhost:8080/api/items/${itemId}`)
        .then(response => {
          setItem(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the item:', error);
        });
    }
  }, [itemId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // Handle form submission (create or update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update item
      axios.put(`http://localhost:8080/api/items/${itemId}`, item)
        .then(response => {
          onItemSaved(); // Call parent component function to refresh the list
          setItem({ name: '', description: '' }); // Clear the form
        })
        .catch(error => {
          console.error('There was an error updating the item:', error);
        });
    } else {
      // Create new item
      axios.post('http://localhost:8080/api/items', item)
        .then(response => {
          onItemSaved(); // Call parent component function to refresh the list
          setItem({ name: '', description: '' }); // Clear the form
        })
        .catch(error => {
          console.error('There was an error creating the item:', error);
        });
    }
  };

  return (
    <div className="item-form-container">
      <h2>{isEditing ? 'Edit Item' : 'Create Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={item.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">{isEditing ? 'Update Item' : 'Create Item'}</button>
      </form>
    </div>
  );
};

export default ItemForm;
