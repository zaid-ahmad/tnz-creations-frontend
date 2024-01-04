/* eslint-disable react/prop-types */

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProductDetail from "../components/ProductDetail";
// import RelatedProducts from '../components/RelatedProducts'
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import NewArrival from "../components/NewArrival";
import Description from "../components/Description";

function Product({
    user,
    wishlist,
    cart,
    searchResult,
    setSearchResult,
    searchQuery,
    setSearchQuery,
}) {
    const [product, setProduct] = useState({});
    const [wishlistCount, setWishlistCount] = useState(wishlist.length);
    const [cartCount, setCartCount] = useState(cart.length);
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        api.get(`/api/products/${id}`).then((res) => {
            const res_data = res.data;

            setProduct(res_data);
        });
    }, []);

    useEffect(() => {
        setWishlistCount(wishlist.length);
    }, [wishlist]);

    useEffect(() => {
        setCartCount(cart.length);
    }, [cart]);

    const delete_from_wishlist = (id) => {
        const data_to_post = {
            email: user.email,
            itemId: id,
        };

        api.delete("/api/wishlist/remove", {
            data: data_to_post,
        }).then((response) => {
            if (response.status === 200) {
                // Remove the deleted item from the products state
                setWishlistCount(wishlistCount - 1);
            }
        });
    };

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
            <div className='grid grid-rows-200 md:gap-0 lg:gap-20'>
                <div className='container lg:w-4/5'>
                    {product && (
                        <ProductDetail
                            product={product}
                            user={user}
                            source={product.images}
                            deleteFromWishlist={delete_from_wishlist}
                            wishlistCount={wishlistCount}
                            setWishlistCount={setWishlistCount}
                            cartCount={cartCount}
                            setCartCount={setCartCount}
                        />
                    )}
                </div>
                <div className='container'>
                    <Description product={product} />
                </div>
            </div>
            <NewArrival />
            <Footer />
        </>
    );
}

export default Product;

// components:
/*
1. ProductDetail
2. Description
3. Related Product
*/
