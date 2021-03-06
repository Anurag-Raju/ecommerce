import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="d-flex w-50">
          <input
            className="form-control m-2"
            type="text"
            value={searchKey}
            placeholder="search items"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <select
            className="form-control m-2"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="mobiles">Mobiles</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        <div className="row">
          {products
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.includes(filterType))
            .map((product) => {
              return (
                <div className="col-md-4">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <p>{product.name}</p>
                      <div className="text-center">
                        <img
                          src={product.imageURL}
                          alt=""
                          className="product-img"
                        />
                      </div>
                    </div>
                    <div className="product-actions">
                      <h2>{product.price} RS/-</h2>
                      <div className="d-flex">
                        <button
                          className="mx-2"
                          onClick={() => {
                            addToCart(product);
                          }}
                        >
                          ADD TO CART
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/productinfo/${product.id}`);
                          }}
                        >
                          VIEW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
