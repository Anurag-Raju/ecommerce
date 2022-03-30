import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [add, setAdd] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true);
      const productsArray = [];
      const products = await getDocs(collection(fireDB, "products"));
      products.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setProducts(productsArray);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
    setAdd(false);
  };
  const addHandler = () => {
    setAdd(true);
    setShow(true);
    setProduct({
      name: "",
      price: 0,
      imageURL: "",
      category: "",
    });
  };
  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);
      handleClose();
      toast.success("Product updated successfully");
      window.location.reload();
    } catch (error) {
      setLoading(false);
      toast.error("Product update failed");
      console.log(error);
    }
  };
  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));

      toast.success("Product deleted successfully");
      getData();
    } catch (error) {
      setLoading(false);
      toast.error("Product delete failed");

      console.log(error);
    }
  };
  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);

      handleClose();
      toast.success("Product added successfully");
      window.location.reload();
    } catch (error) {
      setLoading(false);
      toast.error("Product add failed");
      console.log(error);
    }
  };
  useEffect(() => {
    getOrdersData();
  }, []);
  async function getOrdersData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"), "");
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between">
            <h3>Products List</h3>
            <button onClick={addHandler}>Add Product</button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.imageURL} alt="" height="80" width="80" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                      <FaTrash
                        color="red"
                        size={20}
                        onClick={() => {
                          deleteProduct(item);
                        }}
                      />
                      <FaEdit
                        color="blue"
                        size={20}
                        onClick={() => {
                          editHandler(item);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add === true ? "ADD A PRODUCT" : "EDIT PRODUCT"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="register-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  value={product.name}
                  onChange={(e) => {
                    setProduct({ ...product, name: e.target.value });
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="image url"
                  value={product.imageURL}
                  onChange={(e) => {
                    setProduct({ ...product, imageURL: e.target.value });
                  }}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="price"
                  value={product.price}
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="category"
                  value={product.category}
                  onChange={(e) => {
                    setProduct({ ...product, category: e.target.value });
                  }}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>CLOSE</button>
              {add ? (
                <button onClick={addProduct}>ADD</button>
              ) : (
                <button onClick={updateProduct}>SAVE</button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          {orders.map((order) => {
            return (
              <table className="table mt-3 order">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={item.imageURL}
                            alt=""
                            height="80"
                            width="80"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </Tab>
      </Tabs>
    </Layout>
  );
}

export default AdminPage;
