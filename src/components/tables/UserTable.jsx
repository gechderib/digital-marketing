import React, { useContext, useEffect } from "react";
import SingleItem from "./SingleUser";
import DmfsseContex from "../../app/contextStore";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  allTrainings,
  getAllTrainings,
  trainingError,
  trainingStatus,
} from "../../features/training/trainingSlice";

import { addDetailData } from "../../features/training/trainingSlice";
import {
  addProductDetail,
  allProducts,
  getAllProducts,
  productError,
  productStatus,
} from "../../features/product/productSlice";
import { addUserDetail, allUsers, getAllFarmers, getAllUsers, registerError, registerStatus } from "../../features/signup/signupSlice";

const ItemTable = ({ prop1, prop2, prop3, prop4 }) => {
  const dispatch = useDispatch();

  const tableCtx = useContext(DmfsseContex);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const trainings = useSelector(allTrainings);
  const trainStatus = useSelector(trainingStatus);
  const trainError = useSelector(trainingError);

  const products = useSelector(allProducts);
  const prodStatus = useSelector(productStatus);
  const prodError = useSelector(productError);

  const users = useSelector(allUsers)
  const userStatus = useSelector(registerStatus)
  const userError = useSelector(registerError)

  useEffect(() => {
    if (tableCtx.dashboardTab === "users") {
      if(userStatus == "idle" && user.roles[0] === "admin") {
        dispatch(getAllUsers({token}))
        console.log(user.roles)
      }
      if(userStatus == "idle" && user.roles[0] === "agent"){
        dispatch(getAllFarmers({token}))
      }
    }
    if (tableCtx.dashboardTab === "products") {
      if (prodStatus == "idle") {
        dispatch(getAllProducts({page: 0 }));
      }
    }
    if (tableCtx.dashboardTab === "training") {
      if (trainStatus == "idle") {
        dispatch(getAllTrainings({ token, page: 0 }));
      }
    }
  }, [trainStatus, prodStatus, dispatch]);
  console.log(productStatus);
  return (
    <div className="overflow-auto rounded-lg border border-gray-200 shadow-md m-5">
      {tableCtx.showModal ? <Modal /> : null}
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
        {tableCtx.dashboardTab === "users" ? (
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {userError ? (
              <td>Error happen cant fetch the data</td>
            ) : userStatus === "loading" ? (
              <td>Loading</td>
            ) : userStatus == "succeeded" ? (
              users.map((user) => (
                <SingleItem
                  onDetailClick={() => {
                    tableCtx.setShowDetail(true);
                    tableCtx.setDetailData(user);
                    dispatch(addUserDetail(user));
                  }}
                  img={user.profilePicture}
                  onEdite={() => {
                    tableCtx.setIsEditing(true);
                    tableCtx.setDetailData(user);
                    dispatch(addUserDetail(user));
                  }}
                  onDelete={() => {
                    tableCtx.setShowModal(true);
                    tableCtx.setDetailData(user);
                    dispatch(addUserDetail(user));
                  }}
                  phoneNumber={user.phoneNumber}
                  name={`${user.firstName} ${user.lastName}`}
                  status={user.verified ? <span class="material-symbols-outlined h-4 w-4">
                  verified_user
                  </span> : "not verified"}
                  prop1={user.roles[0]}
                  prop2={user.createdAt}
                />
              ))
            ) : (
              <p>something went wrong please check your connection</p>
            )}
          </tbody>
        ) : tableCtx.dashboardTab === "products" ? (
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {prodError ? (
              <td>Error happen cant fetch the data</td>
            ) : prodStatus === "loading" ? (
              <td>Loading</td>
            ) : prodStatus == "succeeded" ? (
              products.map((product) => (
                <SingleItem
                  onDetailClick={() => {
                    tableCtx.setShowDetail(true);
                    tableCtx.setDetailData(product);
                    dispatch(addProductDetail(product));
                  }}
                  img={product.photo}
                  onEdite={() => {
                    tableCtx.setIsEditing(true);
                    tableCtx.setDetailData(product);
                    dispatch(addProductDetail(product));
                  }}
                  onDelete={() => {
                    tableCtx.setShowModal(true);
                    tableCtx.setDetailData(product);
                    dispatch(addProductDetail(product));
                  }}
                  phoneNumber={product.postedBy.phoneNumber}
                  name={product.name}
                  status={product.soldout ? "sold out" : "available"}
                  prop1={product.amount}
                  prop2={product.price}
                />
              ))
            ) : (
              <p>something went wrong please check your connection</p>
            )}
          </tbody>
        ) : tableCtx.dashboardTab === "training" ? (
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {trainError ? (
              <td>Error happen cant fetch the data</td>
            ) : trainStatus === "loading" ? (
              <td>Loading</td>
            ) : trainStatus == "succeeded" ? (
              trainings.map((training) => (
                <SingleItem
                  onDetailClick={() => {
                    tableCtx.setShowDetail(true);
                    tableCtx.setDetailData(training);
                    dispatch(addDetailData(training));
                  }}
                  img={training.mediaFile}
                  onEdite={() => {
                    tableCtx.setIsEditing(true);
                    tableCtx.setDetailData(training);
                    dispatch(addDetailData(training));
                  }}
                  onDelete={() => {
                    tableCtx.setShowModal(true);
                    tableCtx.setDetailData(training);
                    dispatch(addDetailData(training));
                  }}
                  name={training.title}
                  status={"345"}
                  prop1={training.createdAt}
                  prop2={`${training.postedBy.firstName} ${training.postedBy.lastName}`}
                />
              ))
            ) : (
              <p>something went wrong please check your connection</p>
            )}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
    </div>
  );
};

export default ItemTable;
