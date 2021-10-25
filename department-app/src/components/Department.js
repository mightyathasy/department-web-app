import React from 'react';

import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddDepartmentModal from './AddDepartmentModal';

class Department extends React.Component{

    constructor(props) {
        super(props);
        this.state={deps:[], showAddModal: false};

    };

    refreshList() {
        fetch(process.env.REACT_APP_API + 'Department').then(response => response.json()).then(data => {
            this.setState({deps:data});
        });
    };

    componentDidMount() {
        this.refreshList();
    };
    
    render(){
        const {deps} = this.state;
        let addModalOpen = () => this.setState({ showAddModal: true });
        let addModalClose = () => {
            this.setState({ showAddModal: false });
            this.refreshList();
        };

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>DepartmentName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep => 
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>Edit / Delete</td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant="primary" onClick={addModalOpen}> Add Department </Button>
                </ButtonToolbar>

                <AddDepartmentModal show={this.state.showAddModal} onHide={addModalClose}/>
            </div>
        )
    }
}

export default Department;