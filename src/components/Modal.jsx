import React, { useContext } from "react";
import DmfsseContex from "../app/contextStore";
import { useDispatch } from "react-redux";
import { deleteTraining } from "../features/training/trainingSlice";
import { deleteProduct } from "../features/product/productSlice";
import { deleteUser } from "../features/signup/signupSlice";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const modalCtx = useContext(DmfsseContex);
  const item = modalCtx.detailData;
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const navigate = useNavigate()

  const dispatch = useDispatch();
  return (
    <div
      class={`relative z-10 ${user.roles[0] == "agent" || user.roles[0] == "admin"?"sm:ml-64":""}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class= {` ${user.roles[0] == "agent" || user.roles[0] == "admin"?"sm:ml-64":""} fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}></div>

      <div class={`fixed inset-0 z-10 overflow-y-auto ${user.roles[0] == "agent" || user.roles[0] == "admin"?"sm:ml-64":""} `}>
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <span class="material-symbols-outlined text-red-600">
                    delete_forever
                  </span>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Delete Data
                  </h3>
                  <div class="mt-2 text-sm text-gray-500">
                    <p class="">Are you sure you want to delete the data?</p>
                    <p>All of your data will be permanently removed. </p>
                    <p>This action cannot be undone.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => {
                  if (modalCtx.dashboardTab == "training") {
                    dispatch(deleteTraining({ id: item._id, token }));
                  }
                  if (modalCtx.dashboardTab == "products") {
                    dispatch(deleteProduct({ id: item._id, token }));
                  }
                  if (modalCtx.dashboardTab == "users") {
                    dispatch(deleteUser({id:item._id, token}))
                  }
                  if(user.roles[0] == "sse" || user.roles[0] == "farmer"){
                    dispatch(deleteProduct({ id: item._id, token }));
                    navigate("/myproducts")
                  }
                  
                  modalCtx.setShowModal(false);
                }}
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Delete
              </button>
              <button
              style={{
                background:'#054112',
             }}
                onClick={() => modalCtx.setShowModal(false)}
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md text-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
