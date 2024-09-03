import React, { useState } from 'react';
import Sidebar from './component/Sidebar';
import { Modal, Button } from 'react-bootstrap';

export const DSH_Funcionarios = () => {
    
    const [employees, setEmployees] = useState([
        {
            id: 1,
            nome: "Maria Oliveira",
            cargo: "Repositor",
            data_contratacao: "2022-03-10",
            turno: "Manhã"
        },
        {
            id: 2,
            nome: "Carlos Pereira",
            cargo: "Repositor",
            data_contratacao: "2021-08-22",
            turno: "Tarde"
        },
        {
            id: 3,
            nome: "Ana Souza",
            cargo: "Gerente",
            data_contratacao: "2019-11-01",
            turno: "Integral"
        },
        {
            id: 4,
            nome: "Lucas Almeida",
            cargo: "Repositor",
            data_contratacao: "2023-08-22",
            turno: "Tarde"
        },
        {
            id: 5,
            nome: "Nicolas Fonseca",
            cargo: "Repositor",
            data_contratacao: "2020-08-22",
            turno: "Tarde"
        }
    ]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false); 
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editData, setEditData] = useState({
        nome: '',
        cargo: '',
        data_contratacao: '',
        turno: ''
    });

    const [newEmployeeData, setNewEmployeeData] = useState({
        id: '',
        nome: '',
        cargo: '',
        data_contratacao: '',
        turno: ''
    });


    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setEditData({
            nome: employee.nome,
            cargo: employee.cargo,
            data_contratacao: employee.data_contratacao,
            turno: employee.turno
        });
        setShowEditModal(true);
    };

    const handleRemove = (employee) => {
        setSelectedEmployee(employee);
        setShowRemoveModal(true);
    };

    const handleAdd = () => {
        setShowAddModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedEmployee(null);
    };

    const handleCloseRemoveModal = () => {
        setShowRemoveModal(false);
        setSelectedEmployee(null);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setNewEmployeeData({
            id: '',
            nome: '',
            cargo: '',
            data_contratacao: '',
            turno: ''
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleNewEmployeeChange = (e) => {
        const { id, value } = e.target;
        setNewEmployeeData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSaveEdit = () => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((emp) =>
                emp.id === selectedEmployee.id ? { ...emp, ...editData } : emp
            )
        );
        handleCloseEditModal();
    };

    const handleConfirmRemove = () => {
        setEmployees((prevEmployees) =>
            prevEmployees.filter((emp) => emp.id !== selectedEmployee.id)
        );
        handleCloseRemoveModal();
    };

    const handleSaveNewEmployee = () => {
        setEmployees((prevEmployees) => [
            ...prevEmployees,
            { ...newEmployeeData, id: prevEmployees.length + 1 }
        ]);
        handleCloseAddModal();
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col py-3">
                    <h1>Funcionários</h1>
                    <Button variant="primary" onClick={handleAdd} className="mb-3">
                        Adicionar Funcionário
                    </Button>
                    <ul className="list-group">
                        {employees.map((employee) => (
                            <li key={employee.id} className="list-group-item d-flex justify-content-between align-items-center">
                                ID: {employee.id} | {employee.nome} | Cargo: {employee.cargo} | Turno: {employee.turno} | Data de Contratação: {employee.data_contratacao}
                                <div>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(employee)}
                                    >
                                        Atualizar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemove(employee)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Modal de Edição */}
                    <Modal show={showEditModal} onHide={handleCloseEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Atualizar Funcionário</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        value={editData.nome}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cargo" className="form-label">Cargo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cargo"
                                        value={editData.cargo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="data_contratacao" className="form-label">Data de Contratação</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="data_contratacao"
                                        value={editData.data_contratacao}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="turno" className="form-label">Turno</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="turno"
                                        value={editData.turno}
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEditModal}>
                                Fechar
                            </Button>
                            <Button variant="primary" onClick={handleSaveEdit}>
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal de Adição */}
                    <Modal show={showAddModal} onHide={handleCloseAddModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Adicionar Funcionário</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        value={newEmployeeData.nome}
                                        onChange={handleNewEmployeeChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cargo" className="form-label">Cargo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cargo"
                                        value={newEmployeeData.cargo}
                                        onChange={handleNewEmployeeChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="data_contratacao" className="form-label">Data de Contratação</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="data_contratacao"
                                        value={newEmployeeData.data_contratacao}
                                        onChange={handleNewEmployeeChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="turno" className="form-label">Turno</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="turno"
                                        value={newEmployeeData.turno}
                                        onChange={handleNewEmployeeChange}
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAddModal}>
                                Fechar
                            </Button>
                            <Button variant="primary" onClick={handleSaveNewEmployee}>
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal de Remoção */}
                    <Modal show={showRemoveModal} onHide={handleCloseRemoveModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Remover Funcionário</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza de que deseja remover {selectedEmployee?.nome}?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseRemoveModal}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleConfirmRemove}>
                                Remover
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};