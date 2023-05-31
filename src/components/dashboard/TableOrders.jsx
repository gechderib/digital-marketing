import React, { useEffect } from "react";
import GraphDashboard from "./GraphDashboard";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  getAllOrders,
  orderStatus,
} from "../../features/orders/myOrdersSlice";
import TableLoading from "../tables/TableLoading";

const TableOrders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const orderStat = useSelector(orderStatus);
  const orders = useSelector(allOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders({ token }));
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:w-2/3">
      <GraphDashboard />
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
          {orderStat == "loading" ? (
            <TableLoading/>
          ) : orderStat == "failed" ? (
            <tr>failed error happen please try again</tr>
          ) : orderStat == "succeeded" ? (
            <>
              {orders.map((order) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.createdAt}
                  </th>
                  <td className="px-6 py-4">{order.product.name}</td>
                  <td className="px-6 py-4">{order.orderBy.firstName} {order.orderBy.lastName}</td>
                  <td className="px-6 py-4">Br.{order.offerPrice}</td>
                  <td className="px-6 py-4">{order.accepted}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default TableOrders;
