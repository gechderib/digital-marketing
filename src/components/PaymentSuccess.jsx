import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOrder } from "../features/orders/myOrdersSlice";
import { updateProduct } from "../features/product/productSlice";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const order = JSON.parse(localStorage.getItem("order"));

  useEffect(() => {
    dispatch(
      updateOrder({
        newData: { accepted: "completed" },
        id: order._id,
        token,
      })
    );
    const originalAmount = order.product.amount;
    const soldAmount = order.quantity;
    const availableAmount = originalAmount - soldAmount;
    if (availableAmount == 0) {
      dispatch(
        updateProduct({
          newData: { amount: availableAmount, soldout: true },
          id: order.product._id,
          token,
        })
      );
    } else {
      dispatch(
        updateProduct({
          newData: { amount: availableAmount },
          id: order.product._id,
          token,
        })
      );
    }
  }, []);

  return (
    <div className="bg-gray-100 h-screen p-32">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <a
              onClick={() => {
                window.close();
              }}
              className="px-12 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3"
            >
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
