import React, { useContext } from "react";
import AddItem from "../../components/AddItem";
import ItemTable from "../../components/tables/UserTable";
import DmfsseContex from "../../app/contextStore";
import AddProduct from "../product/AddProduct";
import EditProduct from "../product/EditProduct";
import ProductDetail from "../product/ProductDetail";

const Products = () => {
  const addCtx = useContext(DmfsseContex);
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
        </div>
      )}
    </div>
  );
};

export default Products;
