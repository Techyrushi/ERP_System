import { Link } from 'react-router-dom';
import BoxWrapper from "./BoxWrapper";
import { IoBagHandle, IoCart } from "react-icons/io5";

const DashboardStartsGrid = () => {
  return (
    <div className="flex gap-4 w-full py-3 px-4 pb-1">
    <Link to="/products" className="flex-1">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Products</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              ₹10,000
            </strong>
            <span className="text-sm text-green-500 pl-2">+50</span>
          </div>
        </div>
      </BoxWrapper>
    </Link>
    <Link to="/orders" className="flex-1">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Orders</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              100
            </strong>
            <span className="text-sm text-green-500 pl-2">+43</span>
          </div>
        </div>
      </BoxWrapper>
    </Link>
  </div>
  
  );
};

export default DashboardStartsGrid;
