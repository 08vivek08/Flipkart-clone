import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import getParams from '../../utils/getParams';
import ProductStore from './ProductStore';
import ProductPage from './ProductPage';
import './style.css';

const ProductListPage = props => {
    // console.log('props', props);
    const renderProducts = () => {
        const params = getParams(props.location.search);
        // console.log(params);
        let content = null;
        switch (params.type) {
            case 'store':
                content = <ProductStore {...props} />
                break;
            case 'page':
                content = <ProductPage {...props} />
                break;
            default:
                content = null;
        }
        return content;
    }

    return (
        <Layout>
            {renderProducts()}
        </Layout>
    )
}

// ProductListPage.propTypes = {

// }

export default ProductListPage
