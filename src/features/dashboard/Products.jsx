import React, { useContext } from "react";
import AddItem from "../../components/AddItem";
import ItemTable from "../../components/tables/UserTable";
import DmfsseContex from "../../app/contextStore";
import AddProduct from "../product/AddProduct";
import EditProduct from "../product/EditProduct";
import ProductDetail from "../product/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { changePage, pagination } from "../training/trainingSlice";

const Products = () => {
  const addCtx = useContext(DmfsseContex);
  const dispatch = useDispatch()
  const page = useSelector(pagination)
  return (
    <div className="p-4 mt-11 sm:ml-64">
      {addCtx.isAdding ? (
        <AddProduct />
      ) : addCtx.isEditing ? <EditProduct /> : addCtx.showDetail ? <ProductDetail /> : (
        <div>
          <AddItem />
          <ItemTable
            prop1={"Product"}
            prop2={"Status"}
            prop3={"Quantity"}
            prop4={"Price"}
          />
          <div class="flex flex-col items-center">
            <span class="text-sm text-gray-700 dark:text-gray-400">
              <span class="font-semibold text-gray-900 dark:text-white">{page*10+1}</span>{" "}
              to{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                {page*10 + 10}
              </span>{" "}
              of{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                100
              </span>{" "}
              Entries
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button
              style={{
                background:'#054112',
             }}
              onClick={()=>{
                if(page >0){
                  dispatch(changePage(page-1))
                }
              }}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Prev
              </button>
              <button
              style={{
                background:'#054112',
             }}
              onClick={()=>{
                dispatch(changePage(page+1))
              }}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
