import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// import Layout from '../../../components/Layout';
import { getProductsBySlug } from '../../../actions';
import './style.css';
import { Link } from 'react-router-dom';


const ProductStore = props => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);

    useEffect(() => {
        const { match } = props;
        product.loading = false;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);
    const productName=props.match.params.slug.split('-')[0];
    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card">
                            <div className="cardHeader">
                                <div>{productName} mobile {key}</div>
                                <button>view all</button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map((pro,ind) => {
                                        return (
                                            <Link
                                                to={`/${pro.slug}/${pro._id}/p`}
                                                style={{
                                                display:'block'
                                            }}
                                                
                                                className="productContainer" key={ind}>
                                                <div className="productImgContainer">
                                                    <img src={pro.productPictures[0].img} alt="#"></img>
                                                </div>
                                                <div className="productInfo">
                                                    <div style={{ margin: '5px' }}>{pro.name}</div>
                                                    <div>
                                                        <span>4.3</span>&nbsp;
                                                        <span>4552</span>
                                                    </div>
                                                    <div className="productPrice">{pro.price}</div>
                                                </div>
                                            </Link>
                                        );
                                    })
                                }
                            </div>

                        </div>
                    );
                })
            }
        </>
    )
}

// ProductStore.propTypes = {

// }

export default ProductStore
