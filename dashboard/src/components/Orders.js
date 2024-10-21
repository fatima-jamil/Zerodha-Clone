import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // State for loading status

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders...");
      const response = await axios.get("http://localhost:3002/allOrders"); // Explicit backend URL
      console.log("Fetched Orders:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // Call fetchOrders when the component mounts
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="orders">
      {loading ? ( // Show loading spinner while fetching
        <p>Loading orders...</p>
      ) : orders.length > 0 ? ( // Check if there are orders
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => ( // Map through orders and display them
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price.toFixed(2)}</td>
                  <td>{order.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">Get started</Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
