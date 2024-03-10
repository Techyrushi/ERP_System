import React, { useState } from 'react';
import { ORDERS_DATA } from '../lib/constants/config';

const STATUS_COLORS = {
  placed: 'bg-blue-400',
  confirmed: 'bg-orange-400',
  shipped: 'bg-green-400',
  out_for_delivery: 'bg-yellow-400',
  delivered: 'bg-green-500',
};

const OrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [updatedOrders, setUpdatedOrders] = useState([...ORDERS_DATA]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const ordersPerPage = 6;
  const totalPages = Math.ceil(updatedOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleDropdown = (orderId) => {
    setOpenDropdownId(openDropdownId === orderId ? null : orderId);
    setSelectedStatus(null); // Reset selected status when toggling dropdown
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrderList = updatedOrders.map((order) =>
      order.id === orderId ? { ...order, orderStatus: newStatus } : order
    );
    setUpdatedOrders(updatedOrderList);
    toggleDropdown(orderId); // Close the dropdown after status change
  };

  const handleDelete = (orderId) => {
    const updatedOrderList = updatedOrders.filter((order) => order.id !== orderId);
    setUpdatedOrders(updatedOrderList);
  };

  const getStatusClass = (status) => {
    return `inline-block py-1 px-3 rounded-full ${STATUS_COLORS[status]} text-white`;
  };

  const paginatedOrders = updatedOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const orderStatusOptions = [
    { value: 'placed', label: 'Placed', color: 'bg-blue-400' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-orange-400' },
    { value: 'shipped', label: 'Shipped', color: 'bg-green-400' },
    { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-yellow-400' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-500' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Product ID</th>
            <th className="py-3 px-6 text-left">Customer Name</th>
            <th className="py-3 px-6 text-left">Order Date</th>
            <th className="py-3 px-6 text-left">Order Total</th>
            <th className="py-3 px-6 text-left">Shipping Address</th>
            <th className="py-3 px-6 text-left">Order Status</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {paginatedOrders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200">
              <td className="py-3 px-6 text-left">{order.id}</td>
              <td className="py-3 px-6 text-left">{order.productId}</td>
              <td className="py-3 px-6 text-left">{order.customerName}</td>
              <td className="py-3 px-6 text-left">{order.orderDate}</td>
              <td className="py-3 px-6 text-left">{order.orderTotal}</td>
              <td className="py-3 px-6 text-left">{order.shippingAddress}</td>
              <td className="py-3 px-6 text-left">
                <span className={getStatusClass(order.orderStatus)}>
                  {order.orderStatus}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <button
                    type="button"
                    className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium ${
                      openDropdownId === order.id ? 'text-white ' + STATUS_COLORS[selectedStatus] : 'text-gray-700 bg-white'
                    } hover:bg-gray-50 focus:outline-none`}
                    aria-haspopup="true"
                    aria-expanded={openDropdownId === order.id ? 'true' : 'false'}
                    onClick={() => toggleDropdown(order.id)}
                  >
                    {openDropdownId === order.id ? (
                      <>
                        {selectedStatus && (
                          <span className={`mr-2 ${getStatusClass(selectedStatus)}`}></span>
                        )}
                        {selectedStatus || 'Actions'}
                      </>
                    ) : (
                      'Actions'
                    )}
                  </button>
                  {openDropdownId === order.id && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {orderStatusOptions.map((status) => (
                          <button
                            key={status.value}
                            onClick={() => handleStatusChange(order.id, status.value)}
                            className={`block w-full px-4 py-2 text-sm text-left leading-5 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                              status.color
                            } text-white`}
                            role="menuitem"
                          >
                            {status.label}
                          </button>
                        ))}
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="block w-full px-4 py-2 text-sm text-left leading-5 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 bg-red-500 text-white"
                          role="menuitem"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`px-3 py-1 mx-1 rounded-md text-sm ${
              currentPage === index + 1 ? 'bg-blue-500 text-white focus:outline-none' : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;
