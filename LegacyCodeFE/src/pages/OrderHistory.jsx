import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/OrderHistory.css';

const OrderHistory = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const cartId = localStorage.getItem('cartId');
            console.log(`Retrieved cartId from localStorage: ${cartId}`); 

            if (cartId) {
                try {
                    console.log(`Fetching order for cart ID: ${cartId}`); 
                    const response = await axios.get(`http://localhost:8083/cart/${cartId}`);
                    if (response.status === 200) {
                        console.log('Order data:', response.data);
                        setOrder(response.data);
                    } else {
                        setError('Failed to fetch order.');
                    }
                } catch (error) {
                    console.error('Error fetching order:', error);
                    setError('Failed to fetch order.');
                }
            } else {
                setError('No cart ID found.');
            }
            setLoading(false);
        };

        fetchOrder();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!order || !order.items || order.items.length === 0) return <div>No items found in this order.</div>;

    const { items, discountPercentage = 0 } = order;
    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
    const discountAmount = (total * (discountPercentage / 100)).toFixed(2);
    const serviceCharge = (total * 0.0725).toFixed(2);
    const finalTotal = (total - discountAmount + parseFloat(serviceCharge)).toFixed(2);

    return (
        <div className="order-history" style={{ textAlign: 'center' }}>
            <h1>Order History</h1>
            {items.length === 0 ? (
                <p>No items found in this order.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => {
                            const itemTotal = (item.price || 0) * (item.quantity || 0);
                            const itemDiscount = (itemTotal * (discountPercentage / 100)).toFixed(2);
                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>£{item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>£{itemDiscount}</td>
                                    <td>£{itemTotal.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4">Subtotal:</td>
                            <td>£{total.toFixed(2)}</td>
                        </tr>
                        {discountPercentage > 0 && (
                            <tr>
                                <td colSpan="4">Discount ({discountPercentage}%):</td>
                                <td>£{discountAmount}</td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan="4">Service Charge:</td>
                            <td>£{serviceCharge}</td>
                        </tr>
                        <tr>
                            <td colSpan="4">Total:</td>
                            <td>£{finalTotal}</td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
};

export default OrderHistory;
