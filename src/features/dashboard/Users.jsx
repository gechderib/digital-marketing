import React, { useContext } from "react";
import AddItem from "../../components/AddItem";
import ItemTable from "../../components/tables/UserTable";
import AddUser from "../signup/AddUser";
import DmfsseContex from "../../app/contextStore";
import EditUser from "../signup/EditUser";

const Users = () => {
  const addCtx = useContext(DmfsseContex);
  return (
    <div className="p-4 mt-11 sm:ml-64">
      {addCtx.isAdding ? (
        <AddUser />
      ) : addCtx.isEditing ? <EditUser /> : (
        <div>
          <AddItem />
          <ItemTable
            prop1={"Name"}
            prop2={"State"}
            prop3={"Role"}
            prop4={"Creation Date	"}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
