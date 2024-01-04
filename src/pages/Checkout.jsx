/* eslint-disable react/prop-types */

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import CheckoutItems from "./CheckoutItems";
import OrderSummary from "../components/OrderSummary";
import SelectAddress from "../components/SelectAddress";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import api from "../api";

import EmptyBagImg from "../assets/empty-bag.svg";

function Checkout({
    user,
    wishlist,
    cart,
    searchResult,
    setSearchResult,
    searchQuery,
    setSearchQuery,
}) {
    const [wishlistCount, setWishlistCount] = useState(wishlist.length);
    const [cartCount, setCartCount] = useState(cart.length);
    const [orderData, setOrderData] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [addressMessage, setAddressMessage] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        api.get(`/api/cart/info?email=${user.email}`)
            .then((response) => {
                if (response.status === 200) {
                    setOrderData(response.data);
                }
            })
            .catch((err) => {
                setMessage(err.response.data);
            });
    }, [user]);

    useEffect(() => {
        setWishlistCount(wishlist.length);
    }, [wishlist]);

    useEffect(() => {
        setCartCount(cart.length);
    }, [cart]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when route changes
    }, []);

    return (
        <>
            <Header
                user={user}
                wishlistCount={wishlistCount}
                cartCount={cartCount}
                setSearchResult={setSearchResult}
                searchResult={searchResult}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <Navbar user={user} />
            {cartCount <= 0 ? (
                <>
                    <div className='flex flex-col items-center my-24'>
                        <img
                            src={EmptyBagImg}
                            alt='Empty cart image'
                            className='w-96'
                        />
                        <h2 className='text-xl w-2/3 md:w-full font-semibold text-zinc-600 text-center'>
                            Looks like you have not added anything to your bag.
                        </h2>
                        <p className='font-medium text-zinc-600'>
                            Go ahead & explore top categories.
                        </p>

                        <a
                            href='/shop'
                            className='my-10 block w-52 py-2 text-center text-lg text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition font-roboto font-medium'
                        >
                            Continue shopping
                        </a>
                    </div>
                </>
            ) : (
                <>
                    <div className='container flex flex-col-reverse gap-5 md:grid md:grid-cols-2 justify-items-center items-start pb-10 pt-10 '>
                        <div className='flex flex-col gap-5'>
                            <CheckoutItems
                                user={user}
                                setCartCount={setCartCount}
                                cartCount={cartCount}
                                setOrderData={setOrderData}
                            />
                            <SelectAddress
                                user={user}
                                cartCount={cartCount}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                addressMessage={addressMessage}
                                setAddressMessage={setAddressMessage}
                            />
                        </div>
                        <div className='flex flex-col gap-5'>
                            <OrderSummary
                                user={user}
                                orderData={orderData}
                                selectedOption={selectedOption}
                                setAddressMessage={setAddressMessage}
                            />
                        </div>
                    </div>
                </>
            )}

            <Footer />
        </>
    );
}

export default Checkout;
