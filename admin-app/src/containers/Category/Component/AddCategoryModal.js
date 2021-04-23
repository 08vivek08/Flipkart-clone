import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import Input from '../../../components/Input';

// import PropTypes from 'prop-types'
function AddCategoryModal(props) {
    const {
        show,
        handleClose,
        handleSave,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        handleCategoryImage,
        categoryImageURL,
        setCategoryImageUrl,
        categoryList
    } = props;
    const [check, setChecked] = useState(false);

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSave}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Input
                                    label={"Category Name"}
                                    value={categoryName}
                                    placeholder={"Category Name"}
                                    required={true}
                                    onChange={e => setCategoryName(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="form-group">
                                <label>Parent Category (if any)</label>
                                <select value={parentCategoryId} className="form-control" onChange={e => setParentCategoryId(e.target.value)}>
                                    {
                                        categoryList.map(option => option)
                                    }
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>Category Picture</label>
                            </Col>
                            <Col>
                                <input type={'checkbox'} onChange={(e) => { setChecked(!check) }} /><></>
                                <label style={{ marginLeft: '5px' }}>Switch to Url Input</label><br />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {(!check) ?
                                    <input className="form-control-file" type="file" name="categoryImage" onChange={handleCategoryImage}></input>
                                    :
                                    <Input
                                        value={categoryImageURL}
                                        placeholder={"Category Image URL"}
                                        required={true}
                                        onChange={e => setCategoryImageUrl(e.target.value)}
                                    />
                                }
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleClose} className="btn-sm" > Close </Button>
                    <Button variant="secondary" type="submit" className="btn-sm"> Save </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

// AddCategoryModal.propTypes = {

// }

export default AddCategoryModal

