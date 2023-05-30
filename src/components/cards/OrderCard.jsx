import React from "react";

const OrderCard = ({
  product,
  quantity,
  price,
  status,
  onAccept,
  onReject,
  onCheckout,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div
      class={`relative m-10 flex w-full  flex-col overflow-hidden rounded-lg border ${
        status == "rejected" ? "border-red-700" : "border-gray-100"
      }    bg-white shadow-md`}
    >
      <a
        class="relative cursor-pointer mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        onClick={() => {console.log("main main main")}}
      >
        <img class="object-cover" src={product.photo} alt="product image" />
        {/* {status == "rejected" && product.postedBy != user.id ? (
          <span onClick={()=>console.log("jjjjjjjjjkkkkkkkkk")} class="z-30 absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            delete
          </span>
        ) : null} */}
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
              status == "rejected" ? "text-red-900" : "text-slate-900"
            }  animate-bounce`}
          >
            {status.toUpperCase()}...
          </div>
        </div>
        {status == "accepted" && product.postedBy != user.id ? (
          <div
            onClick={onCheckout}
            className="text-xl flex justify-center items-center font-bold bg-slate-900 p-2 rounded-lg cursor-pointer text-white"
          >
            Check Out
          </div>
        ) : null}
        {product.postedBy == user.id ? (
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
    </div>
  );
};

export default OrderCard;
