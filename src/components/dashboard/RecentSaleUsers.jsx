import React from "react";
import User from "../cards/User";

const RecentSaleUsers = () => {
  return (
    <div className="flex flex-col gap-6 md:w-1/3 border border-gray-100 p-3">
      <div className="flex justify-between">
        <p className="font-bold">Recent Sales</p>
        <p className="cursor-pointer hover:underline">See All</p>
      </div>
      <div className="flex flex-col gap-6 ">
        <User
          amount={"89.00"}
          imgUrl="https://picsum.photos/200"
          name={"Getachew Derib"}
          timeAgo={"02"}
        />
        <User
          amount={"89.00"}
          imgUrl="https://picsum.photos/200"
          name={"Getachew Derib"}
          timeAgo={"02"}
        />{" "}
        <User
          amount={"89.00"}
          imgUrl="https://picsum.photos/200"
          name={"Getachew Derib"}
          timeAgo={"02"}
        />{" "}
        <User
          amount={"89.00"}
          imgUrl="https://picsum.photos/200"
          name={"Getachew Derib"}
          timeAgo={"02"}
        />{" "}
        <User
          amount={"89.00"}
          imgUrl="https://picsum.photos/200"
          name={"Getachew Derib"}
          timeAgo={"02"}
        />{" "}
        <User
          amount={"89.00"}
          imgUrl="https://picsum.photos/200"
          name={"Getachew Derib"}
          timeAgo={"02"}
        />
      </div>
    </div>
  );
};

export default RecentSaleUsers;
