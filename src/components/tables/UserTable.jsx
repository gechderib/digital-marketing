import React, { useContext } from "react";
import SingleItem from "./SingleUser";
import DmfsseContex from "../../app/contextStore";
import Modal from "../Modal";

const ItemTable = ({ prop1, prop2, prop3, prop4 }) => {
  const tableCtx = useContext(DmfsseContex);
  return (
    <div className="overflow-auto rounded-lg border border-gray-200 shadow-md m-5">
      {tableCtx.showModal?<Modal/>:null}
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              {prop1}
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              {prop2}
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              {prop3}
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              {prop4}
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {tableCtx.dashboardTab === "users" ? (
            <SingleItem
              img={
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              name={"Getachew Derib"}
              phoneNumber={"+251953890542"}
              status={"Active"}
              prop1={"Farmer"}
              prop2={"23/3/2023"}
            />
          ) : tableCtx.dashboardTab === "products" ? (
            <SingleItem
              img={""}
              name={"Teff"}
              phoneNumber={"0964738493"}
              status={"available"}
              prop1={"450Kg"}
              prop2={"60 .Br/kg"}
            />
          ) : tableCtx.dashboardTab === "training" ? (
            <SingleItem
              img={"https://fastly.picsum.photos/id/536/200/200.jpg?hmac=Ncz_gqWPnq2UI5u-tKvEfwaXLLhoc4ryLBjGJ7fjR1c"}
              name={"Soil Conservation"}
              status={"345"}
              prop1={"23/10/2023"}
              prop2={"Getachew Derib"}
            />
          ) : (
            <p></p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
