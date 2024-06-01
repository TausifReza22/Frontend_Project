import React, { useState } from 'react';
import Modal from './Modal';
import SaleOrderForm from './SaleOrderForm';
import { ThemeContext } from './ThemeContext';


const ActiveSaleOrders = () => {
  const [activeOrders, setActiveOrders] = useState([
    { id: 1, name: 'Phone', details: 'Dharamshala' },
  ]);


  const [selectedOrder, setSelectedOrder] = useState(null);
  const [setshowModel, setsetshowModel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddOrder = () => {
    console.log("My name is Nagendra Yadav")
    setSelectedOrder(null);
    setIsEditing(false);
    setsetshowModel(true);
  };

  const handleEditOrder = (order) => {
    console.log(order)
    setSelectedOrder(order);
    setIsEditing(true);
    setsetshowModel(true);
  };



  const handleSaveOrder = (order) => {
    if (isEditing) {
      setActiveOrders(activeOrders.map((o) => (o.id === order.id ? order : o)));
    } else {
      setActiveOrders([...activeOrders, { ...order, id: activeOrders.length + 1 }]);
    }
    setsetshowModel(false);
  };

  const { theme, toggleTheme } = React.useContext(ThemeContext);


  return (
    <div className={`sale-orders ${theme}`}>
      <h2>Active Sale Orders</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={handleAddOrder}>+ Sale Order</button>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Name</th>
            <th>Order Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activeOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.details}</td>
              <td>
                <button onClick={() => handleEditOrder(order)}>...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {setshowModel && (
        <Modal>
          <SaleOrderForm order={selectedOrder} onSave={handleSaveOrder} readOnly={false} />
        </Modal>
      )}
    </div>
  );
};

export default ActiveSaleOrders;
