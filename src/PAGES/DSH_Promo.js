import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';

export const DSH_Promo = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [promotions, setPromotions] = useState([]);
    
    const [newPromoData, setNewPromoData] = useState({
        produtoId: '',
        nome_produto: '',
        descricao: '',
        descontoPercentual: '',
        dataInicio: '',
        dataFim: ''
    });

    const token = localStorage.getItem('token'); // Supondo que você armazena o token no localStorage

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/promocoes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPromotions(response.data);
        } catch (error) {
            console.error('Erro ao buscar promoções:', error);
        }
    };

    const handleAdd = () => {
        setNewPromoData({
            produtoId: '',
            nome_produto: '',
            descricao: '',
            descontoPercentual: '',
            dataInicio: '',
            dataFim: ''
        });
        setShowAddModal(true);
    };

    const handleEdit = (promo) => {
        setSelectedPromo(promo);
        setShowEditModal(true);
    };

    const handleRemove = (promo) => {
        setSelectedPromo(promo);
        setShowRemoveModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedPromo(null);
    };

    const handleCloseRemoveModal = () => {
        setShowRemoveModal(false);
        setSelectedPromo(null);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`http://localhost:3000/api/promocoes/${selectedPromo._id}`, selectedPromo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchPromotions(); // Atualiza a lista de promoções após a edição
            handleCloseEditModal();
        } catch (error) {
            console.error('Erro ao editar promoção:', error);
        }
    };

    const handleConfirmRemove = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/promocoes/${selectedPromo._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchPromotions(); // Atualiza a lista de promoções após a remoção
            handleCloseRemoveModal();
        } catch (error) {
            console.error('Erro ao remover promoção:', error);
        }
    };

    const handleSaveAdd = async () => {
        try {
            await axios.post('http://localhost:3000/api/promocoes', newPromoData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchPromotions(); // Atualiza a lista de promoções após a adição
            handleCloseAddModal();
        } catch (error) {
            console.error('Erro ao adicionar promoção:', error);
        }
    };

    const handleNewPromoChange = (e) => {
        const { id, value } = e.target;
        setNewPromoData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleEditPromoChange = (e) => {
        const { id, value } = e.target;
        setSelectedPromo((prevData) => ({
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
                    <h1>Promoções</h1>
                    <Button variant="primary" className="mb-3" onClick={handleAdd}>
                        Adicionar Promoção
                    </Button>
                    <ul className="list-group">
    {promotions.map((promo) => (
        <li key={promo._id} className="list-group-item d-flex justify-content-between align-items-center">
            ID: {promo._id} | Nome da Promoção: {promo.produtoId.nome} | Desconto Percentual: {promo.descontoPercentual}% | Data Início: {promo.dataInicio} | Data Fim: {promo.dataFim}
            <div>
                <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(promo)}
                >
                    Editar
                </button>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(promo)}
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
                            <Modal.Title>Adicionar Promoção</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="produtoId" className="form-label">ID do Produto</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="produtoId"
                                        value={newPromoData.produtoId}
                                        onChange={handleNewPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nome_produto" className="form-label">Nome do Produto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome_produto"
                                        value={newPromoData.nome_produto}
                                        onChange={handleNewPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descricao" className="form-label">Descrição</label>
                                    <textarea
                                        className="form-control"
                                        id="descricao"
                                        rows="3"
                                        value={newPromoData.descricao}
                                        onChange={handleNewPromoChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descontoPercentual" className="form-label">Desconto Percentual</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="descontoPercentual"
                                        value={newPromoData.descontoPercentual}
                                        onChange={handleNewPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dataInicio" className="form-label">Data de Início</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dataInicio"
                                        value={newPromoData.dataInicio}
                                        onChange={handleNewPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dataFim" className="form-label">Data de Fim</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dataFim"
                                        value={newPromoData.dataFim}
                                        onChange={handleNewPromoChange}
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAddModal}>
                                Fechar
                            </Button>
                            <Button variant="primary" onClick={handleSaveAdd}>
                                Adicionar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal de Edição */}
                    <Modal show={showEditModal} onHide={handleCloseEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Promoção</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="produtoId" className="form-label">ID do Produto</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="produtoId"
                                        value={selectedPromo?.produtoId || ''}
                                        onChange={handleEditPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nome_produto" className="form-label">Nome do Produto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome_produto"
                                        value={selectedPromo?.nome_produto || ''}
                                        onChange={handleEditPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descricao" className="form-label">Descrição</label>
                                    <textarea
                                        className="form-control"
                                        id="descricao"
                                        rows="3"
                                        value={selectedPromo?.descricao || ''}
                                        onChange={handleEditPromoChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descontoPercentual" className="form-label">Desconto Percentual</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="descontoPercentual"
                                        value={selectedPromo?.descontoPercentual || ''}
                                        onChange={handleEditPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dataInicio" className="form-label">Data de Início</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dataInicio"
                                        value={selectedPromo?.dataInicio || ''}
                                        onChange={handleEditPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dataFim" className="form-label">Data de Fim</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dataFim"
                                        value={selectedPromo?.dataFim || ''}
                                        onChange={handleEditPromoChange}
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
                            <Modal.Title>Remover Promoção</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza que deseja remover a promoção: {selectedPromo?.nome_produto}?
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

export default DSH_Promo;
