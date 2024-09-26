import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Modal, Button } from 'react-bootstrap';
import './Style/DSH_Cliente.css';


export const DSH_Cliente = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [newClientData, setNewClientData] = useState({
        nome: '',
        cpf: '',
        email: '',
        idade: '',
        tempo: '', 
    });

    const [clients, setClients] = useState([
        {
            id: 1,
            nome: "João Silva",
            cpf: "123.456.789-00",
            idade: "26",
            tempo: "Cliente desde 2020-06-03"
        }
    ]);

    const handleEdit = (client) => {
        setSelectedClient(client);
        setShowEditModal(true);
    };

    const handleRemove = (client) => {
        setSelectedClient(client);
        setShowRemoveModal(true);
    };

    const handleAdd = () => {
        setNewClientData({
            nome: '',
            cpf: '',
            email: '',
            idade: '',
            tempo: '' 
        });
        setShowAddModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedClient(null);
    };

    const handleCloseRemoveModal = () => {
        setShowRemoveModal(false);
        setSelectedClient(null);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleSaveEdit = () => {
        setClients((prevClients) =>
            prevClients.map((client) =>
                client.id === selectedClient.id ? { ...client, ...selectedClient } : client
            )
        );
        handleCloseEditModal();
    };

    const handleConfirmRemove = () => {
        setClients((prevClients) =>
            prevClients.filter((client) => client.id !== selectedClient.id)
        );
        handleCloseRemoveModal();
    };

    const handleSaveAdd = () => {
        setClients((prevClients) => [
            ...prevClients,
            { ...newClientData, id: prevClients.length + 1 }
        ]);
        handleCloseAddModal();
    };

    const handleNewClientChange = (e) => {
        const { id, value } = e.target;
        setNewClientData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col py-3">
                    <h1>Clientes</h1>
                    <Button variant="primary" className="mb-3" onClick={handleAdd}>
                        Adicionar Cliente
                    </Button>
                    <ul className="list-group">
                        {clients.map((client) => (
                            <li key={client.id} className="list-group-item d-flex justify-content-between align-items-center">
                                ID: {client.id} | {client.nome} | CPF: {client.cpf} | Idade: {client.idade} | Tempo de Cliente: {client.tempo}
                                <div>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(client)}
                                    >
                                        Atualizar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemove(client)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Modal de Adição */}
                    <Modal show={showAddModal} onHide={handleCloseAddModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Adicionar Cliente</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        value={newClientData.nome}
                                        onChange={handleNewClientChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpf" className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cpf"
                                        value={newClientData.cpf}
                                        onChange={handleNewClientChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={newClientData.email}
                                        onChange={handleNewClientChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="idade" className="form-label">Idade</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="idade"
                                        value={newClientData.idade}
                                        onChange={handleNewClientChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tempo" className="form-label">Tempo de Cliente</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tempo"
                                        value={newClientData.tempo}
                                        onChange={handleNewClientChange}
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAddModal}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleSaveAdd}>
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal de Edição */}
                    <Modal show={showEditModal} onHide={handleCloseEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Atualizar Cliente</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="clientName" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="clientName"
                                        value={selectedClient?.nome || ''}
                                        onChange={(e) => setSelectedClient({ ...selectedClient, nome: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="clientCpf" className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="clientCpf"
                                        value={selectedClient?.cpf || ''}
                                        onChange={(e) => setSelectedClient({ ...selectedClient, cpf: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="clientEmail" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="clientEmail"
                                        value={selectedClient?.email || ''}
                                        onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="clientIdade" className="form-label">Idade</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="clientIdade"
                                        value={selectedClient?.idade || ''}
                                        onChange={(e) => setSelectedClient({ ...selectedClient, idade: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="clientTempo" className="form-label">Tempo de Cliente</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="clientTempo"
                                        value={selectedClient?.tempo || ''}
                                        onChange={(e) => setSelectedClient({ ...selectedClient, tempo: e.target.value })}
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

                    {/* Modal de Remoção */}
                    <Modal show={showRemoveModal} onHide={handleCloseRemoveModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Remover Cliente</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza de que deseja remover {selectedClient?.nome}?
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