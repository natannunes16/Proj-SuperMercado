import React, { useState } from 'react';
import Sidebar from './component/Sidebar';
import { Modal, Button } from 'react-bootstrap';

export const DSH_Cliente = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [newClientData, setNewClientData] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        endereco: {
            rua: '',
            numero: '',
            cidade: '',
            estado: '',
            cep: ''
        }
    });

    const [clients, setClients] = useState([
        {
            id: 1,
            nome: "João Silva",
            cpf: "123.456.789-00",
            email: "joao.silva@email.com",
            telefone: "(11) 91234-5678",
            endereco: {
                rua: "Rua das Flores",
                numero: 123,
                cidade: "São Paulo",
                estado: "SP",
                cep: "01000-000"
            }
        },
        {
            id: 2,
            nome: "Fernanda Lima",
            cpf: "987.654.321-00",
            email: "fernanda.lima@email.com",
            telefone: "(11) 99876-5432",
            endereco: {
                rua: "Avenida Central",
                numero: 456,
                cidade: "São Paulo",
                estado: "SP",
                cep: "02000-000"
            }
        },
        {
            id: 3,
            nome: "Lucas Oliveira",
            cpf: "456.789.123-00",
            email: "lucas.oliveira@email.com",
            telefone: "(11) 98765-4321",
            endereco: {
                rua: "Rua dos Andradas",
                numero: 789,
                cidade: "São Paulo",
                estado: "SP",
                cep: "03000-000"
            }
        }
    ]);

    // Mostrar modal de edição
    const handleEdit = (client) => {
        setSelectedClient(client);
        setShowEditModal(true);
    };

    // Mostrar modal de remoção
    const handleRemove = (client) => {
        setSelectedClient(client);
        setShowRemoveModal(true);
    };

    // Mostrar modal de adição
    const handleAdd = () => {
        setNewClientData({
            nome: '',
            cpf: '',
            email: '',
            telefone: '',
            endereco: {
                rua: '',
                numero: '',
                cidade: '',
                estado: '',
                cep: ''
            }
        });
        setShowAddModal(true);
    };

    // Fechar modais
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

    // Salvar edição
    const handleSaveEdit = () => {
        setClients((prevClients) =>
            prevClients.map((client) =>
                client.id === selectedClient.id ? { ...client, ...selectedClient } : client
            )
        );
        handleCloseEditModal();
    };

    // Confirmar remoção
    const handleConfirmRemove = () => {
        setClients((prevClients) =>
            prevClients.filter((client) => client.id !== selectedClient.id)
        );
        handleCloseRemoveModal();
    };

    // Adicionar novo cliente
    const handleSaveAdd = () => {
        setClients((prevClients) => [
            ...prevClients,
            { ...newClientData, id: prevClients.length + 1 }
        ]);
        handleCloseAddModal();
    };

    // Atualizar dados do novo cliente enquanto o usuário edita
    const handleNewClientChange = (e) => {
        const { id, value } = e.target;
        if (id.startsWith('endereco.')) {
            const [_, key] = id.split('.');
            setNewClientData((prevData) => ({
                ...prevData,
                endereco: {
                    ...prevData.endereco,
                    [key]: value
                }
            }));
        } else {
            setNewClientData((prevData) => ({
                ...prevData,
                [id]: value
            }));
        }
    };
    const itemCount = Object.values(clients).length;
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
                    <p>Clientes Cadastrados: {itemCount}</p>
                    <ul className="list-group">
                        {clients.map((client) => ( 
                            
                            <li key={client.id} className="list-group-item d-flex justify-content-between align-items-center">
                                ID: {client.id} | {client.nome} | CPF: {client.cpf} | Email: {client.email} | Telefone: {client.telefone}
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
                                    <label htmlFor="telefone" className="form-label">Telefone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telefone"
                                        value={newClientData.telefone}
                                        onChange={handleNewClientChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endereco.rua" className="form-label">Rua</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="endereco.rua"
                                        value={newClientData.endereco.rua}
                                        onChange={handleNewClientChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endereco.numero" className="form-label">Número</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="endereco.numero"
                                        value={newClientData.endereco.numero}
                                        onChange={handleNewClientChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endereco.cidade" className="form-label">Cidade</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="endereco.cidade"
                                        value={newClientData.endereco.cidade}
                                        onChange={handleNewClientChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endereco.estado" className="form-label">Estado</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="endereco.estado"
                                        value={newClientData.endereco.estado}
                                        onChange={handleNewClientChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endereco.cep" className="form-label">CEP</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="endereco.cep"
                                        value={newClientData.endereco.cep}
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
                                    <label htmlFor="clientTelefone" className="form-label">Telefone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="clientTelefone"
                                        value={selectedClient?.telefone || ''}
                                        onChange={(e) => setSelectedClient({ ...selectedClient, telefone: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="clientEndereco" className="form-label">Endereço</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="clientEndereco"
                                        value={`${selectedClient?.endereco.rua || ''}, ${selectedClient?.endereco.numero || ''}, ${selectedClient?.endereco.cidade || ''} - ${selectedClient?.endereco.estado || ''}, ${selectedClient?.endereco.cep || ''}`}
                                        onChange={(e) =>
                                            setSelectedClient({
                                                ...selectedClient,
                                                endereco: {
                                                    ...selectedClient.endereco,
                                                    rua: e.target.value.split(',')[0] || selectedClient.endereco.rua,
                                                    numero: e.target.value.split(',')[1] || selectedClient.endereco.numero,
                                                    cidade: e.target.value.split(',')[2] || selectedClient.endereco.cidade,
                                                    estado: e.target.value.split('-')[1]?.trim() || selectedClient.endereco.estado,
                                                    cep: e.target.value.split('-')[2]?.trim() || selectedClient.endereco.cep,
                                                }
                                            })
                                        }
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