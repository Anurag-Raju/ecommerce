import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";

function CartPage() {
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (item) => {
    dispatch({
      type: "DELETE_FROM_CART",
      payload: item,
    });
  };

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} alt="" height="80" width="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash
                    onClick={() => {
                      deleteFromCart(item);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <h1 className="total-amount">Total Amount={totalAmount}RS/-</h1>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button
        // onClick={() => {
        //   placeOrder();
        // }}
        >
          PLACE ORDER
        </button>
      </div>
    </Layout>
  );
}

export default CartPage;
