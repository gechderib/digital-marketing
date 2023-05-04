import React from "react";
import GraphDashboard from "./GraphDashboard";

const TableOrders = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:w-2/3">
      <GraphDashboard/>
      <div className="flex justify-between px-3 mb-3">
        <p className="font-bold text-xl">Latest Order</p>
        <div className="cursor-pointer bg-gray-900 px-3 py-1 rounded-md hover:bg-gray-950">
          <p className="text-white">View all orders</p>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Billing Name
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              10 Mar 2023
            </th>
            <td className="px-6 py-4">Teff</td>
            <td className="px-6 py-4">Getachew D.</td>
            <td className="px-6 py-4">Br.5690</td>
            <td className="px-6 py-4">Pending</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              13 Apr 2022
            </th>
            <td className="px-6 py-4">Wheat</td>
            <td className="px-6 py-4">Solomon K.</td>
            <td className="px-6 py-4">Br.4563</td>
            <td className="px-6 py-4">Done</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              09 Jul 2002
            </th>
            <td className="px-6 py-4">Onion</td>
            <td className="px-6 py-4">Wasihun D.</td>
            <td className="px-6 py-4">Br.23</td>
            <td className="px-6 py-4">Done</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableOrders;
