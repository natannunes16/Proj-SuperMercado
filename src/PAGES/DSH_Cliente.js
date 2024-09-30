import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Modal, Button } from 'react-bootstrap';
import './Style/DSH_Cliente.css';

export const DSH_Cliente = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [clients, setClients] = useState([]);
    const [showRemoveModal, setShowRemoveModal] = useState(false);

    // Função para buscar clientes do servidor
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/clientes');
                setClients(response.data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        fetchClients();
    }, []);

    // Função para adicionar desconto ao cliente
    const handleAddDiscount = (client) => {
        setSelectedClient(client);
        setShowRemoveModal(true);
    };

    const confirmAddDiscount = async () => {
        if (selectedClient) {
            try {
                await axios.get(`http://localhost:3000/api/clientes/${selectedClient._id}/desconto`);
                // Aqui, você pode atualizar a lista de clientes após adicionar o desconto, se necessário
                setClients((prevClients) =>
                    prevClients.map((client) =>
                        client._id === selectedClient._id ? { ...client, descontoCliente: selectedClient.descontoCliente + 5 } : client // Exemplo de atualização do desconto
                    )
                );
                handleCloseRemoveModal();
            } catch (error) {
                console.error("Erro ao adicionar desconto:", error);
            }
        }
    };

    const handleCloseRemoveModal = () => {
        setShowRemoveModal(false);
        setSelectedClient(null);
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col py-3">
                    <h1>Clientes</h1>
                    <ul className="list-group">
                        {clients.map((client) => (
                            <li key={client._id} className="list-group-item d-flex justify-content-between align-items-center">
                                ID: {client._id} | {client.nome} | CPF: {client.cpf} | Idade: {client.idade} | Tempo de Cliente: {client.tempoCliente} | Desconto: {client.descontoCliente}%
                                <div>
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleAddDiscount(client)}
                                    >
                                        Adicionar Desconto
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Modal para confirmar adição de desconto ao cliente */}
            <Modal show={showRemoveModal} onHide={handleCloseRemoveModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Adição de Desconto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Você tem certeza que deseja adicionar um desconto ao cliente {selectedClient?.nome}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRemoveModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={confirmAddDiscount}>
                        Adicionar Desconto
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
