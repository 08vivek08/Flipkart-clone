import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategories, updateCategories } from '../../actions';
import CheckboxTree from 'react-checkbox-tree';
import { IoMdAdd, IoIosTrash } from 'react-icons/io';
import { BiCaretRight, BiCaretDown, BiCheckboxChecked, BiCheckboxSquare, BiCheckbox } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateCategoryModal from './Component/UpdateCategoryModal';
import AddCategoryModal from './Component/AddCategoryModal';
import DeleteCategoryModal from './Component/DeleteCategoryModal';
import createCategoryList from '../../helpers/linearCategories';
import './style.css';

function Category() {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [categoryImageUrl, setCategoryImageUrl] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdatedCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeletedCategoryModal] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setCategoryName('');
        setCategoryImage('');
        setParentCategoryId('');
    };

    const handleSave = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        form.append('categoryImageUrl', categoryImageUrl);
        dispatch(addCategory(form));
        handleClose();
    };

    const renderCategories = (categorylist = []) => {
        let cat = [];
        for (let cate of categorylist) {
            cat.push({
                label: cate.name,
                value: cate._id,
                children: cate.children && cate.children.length > 0 && renderCategories(cate.children)
            });
        }
        return cat;
    };

    const categoryList = createCategoryList(category.categories, [
        < option value='' key={-1} > Select Parent Category </option>
    ]);

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    const renderAddCategoryModal = () => {
        return (
            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                handleSave={handleSave}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                handleCategoryImage={handleCategoryImage}
                categoryImageUrl={categoryImageUrl}
                setCategoryImageUrl={setCategoryImageUrl}
                categoryList={categoryList}
            />
        )
    }

    const choosedCategory = () => {
        const categories = createCategoryList(category.categories);
        if (checked.length > 0) {
            checked.forEach((categoryId, index) => {
                const cate = categories.find((c) => (c.props.value === categoryId));
                // console.log(cate.props.children);
                checkedArray.push(cate.props);
            });
        }
        if (expanded.length > 0) {
            expanded.forEach((categoryId, index) => {
                const cate = categories.find((c) => (c.props.value === categoryId));
                // console.log(cate.props.children);
                expandedArray.push(cate.props);
            });
        }
        // console.log(categories)
        // console.log(checked);
        // console.log(expanded);
        // console.log(checkedArray);
        // console.log(expandedArray);
    }

    const updateCategory = () => {
        choosedCategory();
        setUpdatedCategoryModal(true);
    }

    const deleteCategory = () => {
        choosedCategory();
        setDeletedCategoryModal(true);
    }

    const closeUpdateCategory = () => {
        setUpdatedCategoryModal(false);
        setCheckedArray([]);
        setExpandedArray([]);
    }

    const renderCategoryPage = () => {
        return (
            <Container>
                <Row>
                    <Col md={12} >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions:</span>
                                <Button variant="info" onClick={handleShow} className="btn-md">
                                    <IoMdAdd />
                                    <span>Add</span>
                                </Button>
                                <Button variant="secondary" onClick={updateCategory}
                                    className="btn-md"
                                >
                                    <AiOutlineEdit />
                                    <span>Edit</span>
                                </Button>
                                <Button variant="dark" onClick={deleteCategory} className="btn-md">
                                    <IoIosTrash />
                                    <span>Delete</span>
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* {
                            (!category.loading) ?

                                : <Loader />
                        } */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                expandClose: <BiCaretDown />,
                                expandOpen: <BiCaretRight />,
                                check: <BiCheckboxChecked />,
                                uncheck: <BiCheckbox />,
                                halfCheck: <BiCheckboxSquare />
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }


    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            setCheckedArray(checkedArray.map((item, i) => index === i ? { ...item, [key]: value } : item));
        }
        else {
            setExpandedArray(expandedArray.map((item, i) => index === i ? { ...item, [key]: value } : item));
        }
    }

    const updateCategoriesForm = (e) => {
        e.preventDefault();
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.children);
            form.append('parentId', item.parentid);
            form.append('type', item.catetype);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.children);
            // console.log(item.parentid);
            form.append('parentId', item.parentid);
            form.append('type', item.catetype);
            form.append('categoryImages', categoryImage);
        });
        if (expandedArray.length + checkedArray.length > 0) {
            dispatch(updateCategories(form));
        }
        closeUpdateCategory();
    }

    const renderUpdateCategoryModal = () => {
        return (
            <UpdateCategoryModal
                show={updateCategoryModal}
                handleClose={closeUpdateCategory}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                handleCategoryImage={handleCategoryImage}
                categoryList={categoryList}
                updateCategoriesForm={updateCategoriesForm}
            />
        )
    }

    const closeDeleteCategory = () => {
        setDeletedCategoryModal(false);
        setCheckedArray([]);
        setExpandedArray([]);
    }

    const deleteCategoriesForm = (e) => {
        alert("It will delete selected Categories !!")
        e.preventDefault();
        const checkedIdsArray = checkedArray.map((item, index) => ({ '_id': item.value }));
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategories(checkedIdsArray));
        }
        closeDeleteCategory();
    }

    const renderDeleteCategoryModal = () => {
        return (
            <DeleteCategoryModal
                deleteCategoryModal={deleteCategoryModal}
                closeDeleteCategory={closeDeleteCategory}
                deleteCategoriesForm={deleteCategoriesForm}
                checkedArray={checkedArray}
                categoryList={categoryList}
            />
        )
    }

    return (
        <Layout sidebar>
            {
                renderCategoryPage()
            }
            {
                renderAddCategoryModal()
            }
            {
                renderUpdateCategoryModal()
            }
            {
                renderDeleteCategoryModal()
            }
        </Layout >
    );
};

export default Category;
