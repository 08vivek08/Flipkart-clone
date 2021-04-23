import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../actions';
import { Link } from 'react-router-dom';


function MenuHeader(props) {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const renderCategories = (categorylist = []) => {
        let cat = [];
        for (let cate of categorylist) {
            cat.push(
                <li key={cate.slug}>
                    {
                        cate.parentId ?
                            <a href={`/${cate.slug}?cid=${cate._id}&type=${cate.type}`}>{cate.name}</a>
                            :
                            <span>
                                {cate.name}
                            </span>
                    }
                    {cate.children && cate.children.length > 0 ? <ul>{renderCategories(cate.children)}</ul> : null}
                </li>
            )
        }
        return cat;
    };

    return (
        <div className="menuHeader">
            <ul>
                {category.categories && category.categories.length > 0 ? renderCategories(category.categories) : null}
            </ul>
        </div>
    )
}

MenuHeader.propTypes = {

}

export default MenuHeader

