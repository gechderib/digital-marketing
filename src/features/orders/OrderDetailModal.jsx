import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DmfsseContex from "../../app/contextStore";
import { productDetail } from "../product/productSlice";
import { orderDetail, updateOrder } from "./myOrdersSlice";

const OrderDetailModal = () => {
  const offerCtx = useContext(DmfsseContex);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const prod = useSelector(productDetail);
  const ord = useSelector(orderDetail);
  const navigate = useNavigate();
  const [price, setPrice] = useState(ord.offerPrice);
  const [amount, setAmount] = useState(ord.quantity);
  const { id } = useParams();
  const [offerStatus, setOfferStatus] = useState("idle");
  const dispatch = useDispatch();
  // can save
  const canSave = [price, amount].every(Boolean);

  const handleSendOffer = async (e) => {
    e.preventDefault();
    setOfferStatus("idle");

    if (canSave) {
      const orderInfor = {
        newData: { offerPrice: price, quantity: amount,accepted: ord.accepted },
        id: id,
        token,
      };
      try {
        setOfferStatus("pending");
        const response = await dispatch(updateOrder(orderInfor)).unwrap();
        console.log(response[0].offerPrice);
        if (response == "ERR_BAD_REQUEST") {
          setOfferStatus("bad_err");
        }
        if (response == "ERR_NETWORK") {
          setOfferStatus("net_err");
        }
        if (response[0].offerPrice && response[0].quantity) {
          setPrice("");
          setAmount("");
          setOfferStatus("idle");
          offerCtx.setShowOfferModal();
          navigate("/myorders");
        }
      } catch (err) {
        setOfferStatus("failed");
      }
    }
  };
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Send An Offer
                  </h3>
                  {offerStatus == "net_err" ? (
                    <p className="text-red-600 mb-4 italic animate-bounce">
                      Pleace check your connection
                    </p>
                  ) : offerStatus == "bad_err" ? (
                    <p className="text-red-600 mb-4 italic animate-bounce">
                      You already ordered this product{" "}
                      <span
                        onClick={() => {
                          offerCtx.setShowOfferModal();
                          navigate("/myorders");
                        }}
                        className="underline cursor-pointer text-thin text-black"
                      >
                        update order
                      </span>
                    </p>
                  ) : offerStatus == "faild" ? (
                    <p className="mb-4 animate-bounce">
                      Error happen please try again
                    </p>
                  ) : null}
                  <div className="mt-2">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col ">
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          for="quantity"
                        >
                          Quantity IN KG
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="quantity"
                          type="number"
                          placeholder="Quantity"
                          max={prod.amount}
                          min={1}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-6">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          for="price"
                        >
                          Price ETB /KG
                        </label>
                        <input
                          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                          id="price"
                          type="number"
                          placeholder=""
                          value={price}
                          min={1}
                          onChange={(e) => setPrice(e.target.value)}
                        ></input>
                        <p className="text-red text-xs italic">
                          Please enter a price per kilogram
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                style={{
                  background: "#054112",
                }}
                onClick={handleSendOffer}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900 sm:ml-3 sm:w-auto"
              >
                {offerStatus == "pending" ? (
                  <svg
                    aria-hidden="true"
                    class="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : null}
                Save Change
              </button>
              <button
                style={{
                  background: "#054112",
                  color: "white",
                }}
                onClick={() => offerCtx.setShowOfferModal()}
                type="button"
                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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

export default OrderDetailModal;
