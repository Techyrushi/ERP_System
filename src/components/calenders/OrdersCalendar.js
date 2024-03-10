// OrdersCalendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ORDERS_DATA } from '../lib/constants/config';

const STATUS_COLORS = {
  placed: 'bg-blue-400',
  confirmed: 'bg-orange-400',
  shipped: 'bg-green-400',
  out_for_delivery: 'bg-yellow-400',
  delivered: 'bg-green-500',
};

const OrdersCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleCalendarChange = (date) => {
    setSelectedDate(date);
    const filteredOrders = ORDERS_DATA.filter(
      (order) =>
        new Date(order.orderDate).toDateString() === date.toDateString()
    );
    setSelectedOrders(filteredOrders);
  };

  return (
    <div className="flex flex-col items-center"><br/>
      <h2 className="text-3xl font-semibold mb-4">Orders Calendar View</h2>
      <div className="bg-white p-6 rounded-md shadow-md mb-4">
        <Calendar
          onChange={handleCalendarChange}
          value={selectedDate}
          className="custom-calendar-style" // Add your custom styling class
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Orders due for delivery on {selectedDate.toDateString()}:
        </h3>
        {selectedOrders.length > 0 ? (
          <table className="min-w-full table-auto border-collapse bg-white p-6 rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Product ID</th>
                <th className="py-3 px-6 text-left">Customer Name</th>
                <th className="py-3 px-6 text-left">Order Date</th>
                <th className="py-3 px-6 text-left">Order Total</th>
                <th className="py-3 px-6 text-left">Shipping Address</th>
                <th className="py-3 px-6 text-left">Order Status</th>
                {/* Add other columns based on your order structure */}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {selectedOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-left">{order.id}</td>
                  <td className="py-3 px-6 text-left">{order.productId}</td>
                  <td className="py-3 px-6 text-left">{order.customerName}</td>
                  <td className="py-3 px-6 text-left">{order.orderDate}</td>
                  <td className="py-3 px-6 text-left">{order.orderTotal}</td>
                  <td className="py-3 px-6 text-left">{order.shippingAddress}</td>
                  <td className="py-3 px-6 text-left">
                    <span className={`inline-block py-1 px-3 rounded-full ${STATUS_COLORS[order.orderStatus]} text-white`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  {/* Add other columns based on your order structure */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders due for delivery on {selectedDate.toDateString()}.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersCalendar;
