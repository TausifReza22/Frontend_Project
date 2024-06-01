import React, { useState, useEffect } from 'react';

const SaleOrderForm = ({ order, onSave, readOnly }) => {
  const [formData, setFormData] = useState({ name: '', details: '', isPaid: false });

  useEffect(() => {
    if (order) {
      setFormData({ 
        name: order.name, 
        details: order.details,
        isPaid: order.isPaid || false // default to false if not provided
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!readOnly) {
      onSave({ ...formData, id: order ? order.id : null });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Order Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          readOnly={readOnly}
          required
        />
      </div>
      <div>
        <label>Order Details:</label>
        <input
          type="text"
          name="details"
          value={formData.details}
          onChange={handleChange}
          readOnly={readOnly}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="isPaid"
            checked={formData.isPaid}
            onChange={handleChange}
            disabled={readOnly}
          />
          Order Paid
        </label>
      </div>
      {!readOnly && <button type="submit">Save</button>}
    </form>
  );
};

export default SaleOrderForm;
