import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { doc, getDoc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ProductInfo() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const params = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );
      setProduct(productTemp.data());
    } catch (error) {
      console.log(error);
    }
  }
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };
  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p>
                  <b>{product.name}</b>
                </p>
                <img
                  src={product.imageURL}
                  alt=""
                  className="product-info-img"
                />
                <hr />
                <p>{product.description}</p>
                <div className="d-flex justify-content-end my-3">
                  <button
                    onClick={() => {
                      addToCart();
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductInfo;
