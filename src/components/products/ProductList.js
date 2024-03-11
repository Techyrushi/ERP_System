import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const ProductTable = ({ products: initialProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: null,
    name: "",
    category: "",
    price: 0,
    stockQuantity: 0,
    description: "",
  });
  const [products, setProducts] = useState(initialProducts);

  const productsPerPage = 5;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddClick = () => {
    setAddFormVisible(true);
  };

  const handleSaveClick = () => {
    if (newProduct.id) {
      // If newProduct has an id, it means we are editing an existing product
      const updatedProducts = products.map((product) =>
        product.id === newProduct.id ? newProduct : product
      );
      setProducts(updatedProducts);
    } else {
      // If newProduct doesn't have an id, it means we are adding a new product
      setProducts([{ ...newProduct, id: Date.now() }, ...products]);
    }

    // Reset the form and hide it
    setNewProduct({
      id: null,
      name: "",
      category: "",
      price: 0,
      stockQuantity: 0,
      description: "",
    });
    setAddFormVisible(false);
  };

  const handleCancelClick = () => {
    setAddFormVisible(false);
  };

  const handleEditClick = (productId) => {
    // Find the index of the product to edit
    const productIndex = products.findIndex((product) => product.id === productId);

    // If the product is found, update the newProduct state
    if (productIndex !== -1) {
      const productToEdit = products[productIndex];
      setNewProduct({ ...productToEdit });
      setAddFormVisible(true);
    }
  };

  const handleDeleteClick = (productId) => {
    // Filter out the product with the specified ID
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="overflow-x-auto">
      {/* Add Button */}
      <button
        onClick={handleAddClick}
        className="bg-green-500 text-white py-2 px-4 rounded-md mb-4"
      >
        Add Product
      </button>

      {/* Modal for Add Form */}
      {isAddFormVisible && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white p-4 mb-4 rounded-md">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Product Name:
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="border rounded w-full py-2 px-3 mb-2"
                />

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Product Category:
                </label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="border rounded w-full py-2 px-3 mb-2"
                />

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Product Price:
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  className="border rounded w-full py-2 px-3 mb-2"
                />

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Stock Quantity:
                </label>
                <input
                  type="number"
                  value={newProduct.stockQuantity}
                  onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: parseInt(e.target.value) })}
                  className="border rounded w-full py-2 px-3 mb-2"
                />

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description:
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="border rounded w-full py-2 px-3 mb-2"
                />

                <button
                  onClick={handleSaveClick}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Table */}
      <table className="w-full table-auto border-collapse overflow-y-scroll">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Product Name</th>
            <th className="py-3 px-6 text-left">Product Category</th>
            <th className="py-3 px-6 text-left">Product Price</th>
            <th className="py-3 px-6 text-left">Stock Quantity</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className="text-gray-600 text-sm font-light">
          {paginatedProducts.map((product) => (
            <tr
              key={product.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {product.name}
              </td>
              <td className="py-3 px-6 text-left">{product.category}</td>
              <td className="py-3 px-6 text-left">₹{product.price}</td>
              <td className="py-3 px-6 text-left">{product.stockQuantity}</td>
              <td className="py-3 px-6 text-left">{product.description}</td>
              <td className="py-3 px-6 text-left flex">
                <button
                  onClick={() => handleEditClick(product.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  <AiOutlineEdit fontSize={18} />
                </button>
                <button
                  onClick={() => handleDeleteClick(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  <AiOutlineDelete fontSize={18} />
                </button>
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
              currentPage === index + 1
                ? "bg-blue-500 text-white focus:outline-none"
                : "bg-gray-200 text-gray-600"
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

export default ProductTable;
