import React, { useEffect } from "react";
import AddItem from "../../components/AddItem";
import ItemTable from "../../components/tables/UserTable";

const Trainings = () => {
  return (
    <div>
      <AddItem />
      <ItemTable
        prop1={"Title"}
        prop2={"Comments"}
        prop3={"Created At"}
        prop4={"posted By"}
      />
    </div>
  );
};

export default Trainings;
