import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { offerStatus } from "../../features/orders/myOrdersSlice";

const OrderCard = ({
  product,
  quantity,
  price,
  status,
  onAccept,
  onReject,
  onCheckout,
  onDetail,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const offerStat = useSelector(offerStatus);
  return (
    <div
      class={`relative flex w-full  flex-col overflow-hidden rounded-lg border ${
        status == "rejected" ? "border-red-700" : "border-gray-100"
      }    bg-white shadow-md`}
    >
      <a
        class="relative cursor-pointer mx-3 mt-3 flex h-44 overflow-hidden rounded-xl"
        onClick={onDetail}
      >
        <img class="w-full" src={product.photo} alt="product image" />
      </a>
      <div class="mt-4 px-5 pb-5">
        <a className="flex justify-between">
          <h5 class="text-xl tracking-tight text-slate-900">{product.name}</h5>
          <h5 className="text-2xl font-bold text-slate-900">{quantity}KG</h5>
        </a>
        <div class="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span class="text-2xl font-bold text-slate-900">
              {price}.ETB/KG
            </span>
            {/* <span class="text-sm text-slate-900 line-through">699.ETB</span> */}
          </p>
          <div
            className={`text-lg font-bold ${
              status == "rejected" ? "text-red-700" : "text-slate-900"
            }  animate-bounce`}
          >
            {status.toUpperCase()}...
          </div>
        </div>
        {status == "accepted" && product.postedBy != user.id ? (
          <div
            onClick={onCheckout}
            className="text-xl flex justify-center items-center font-bold bg-slate-900 p-2 rounded-sm cursor-pointer text-white"
          >
            Check Out
          </div>
        ) : null}
        {status == "rejected" && product.postedBy != user.id ? (
          <span
            onClick={() => console.log("jjjjjjjjjkkkkkkkkk")}
            class="z-30 cursor-pointer p-1 absolute top-2 left-2 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white"
          >
            delete
          </span>
        ) : null}
        {status == "completed" ? (
          <div className="flex justify-center items-center text-green-400 animate-pulse">
            <span class="material-symbols-outlined">done</span> 
            <span>Payment Successfully Done</span>
          </div>
        ) : null}
        {(product.postedBy == user.id && status != "completed") ? (
          <div className="flex justify-between">
            <div
              onClick={onAccept}
              className="text-md flex hover:underline justify-center items-center  p-2 rounded-md cursor-pointer text-green-600"
            >
              Accept
            </div>{" "}
            <div
              onClick={onReject}
              className="text-md flex hover:underline justify-center items-center   p-2 rounded-md cursor-pointer text-red-600"
            >
              Reject
            </div>
          </div>
        ) : null}
      </div>
      {offerStat == "loading" ? (
        <div className="absolute h-full w-full bg-gray-300 bg-opacity-50 z-10 top-0 flex justify-center items-center">
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
        </div>
      ) : null}
    </div>
  );
};

export default OrderCard;
