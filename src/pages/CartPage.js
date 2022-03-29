import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";

function CartPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);

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
    </Layout>
  );
}

export default CartPage;
