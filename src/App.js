import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./components/products/Products";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/shared/Layout";
import OrdersPage from "./components/orders/OrdersPage";
import OrdersCalendar from "./components/calenders/OrdersCalendar";

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "calenders",
        element: <OrdersCalendar />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <OrdersPage/>
      },
      {
        path: "/",
        element: <Dashboard />,
        index: true
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={approuter}>
      <div className=""></div>
    </RouterProvider>
  );
}

export default App;
