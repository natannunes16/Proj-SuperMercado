import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './Style/DSH_Funcionarios.css'; 



const token = localStorage.getItem('token');


export const DSH_Funcionarios = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false); 
    const [selectedUser, setSelectedUser] = useState(null);
    const [editData, setEditData] = useState({
        nome: '',
        email: '',
        senha: '',
        cpf: ''
    });

    const [newUserData, setNewUserData] = useState({
        nome: '',
        email: '',
        senha: '',
        cpf: ''
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/usuarios', {
                headers: {
                    Authorization: `token ${token}`
                }  
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditData({
            nome: user.nome,
            email: user.email,
            senha: '',
            cpf: user.cpf
        });
        setShowEditModal(true);
    };

    const handleRemove = (user) => {
        setSelectedUser(user);
        setShowRemoveModal(true);
    };

    const handleAdd = () => {
        setShowAddModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    const handleCloseRemoveModal = () => {
        setShowRemoveModal(false);
        setSelectedUser(null);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setNewUserData({
            nome: '',
            email: '',
            senha: '',
            cpf: ''
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleNewUserChange = (e) => {
        const { id, value } = e.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`http://localhost:3000/api/usuarios/${selectedUser._id}`, editData, {
                
            });
            fetchUsers(); 
            handleCloseEditModal();
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    const handleConfirmRemove = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/usuarios/${selectedUser._id}`, {
               
            });
            fetchUsers(); 
            handleCloseRemoveModal();
        } catch (error) {
            console.error('Erro ao remover usuário:', error);
        }
    };

    const handleSaveNewUser = async () => {
        try {
            await axios.post('http://localhost:3000/api/usuarios/register', newUserData, {
                
            });
            fetchUsers(); 
            handleCloseAddModal();
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col py-3">
                    <h1>Usuários</h1>
                    <Button variant="primary" onClick={handleAdd} className="mb-3">
                         
                    <i class="bi bi-person-plus-fill" style={{ fontSize: '1.5em' }}></i>
                    </Button>
                    <ul className="list-group">
                        {users.map((user) => (
                            <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {user.nome} | Email: {user.email} | CPF: {user.cpf}
                                <div>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(user)}
                                    >
                                        <i class="bi bi-pencil-square" style={{ fontSize: '1.5em' }}></i>
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemove(user)}
                                    >
                                        <i class="bi bi-trash-fill" style={{ fontSize: '1.5em' }}></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Modal de Edição */}
                    <Modal show={showEditModal} onHide={handleCloseEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Atualizar Usuário</Modal.Title>
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
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={editData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="senha"
                                        value={editData.senha}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpf" className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cpf"
                                        value={editData.cpf}
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
                            <Modal.Title>Adicionar Usuário</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        value={newUserData.nome}
                                        onChange={handleNewUserChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={newUserData.email}
                                        onChange={handleNewUserChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="senha"
                                        value={newUserData.senha}
                                        onChange={handleNewUserChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpf" className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cpf"
                                        value={newUserData.cpf}
                                        onChange={handleNewUserChange}
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAddModal}>
                                Fechar
                            </Button>
                            <Button variant="primary" onClick={handleSaveNewUser}>
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal de Remoção */}
                    <Modal show={showRemoveModal} onHide={handleCloseRemoveModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Remover Usuário</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Você tem certeza que deseja remover o usuário {selectedUser?.nome}?
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
