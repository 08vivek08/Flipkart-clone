import React from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Input from '../../../components/Input';

// import PropTypes from 'prop-types'

function UpdateCategoryModal(props) {
    const {
        show,
        handleClose,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        handleCategoryImage,
        categoryList,
        updateCategoriesForm
    } = props;

    return (
        < Modal size="xl" show={show} onHide={handleClose} animation={false} >
            <Modal.Header closeButton>
                <Modal.Title>Update Categories</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => updateCategoriesForm(e)}>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h5>
                                Expanded
                                </h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Category Name</label>
                        </Col>
                        <Col>
                            <label>Parent Category</label>
                        </Col>
                        <Col>
                            <label>Select Type (if any)</label>
                        </Col>
                        <Col>
                            <label>Category Picture</label>
                        </Col>
                    </Row>
                    {
                        expandedArray.length > 0 && expandedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <Input
                                        value={item.children}
                                        placeholder={"Category Name"}
                                        required={true}
                                        onChange={(e) => handleCategoryInput('children', e.target.value, index, 'expanded')}
                                    />
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <select value={item.parentid} className="form-control"
                                            onChange={(e) => handleCategoryInput('parentid', e.target.value, index, 'expanded')}
                                        >
                                            {
                                                categoryList.map(option=>option)
                                            }
                                        </select>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <select value={item.catetype} className="form-control" onChange={(e) => handleCategoryInput('catetype', e.target.value, index, 'expanded')} >
                                            <option value="">Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="product">Product</option>
                                            <option value="page">Page</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <input className="form-control-file" type="file" name="categoryImage" onChange={handleCategoryImage}></input>
                                    </div>
                                </Col>
                            </Row>
                        )
                    }
                    <hr />
                    <Row>
                        <Col>
                            <h5>
                                Checked
                                </h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Category Name</label>
                        </Col>
                        <Col>
                            <label>Parent Category</label>
                        </Col>
                        <Col>
                            <label>Select Type (if any)</label>
                        </Col>
                        <Col>
                            <label>Category Picture</label>
                        </Col>
                    </Row>
                    {
                        checkedArray.length > 0 && checkedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <Input
                                        value={item.children}
                                        placeholder={"Category Name"}
                                        required={true}
                                        onChange={(e) => handleCategoryInput('children', e.target.value, index, 'checked')}
                                    />
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <select value={item.parentid} className="form-control"
                                            onChange={(e) => handleCategoryInput('parentid', e.target.value, index, 'checked')}
                                        >
                                            {
                                                categoryList.map(option => option)
                                            }
                                        </select>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <select value={item.catetype} className="form-control" onChange={(e) => handleCategoryInput('catetype', e.target.value, index, 'checked')} >
                                            <option value="">Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="product">Product</option>
                                            <option value="page">Page</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <input className="form-control-file" type="file" name="categoryImage" onChange={handleCategoryImage}></input>
                                    </div>
                                </Col>
                            </Row>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleClose} className="btn-sm"> Close </Button>
                    <Button variant="secondary" type="submit" className="btn-sm"> Save Changes </Button>
                </Modal.Footer>
            </Form>
        </Modal >
    )
}

// UpdateCategoryModal.propTypes = {

// }

export default UpdateCategoryModal
