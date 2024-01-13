import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";

function ShippingPolicyComp() {
    return (
        <>
            <header className='py-4 shadow-sm bg-white'>
                <div className='container flex flex-col items-center justify-center md:flex-row'>
                    <div className='flex items-center gap-5'>
                        <div>
                            <Link to={"/"}>
                                <div className='flex gap-2 items-center'>
                                    <img
                                        src={Logo}
                                        alt='Logo'
                                        className='w-16'
                                    />
                                    <h1 className='font-merr font-bold text-3xl'>
                                        TNZ Creations
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <section className='flex flex-col p-5'>
                <h2 className='text-center text-2xl font-medium pb-5'>
                    Shipping Policy
                </h2>

                <div className='paras flex flex-col gap-7'>
                    <div>
                        <p>
                            TNZ Creations, ensures quality products and
                            packaging to our customers. We have partnered with
                            reputed courier agencies for a safe and timely
                            delivery. There is free shipping on orders above
                            Rs.499.
                        </p>
                    </div>
                    <div className='para3'>
                        <ol className='flex flex-col gap-5 list-decimal list-inside'>
                            <div>
                                <li className='font-medium'>
                                    How long does it take for an order to
                                    arrive?
                                </li>
                                <p>
                                    All the orders are dispatched from our
                                    warehouse within 2 working days. Our
                                    endeavour is to make the products reach you
                                    within 4-10 working days from receipt of
                                    order and payment depending on the address
                                    for delivery. Delivery does not occur on
                                    weekends or holidays. You will receive a SMS
                                    and email with the tracking AWB number once
                                    your order is dispatched. If you are not
                                    happy with your purchase, we will accept
                                    returns and exchanges on unused or unopened
                                    products within 30 days of purchase. Simply
                                    reach out to our customer support team to
                                    start the process.
                                </p>
                            </div>
                            <div>
                                <p>
                                    You can Self Return the item to us within
                                    seven days from the delivery date We will
                                    send a replacement or initiate refund for
                                    the products to your source account once we
                                    receive the product If customer cancels the
                                    order /rejects it during delivery (Paid
                                    order) after the item is shipped then we
                                    will deduct the shipping amount and refund
                                    the remaining amount.
                                </p>
                            </div>
                            <div>
                                <p className='font-black'>
                                    You will receive your refund from razorpay
                                    within 5-7 working days.
                                </p>
                            </div>
                            <div>
                                <p>
                                    If the contact information is incomplete /
                                    customer does not pick our support team call
                                    and confirm the order, we will keep the
                                    order on hold. We are not responsible for
                                    any delays by courier companies during
                                    unavoidable situation. However our support
                                    team always helps to solve the issue. We are
                                    not responsible if you over pay the courier
                                    person without observing the COD amount on
                                    the bill.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Courier Company makes 3 attempts to deliver
                                    items. If the customer fails to receive the
                                    items will return back to us. We deduct the
                                    shipping charge and refund remaining amount
                                    in this case of paid orders.
                                </p>
                            </div>
                            <div>
                                <p>
                                    In any case if customer does not attend the
                                    items( out of town) we will deduct the
                                    shipping charge and refund the remaining
                                    amount for paid orders. Please raise your
                                    return & exchange request within 7 days of
                                    receiving your order here.
                                </p>
                            </div>
                            <div>
                                <p>Return address:</p>

                                <p>
                                    TNZ Creations <br />
                                    Tnz Manzil, <br />
                                    660/1 Lane No. 12 Zakir Nagar, <br />
                                    Okhla New Delhi - 110025 <br /> Mobile.
                                    9911083755 <br />
                                    Email. tnzcreations1@gmail.com{" "}
                                </p>
                            </div>
                        </ol>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ShippingPolicyComp;
