import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Button, Modal, Table, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getProducts } from '../../actions';
import Input from '../../components/Input';
import createCategoryList from '../../helpers/linearCategories';
import './style.css';

const Products = props => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);

    // useEffect(() => {
    //     if (product.loading) {
    //         product.loading = false;
    //         dispatch(getProducts());
    //     }
    // });

    const [productName, setproductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [productPicturesUrl, setProductPicturesUrl] = useState([]);
    const [check, setChecked] = useState(0);
    const [show, setShow] = useState(false);
    const [productDetailModel, setProductDetailModel] = useState(false);
    const [productDetail, setProductDetail] = useState(null);


    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setproductName('');
        setQuantity('');
        setPrice('');
        setDescription('');
        setCategoryId('');
        setProductPictures([]);
        setProductPicturesUrl([]);
        setChecked(0);
    };
    const handleSave = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', productName);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);
        console.log(productPictures);
        for (let pic of productPictures) {
            form.append('productPicture', pic);
        }
        for (let url of productPicturesUrl) {
            form.append('productPicturesUrl', url);
        }
        dispatch(addProduct(form));
        handleClose();
    };


    const handleproductPictures = (e) => {
        setProductPictures([
            ...e.target.files
        ]);
    }

    const handleProductUrlInput = (value = null, i = null) => {
        let urlList = productPicturesUrl.map((val, ind) => (i === ind) ? value : val)
        if (value === null) {
            setChecked(check - 1);
            urlList.pop();
        }
        setProductPicturesUrl(urlList);
    }

    const renderProductPicUrl = () => {
        const urlList = [];
        for (let i = 0; i < check; i++) {
            urlList.push(
                <Row key={i}>
                    <Col>
                        <Input
                            value={productPicturesUrl[i]}
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

    const renderAddProductModal = () => {
        return (
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSave}>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <Input
                                        label={"Product Name"}
                                        value={productName}
                                        placeholder={"Product Name"}
                                        onChange={(e) => setproductName(e.target.value)}
                                        required={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input
                                        label={"Quantity"}
                                        value={quantity}
                                        placeholder={"Quantity"}
                                        onChange={e => setQuantity(e.target.value)}
                                        required={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input
                                        label="Price"
                                        value={price}
                                        placeholder={"Price"}
                                        onChange={e => setPrice(e.target.value)}
                                        required={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input
                                        label="Description"
                                        value={description}
                                        placeholder={"Description"}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="form-group">
                                    <label>Category</label>
                                    <select value={categoryId} className="form-control" required={true} onChange={e => setCategoryId(e.target.value)}>
                                        {
                                            createCategoryList(category.categories, [
                                                < option value='' key={-1} > Select Category </option>
                                            ])
                                        }
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Product Images</label>
                                </Col>
                                {check === 0 ?
                                    <Col>
                                        <input type={'checkbox'} onChange={(e) => { setChecked(check + 1); setProductPictures([]); setProductPicturesUrl(['']); }} /><></>
                                        <label style={{ marginLeft: '5px' }}>Switch to Url Input</label><br />
                                    </Col>
                                    : null
                                }
                            </Row>
                            {check > 0 ?
                                <Row>
                                    <Col>
                                        <h6>Manage URL INPUT :</h6>
                                    </Col>
                                    <Row>
                                        <Col>
                                            <Button variant="info" className="btn-sm" onClick={e => { setChecked(check + 1); setProductPicturesUrl([...productPicturesUrl, '']) }}>
                                                +
                                        </Button>
                                        </Col>
                                        <Col>
                                            <Button variant="info" className="btn-sm" onClick={e => { check > 0 ? handleProductUrlInput() : setChecked(0) }}>
                                                -
                                        </Button>
                                        </Col>
                                    </Row>
                                </Row>
                                : null
                            }
                            {(check === 0) ?
                                <Row>
                                    <Col className="form-group">
                                        <input className="form-control-file" type="file" name={productPictures} onChange={handleproductPictures} multiple></input>
                                    </Col>
                                </Row>
                                :
                                renderProductPicUrl()
                            }
                            {
                                productPictures.length > 0 ?
                                    productPictures.map((pic, index) => <Row><Col key={index}>{pic.name}</Col></Row>) : null
                            }
                        </Container>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}> Close </Button>
                        <Button variant="primary" type="submit"> Save Changes </Button>
                    </Modal.Footer>
                </Form>

            </Modal >)

    }

    const showProductDetailsModel = (product) => {
        setProductDetail(product);
        setProductDetailModel(true);
        console.log(product);
    }
    const hideProductDetailsModel = (product) => {
        setProductDetailModel(false);
    }

    const renderProducts = () => {
        return (<Table responsive="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {
                    (product.products && product.products.length > 0) ?
                        product.products.map((pro, index) =>
                            <tr onClick={() => showProductDetailsModel(pro)} key={pro._id}>
                                <td>{index + 1}</td>
                                <td>{pro.name}</td>
                                <td>{pro.price}</td>
                                <td>{pro.quantity}</td>
                                <td>{pro.category.name}</td>
                            </tr>
                        )
                        :
                        null
                }
            </tbody>
        </Table>);
    }

    const renderProductDetailsModal = () => {
        if (!productDetail) {
            return null;
        }
        return (
            <Modal size="lg" show={productDetailModel} onHide={hideProductDetailsModel} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="6">
                            <label className="key">Name</label>
                            <p className="value">{productDetail.name}</p>
                        </Col>
                        <Col md="6">
                            <label className="key">Price</label>
                            <p className="value">{productDetail.price}</p>
                        </Col>
                        <Col md="6">
                            <label className="key">Quantity</label>
                            <p className="value">{productDetail.quantity}</p>
                        </Col>
                        <Col md="6">
                            <label className="key">Category</label>
                            <p className="value">{productDetail.category.name}</p>
                        </Col>
                        <Col md="12">
                            <label className="key">Description</label>
                            <p className="value">{productDetail.description}</p>
                        </Col>
                        <Col md="12">
                            <label className="key">Product Pictures</label>
                            <div style={{ display: "flex" }}>
                                {productDetail.productPictures.map((pic, index) => (
                                    <div className="productImgContainer" key={index}>
                                        <img src={pic.img} alt="" />
                                    </div>
                                ))}
                            </div>
                        </Col>

                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideProductDetailsModel}> Close </Button>
                    {/* <Button variant="primary" onClick={}> Save Changes </Button> */}
                </Modal.Footer>
            </Modal>
        )
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12} >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Product</h3>
                            <>
                                <Button variant="primary" onClick={handleShow}>Add</Button>
                                {renderAddProductModal()}
                            </>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                    </Col>
                </Row>
            </Container>
            {renderProducts()}
            {renderProductDetailsModal()}
        </Layout>
    )
}

Products.propTypes = {

}

export default Products
