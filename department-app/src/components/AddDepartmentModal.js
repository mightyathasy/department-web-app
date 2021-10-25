import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class AddDepartmentModal extends Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(oEvent) {
        oEvent.preventDefault();
        const departmentName = oEvent.target.DepartmentName.value;

        fetch(process.env.REACT_APP_API + "Department", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                DepartmentId: undefined,        // Should not be passed as its generated in the backend
                DepartmentName: departmentName
            })
        }).then(result=>result.json()).then(
            result=>{
                this.props.onHide();
            },
            (error) => {
                console.error("Could not save Department \"" + departmentName + "\". Error: ", error);
                alert("Could not save Department!");
            }
        );
    };

    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Department
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Row>
                                <Col sm={6}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="DepartmentName">
                                            <Form.Label>Department Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="DepartmentName"
                                                placeholder="Department Name"
                                                required/>
                                        </Form.Group>

                                        <Form.Group>
                                            <Button variant="primary" type="submit">
                                                Add Department
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="danger" onClick={this.props.onHide}>
                                Close
                            </Button>
                        </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AddDepartmentModal;