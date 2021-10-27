import React from 'react';

import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddDepartmentModal from './AddDepartmentModal';
import EditDepartmentModal from './EditDepartmentModal';

class Department extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            deps:[], 
            showAddDepartmentModal: false,
            showEditDepartmentModal: false
        };

    };

    refreshList() {
        fetch(process.env.REACT_APP_API + 'Department').then(response => response.json()).then(
            (data) => {
                this.setState({deps:data});
            },
            (error) => {
                console.error("We could not load Departments. Error: ", error);
                alert("We could not load Departments. Check console for more informations.");
            }
        );
    };

    componentDidMount() {
        this.refreshList();
    };

    onClickAddDepartment = () => {
        this.setState({ showAddDepartmentModal: true });
    };

    onHideAddDepartmentModal = () => {
        this.setState({ showAddDepartmentModal: false });
        this.refreshList();
    };

    onClickEditDepartment = (dep) => {
        this.setState({
            showEditDepartmentModal: true, 
            departmentId: dep.DepartmentId, 
            departmentName: dep.DepartmentName
        });
    };

    onHideEditDepartmentModal = () => {
        this.setState({ showEditDepartmentModal: false });
        this.refreshList();
    };

    onClickDeleteDepartment = (dep) => {
        if(window.confirm("Are you sure you want to delete the department \"" + dep.DepartmentName + "\"? This cannot be undone!")) {
            fetch(process.env.REACT_APP_API + "department/" + dep.DepartmentId, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(
                () => {
                    this.refreshList();
                },
                (error) => {
                    console.error("We could not delete the department. Error: ", error);
                    alert("We could not delete the department. Check console for more informations.");
                }
            );
        }
    };
    
    render(){
        const {deps, departmentId, departmentName} = this.state;

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
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.onClickEditDepartment(dep)}> Edit </Button>
                                    </ButtonToolbar>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="danger" onClick={()=>this.onClickDeleteDepartment(dep)}> Delete </Button>
                                    </ButtonToolbar>

                                    <EditDepartmentModal show={this.state.showEditDepartmentModal} onHide={this.onHideEditDepartmentModal} departmentid={departmentId} departmentname={departmentName}/>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant="primary" onClick={this.onClickAddDepartment}> Add Department </Button>
                </ButtonToolbar>

                <AddDepartmentModal show={this.state.showAddDepartmentModal} onHide={this.onHideAddDepartmentModal}/>
            </div>
        )
    }
}

export default Department;