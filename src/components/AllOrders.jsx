/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AllOrders({ user }) {
    const [orders, setOrders] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        api.get(`/api/${user.email}/orders`).then((response) => {
            if (response.status === 200) {
                setOrders([...response.data]);
            }
        });
    }, [user]);

    useEffect(() => {
        if (!user.email) {
            navigateTo("/login");
        }
    });
    return (
        <>
            {orders.map((order, uIndex) => {
                const dateObj = new Date(order.date_placed);
                const options = {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                };
                const formattedDate = dateObj.toLocaleDateString(
                    "en-US",
                    options
                );
                return (
                    <div
                        key={order._id}
                        className='bg-white rounded border mb-5 '
                    >
                        <div className='p-6 w-full'>
                            <div className='grid grid-cols-2 gap-10'>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex flex-col gap-1'>
                                        <h2 className=''>Order number</h2>
                                        <p className='text-sm text-zinc-500'>
                                            {
                                                order.razorpay_order_id.split(
                                                    "_"
                                                )[1]
                                            }
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <h2 className=''>Payment ID</h2>
                                        <p className='text-sm text-zinc-500'>
                                            {
                                                order.razorpay_payment_id.split(
                                                    "_"
                                                )[1]
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col gap-1'>
                                        <h2 className=''>Placed on</h2>
                                        <p className='text-sm text-zinc-500'>
                                            {formattedDate}
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <h2 className=''>Total amount</h2>
                                        <p className='text-sm font-medium text-zinc-900'>
                                            ₹{order.totalAmount}{" "}
                                            <span className='text-xs'>
                                                (inc. 18% GST)
                                            </span>
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <h2 className=''>Status</h2>
                                        {order.status === "paid" ? (
                                            <>
                                                <p className='text-sm text-orange-500 font-semibold'>
                                                    Processing
                                                </p>
                                            </>
                                        ) : order.status === "shipped" ? (
                                            <>
                                                <p className='text-sm text-yellow-500 font-semibold'>
                                                    Shipped
                                                </p>
                                            </>
                                        ) : order.status === "delivered" ? (
                                            <>
                                                <p className='text-sm text-green-500 font-semibold'>
                                                    Delivered
                                                </p>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col mt-5 w-full md:flex-row'>
                                {order.products.map((item) => (
                                    <div
                                        key={item.product._id}
                                        className='flex gap-2 my-3 '
                                    >
                                        <div className='w-64 border rounded p-2 bg-contain'>
                                            {item.product.images && (
                                                <img
                                                    src={`https://tnz-creations-images.s3.ap-south-1.amazonaws.com/${item.product.images[0]}`}
                                                    className='aspect-square rounded-sm'
                                                    alt={item.product.name}
                                                />
                                            )}
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <h4 className='text-md'>
                                                {item.product.name}
                                            </h4>
                                            <div className='mt-2'>
                                                <p className='text-gray-500 text-sm'>
                                                    Color: {item.color}
                                                </p>
                                                <p className='text-gray-500 text-sm'>
                                                    Price: ₹{item.product.price}
                                                </p>
                                                <p className='text-gray-500 text-sm'>
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default AllOrders;
