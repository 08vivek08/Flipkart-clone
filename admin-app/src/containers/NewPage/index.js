import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import Input from '../../components/Input';
import createCategoryList from '../../helpers/linearCategories';
import { createPage } from '../../actions';

function Page(props) {
    const dispatch = useDispatch();
    const [createPageModal, setCreatePageModal] = useState(false);
    const [pageTitle, setPageTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [pageType, setPageType] = useState('');
    const [desc, setDesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [bannersCheck, setBannersChecked] = useState(0);
    const [productsCheck, setProductsChecked] = useState(0);
    const [products, setProducts] = useState([]);
    const category = useSelector(state => state.category);
    const page = useSelector(state => state.page);

    const handleClose = () => {
        setPageTitle('');
        setCategoryId('');
        setPageType('');
        setDesc('');
        setBanners([]);
        setBannersChecked(0);
        setProducts([]);
        setProductsChecked(0);
        setCreatePageModal(false);
    }

    const handleSave = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('title', pageTitle);
        form.append('category', categoryId);
        form.append('type', pageType);
        form.append('description', desc);
        banners.forEach((pic) => {
            console.log('banner ', pic);
            form.append('banners', pic);
        });
        products.forEach((pic) => {
            console.log('product ', pic);
            form.append('products', pic);
        });

        dispatch(createPage(form));
        handleClose();
    }

    useEffect(() => {
        setCategories(createCategoryList(category.categories,
            [
                < option value='' key={-1} > Select Category </option>
            ]
        ));
    }, [category]);

    // useEffect(() => {
    //     // console.log(page);
    // }, [page]);

    const handleBannerImages = (e) => {
        setBanners([...e.target.files]);
    }
    const handleProductImages = (e) => {
        setProducts([...e.target.files]);
    }

    const handleBannerUrlInput = (value = null, i = null) => {
        let urlList = banners.map((val, ind) => (i === ind) ? value : val)
        if (value === null) {
            setBannersChecked(bannersCheck - 1);
            urlList.pop();
        }
        setBanners(urlList);
    }
    const renderBannerPicUrl = () => {
        const urlList = [];
        for (let i = 0; i < bannersCheck; i++) {
            urlList.push(
                <Row key={i}>
                    <Col>
                        <Input
                            value={banners[i]}
                            placeholder={"Banner Image URL"}
                            required={true}
                            onChange={e => handleBannerUrlInput(e.target.value, i)}
                        />
                    </Col>
                </Row>
            )
        }
        return (
            <>
                {urlList}
            </>
        )
    }

    const handleProductUrlInput = (value = null, i = null) => {
        let urlList = products.map((val, ind) => (i === ind) ? value : val)
        if (value === null) {
            setProductsChecked(productsCheck - 1);
            urlList.pop();
        }
        setProducts(urlList);
    }
    const renderProductPicUrl = () => {
        const urlList = [];
        for (let i = 0; i < productsCheck; i++) {
            urlList.push(
                <Row key={i}>
                    <Col>
                        <Input
                            value={products[i]}
                            placeholder={"Product Image URL"}
                            required={true}
                            onChange={e => handleProductUrlInput(e.target.value, i)}
                        />
                    </Col>
                </Row>
            )
        }
        return (
            <>
                {urlList}
            </>
        )
    }

    const renderCreatePageModal = () => {
        return (
            <Modal show={createPageModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Page</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleSave(e)}>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col className="form-group">
                                    <label>Category</label>
                                    <select value={categoryId} className="form-control" onChange={e => setCategoryId(e.target.value)} required={true}>
                                        {
                                            categories.map(option => option)
                                        }
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input
                                        label={"Page Title"}
                                        value={pageTitle}
                                        placeholder={"Page Title"}
                                        onChange={(e) => setPageTitle(e.target.value)}
                                        required={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="form-group">
                                    <label>Page Type</label>
                                    <select value={pageType} className="form-control" onChange={(e) => setPageType(e.target.value)} required={true}>
                                        <option value="">Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input
                                        label={"Description"}
                                        value={desc}
                                        placeholder={"Description"}
                                        onChange={(e) => setDesc(e.target.value)}
                                        required={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Banner Images</label>
                                </Col>
                                {bannersCheck}
                                {
                                    bannersCheck === 0 ?
                                        <Col>
                                            <input type={'checkbox'} onChange={(e) => { setBannersChecked(bannersCheck + 1); setBanners(['']); }} /><></>
                                            <label style={{ marginLeft: '5px' }}>Switch to Url Input</label><br />
                                        </Col>
                                        : null
                                }
                            </Row>
                            {
                                bannersCheck > 0 ?
                                    <Row>
                                        <Col>
                                            <h6>Manage URL INPUT :</h6>
                                        </Col>
                                        <Row>
                                            <Col>
                                                <Button variant="info" className="btn-sm" onClick={e => { setBannersChecked(bannersCheck + 1); setBanners([...banners, '']) }}>
                                                    +
                                        </Button>
                                            </Col>
                                            <Col>
                                                <Button variant="info" className="btn-sm" onClick={e => handleBannerUrlInput()}>
                                                    -
                                        </Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                    : null
                            }
                            {(bannersCheck === 0) ?
                                <Row>
                                    <Col className="form-group">
                                        <input
                                            type="file"
                                            onChange={handleBannerImages}
                                            required={true}
                                            className="form-control-file"
                                            multiple
                                        ></input>
                                    </Col>
                                </Row>
                                :
                                renderBannerPicUrl()
                            }
                            {
                                (bannersCheck === 0 && banners.length > 0) ?
                                    banners.map((banner, index) =>
                                        <Row key={index} >
                                            <Col>{banner.name}</Col>
                                        </Row>)
                                    : null
                            }
                            <Row style={{ marginTop: '7px' }}>
                                <Col>
                                    <label>Product Images</label>
                                </Col>
                                {productsCheck}
                                {productsCheck === 0 ?
                                    <Col>
                                        <input type={'checkbox'} onChange={(e) => { setProductsChecked(productsCheck + 1); setProducts(['']); }} /><></>
                                        <label style={{ marginLeft: '5px' }}>Switch to Url Input</label><br />
                                    </Col>
                                    : null
                                }
                            </Row>
                            {
                                productsCheck > 0 ?
                                    <Row>
                                        <Col>
                                            <h6>Manage URL INPUT :</h6>
                                        </Col>
                                        <Row>
                                            <Col>
                                                <Button variant="info" className="btn-sm" onClick={e => { setProductsChecked(productsCheck + 1); setProducts([...products, '']) }}>
                                                    +
                                        </Button>
                                            </Col>
                                            <Col>
                                                <Button variant="info" className="btn-sm" onClick={e => handleProductUrlInput()}>
                                                    -
                                        </Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                    : null
                            }
                            {(productsCheck === 0) ?
                                <Row>
                                    <Col className="form-group">
                                        <input
                                            type="file"
                                            onChange={handleProductImages}
                                            required={true}
                                            className="form-control-file"
                                            multiple
                                        ></input>
                                    </Col>
                                </Row>
                                :
                                renderProductPicUrl()
                            }
                            {
                                (productsCheck === 0 && products.length > 0) ?
                                    products.map((product, index) =>
                                        <Row key={index}>
                                            <Col>{product.name}</Col>
                                        </Row>)
                                    : null
                            }
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}> Close </Button>
                        <Button variant="primary" type="submit"> Save Changes </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }

    return (
        <Layout sidebar>
            <Container>
                <Button variant="info" className="btn-md" onClick={() => setCreatePageModal(true)}>
                    <span>Create</span>
                </Button>
                {
                    renderCreatePageModal()
                }

            </Container>
        </Layout>
    );
};

// Page.propTypes = {

// }

export default Page

