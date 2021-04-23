import React from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Input from '../../../components/Input';
// import PropTypes from 'prop-types'

function DeleteCategoryModal(props) {
    const {
        deleteCategoryModal,
        closeDeleteCategory,
        deleteCategoriesForm,
        checkedArray,
        categoryList
    } = props;

    const parentCategoryName = (parentid) => {
        if (parentid) {
            const cate = categoryList.find((c) => (c.props.value === parentid));
            return cate.props.children;
        }
        else {
            return 'None';
        }
    }

    return (
        < Modal show={deleteCategoryModal} onHide={closeDeleteCategory} animation={false} >
            <Modal.Header closeButton>
                <Modal.Title>Delete Categories</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => deleteCategoriesForm(e)}>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>Category Name</label>
                        </Col>
                        <Col>
                            <label>Parent Category</label>
                        </Col>
                    </Row>
                    {
                        checkedArray.length > 0 && checkedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <Input
                                        value={item.children}
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        value={parentCategoryName(item.parentid)}
                                    />
                                </Col>
                            </Row>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteCategory} className="btn-sm"> Close </Button>
                    <Button variant="dark" type="submit" className="btn-sm"> Delete </Button>
                </Modal.Footer>
            </Form>
        </Modal >
    )
}

// DeleteCategoryModal.propTypes = {

// }

export default DeleteCategoryModal

