import React, { useState } from 'react';
import Modal from './Modal';
import SaleOrderForm from './SaleOrderForm';
import { ThemeContext } from './ThemeContext';

const CompletedSaleOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([
    { id: 1, name: 'Order 2', details: 'Details of order 2' },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <div className={`sale-orders ${theme}`}>
      <h2>Completed Sale Orders</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
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

          {completedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.details}</td>
              <td>
                <button onClick={() => handleViewOrder(order)}>...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal>
          <SaleOrderForm order={selectedOrder} readOnly={true} />
        </Modal>
      )}
    </div>
  );
};

export default CompletedSaleOrders;
