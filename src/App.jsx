import { useState } from "react";
import Form from "./Form";
import { nanoid } from 'nanoid'
import Items from "./Items";
import { ToastContainer, toast } from 'react-toastify'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    list = JSON.parse(localStorage.getItem('list'))
  } else {
    list = []
  }
  return list
}

const defaultList = JSON.parse(localStorage.getItem('list') || '[]')

const setLocalStorage = (item) => {
  localStorage.setItem('list', JSON.stringify(item));
};

const App = () => {
  const [items, setItems] = useState(defaultList);

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid()
    }
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems)
    toast.success('Item added to the list')
  }

  const removeItem = (itemId) => {
    const newItem = items.filter((item) => item.id !== itemId);
    setItems(newItem);
    setLocalStorage(newItem)
    toast.success('Item removed')

  }

  const editItem = (itemId) => {
    const newItem = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed }
        return newItem;
      }
      return item
    })
    setItems(newItem);
    setLocalStorage(newItem)

  }

  return <section className="section-center">
    <ToastContainer position="top-center" />
    <Form addItem={addItem} />
    <Items items={items} removeItem={removeItem} editItem={editItem} />
  </section>;
};

export default App;
