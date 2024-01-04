/* eslint-disable react/prop-types */
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PlaceholderLoading from "react-placeholder-loading";

import SelectColorModal from "./SelectColorModal";

function Products({
    setProducts,
    products,
    user,
    deleteFromWishlist,
    wishlistCount,
    setWishlistCount,
    setCartCount,
    cartCount,
    selectedCategory,
}) {
    const navigateTo = useNavigate();
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [productColors, setProductColors] = useState([]);
    const [id, setId] = useState("");
    const [loaded, setLoaded] = useState(false);

    const handleLoad = () => {
        setLoaded(true);
    };

    const handleSortChange = (event) => {
        const selectedValue = event.target.value;

        api.get(`/api/filter?filterOption=${selectedValue}`).then(
            (response) => {
                if (response.status === 200) {
                    const response_data = response.data;
                    setProducts([...response_data]);
                }
            }
        );
    };

    const addToWishlist = (id) => {
        if (user.expired) {
            navigateTo("/login");
        } else {
            const post_data = {
                email: user.email,
                productId: id,
            };

            api.post("/api/wishlist/add", post_data)
                .then((response) => {
                    if (response.status === 200) {
                        setMessage(response.data);
                        setWishlistCount(wishlistCount + 1);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const addToBag = (id) => {
        if (user.expired) {
            navigateTo("/login");
        } else {
            if (!showModal) {
                setShowModal(true);
                setId(id);
                api.get(`/api/${id}/color`).then((response) => {
                    setProductColors([...response.data]);
                });
            }
        }
    };

    const resetMessage = () => {
        setMessage("");
    };

    return (
        <>
            <div className='w-full'>
                <div className='flex items-center mb-4 justify-between'>
                    <select
                        name='sort'
                        id='sort'
                        onChange={handleSortChange}
                        className='w-44 text-sm cursor-pointer text-gray-600 py-3 px-4 border border-gray-200 shadow-sm rounded focus:ring-primary focus:border-primary'
                    >
                        <option value='low'>Price low to high</option>
                        <option value='high'>Price high to low</option>
                        <option value='latest'>Latest product</option>
                    </select>

                    {message && (
                        <>
                            <div
                                id='toast-success'
                                className='flex items-center w-full max-w-xs p-4 mb-4 mt-[-40px] text-gray-500 bg-white rounded-lg shadow'
                                role='alert'
                            >
                                {message == "Product added to wishlist." ? (
                                    <>
                                        <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg'>
                                            <svg
                                                className='w-5 h-5'
                                                aria-hidden='true'
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='currentColor'
                                                viewBox='0 0 20 20'
                                            >
                                                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                                            </svg>
                                            <span className='sr-only'>
                                                Check icon
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg'>
                                            <svg
                                                className='w-5 h-5'
                                                aria-hidden='true'
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='currentColor'
                                                viewBox='0 0 20 20'
                                            >
                                                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z' />
                                            </svg>
                                            <span className='sr-only'>
                                                Warning icon
                                            </span>
                                        </div>
                                    </>
                                )}

                                <div className='ml-3 text-sm font-normal'>
                                    {message}
                                </div>
                                <button
                                    type='button'
                                    className='ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8'
                                    data-dismiss-target='#toast-success'
                                    onClick={resetMessage}
                                    aria-label='Close'
                                >
                                    <span className='sr-only'>Close</span>
                                    <svg
                                        className='w-3 h-3'
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 14 14'
                                    >
                                        <path
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                        />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <div className='flex flex-col gap-6 md:grid md:grid-cols-3'>
                    {products && products.length > 0 ? (
                        products.map((product, index) => {
                            return (
                                <React.Fragment key={product._id}>
                                    {showModal && (
                                        <>
                                            <SelectColorModal
                                                setShowModal={setShowModal}
                                                productColors={productColors}
                                                setCartCount={setCartCount}
                                                deleteFromWishlist={
                                                    deleteFromWishlist
                                                }
                                                cartCount={cartCount}
                                                id={id}
                                                user={user}
                                            />
                                        </>
                                    )}
                                    <div className='flex flex-col bg-white shadow rounded overflow-hidden group md:grid'>
                                        <Link
                                            to={`/products/${product._id}`}
                                            title='View Product'
                                            className='hover:bg-opacity-80'
                                        >
                                            <div className='relative flex justify-center bg-contain'>
                                                <PlaceholderLoading
                                                    shape='rect'
                                                    width={355}
                                                    height={355}
                                                />
                                                <img
                                                    src={`https://tnz-creations-images.s3.ap-south-1.amazonaws.com/${product.images[0]}`}
                                                    className={
                                                        !loaded ? "hidden" : ""
                                                    }
                                                    loading='lazy'
                                                    onLoad={handleLoad}
                                                />
                                                {!loaded && (
                                                    <img
                                                        src={`https://tnz-creations-images.s3.ap-south-1.amazonaws.com/${product.images[0]}`}
                                                        className={
                                                            "aspect-square"
                                                        }
                                                        onLoad={handleLoad}
                                                    />
                                                )}
                                                <div className='absolute inset-0 bg-black bg-opacity-20 transition opacity-0 group-hover:opacity-100'></div>
                                            </div>
                                            <div className='pt-4 pb-3 px-4'>
                                                <h4 className='uppercase font-medium text-xl mb-2 text-gray-800'>
                                                    {product.name}
                                                </h4>
                                                <div className='flex items-baseline mb-1 space-x-2'>
                                                    <p className='text-xl text-primary font-semibold'>
                                                        ₹
                                                        {Math.ceil(
                                                            Number(
                                                                product.price -
                                                                    (product.discount /
                                                                        100) *
                                                                        product.price
                                                            )
                                                        )}
                                                    </p>
                                                    <p className='text-sm text-gray-400 line-through'>
                                                        MRP ₹{product.price}
                                                    </p>
                                                    <p className='text-sm font-semibold text-orange-500'>
                                                        &#40;{product.discount}%
                                                        OFF&#41;
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className='flex px-3 pb-5 gap-3 items-end'>
                                            <button
                                                onClick={() =>
                                                    addToBag(product._id)
                                                }
                                                className='w-full h-11 text-md text-center text-white bg-primary border border-primary rounded hover:bg-primaryDark hover:text-white transition'
                                                title='Add to Cart'
                                            >
                                                Add to cart
                                            </button>
                                            <button
                                                onClick={() =>
                                                    addToWishlist(product._id)
                                                }
                                                className='w-full h-11 text-md gap-2 rounded justify-center text-primary border-2 border-primary hover:bg-slate-100 transition'
                                                title='Add to Wishlist'
                                            >
                                                Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <h2 className='text-md text-zinc-600 mt-5 w-full font-medium ml-5'>
                            No product found
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
}

export default Products;
