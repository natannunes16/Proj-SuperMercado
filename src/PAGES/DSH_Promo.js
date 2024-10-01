import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';


export const DSH_Promo = () => {
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [promotions, setPromotions] = useState([]);

    const [newPromoData, setNewPromoData] = useState({
        produtoId: '',
        descricao: '',
        descontoPercentual: '',
        dataInicio: '',
        dataFim: ''
    });

    const token = localStorage.getItem('token'); 

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
            descricao: '',
            descontoPercentual: '',
            dataInicio: '',
            dataFim: ''
        });
        setShowAddModal(true);
    };

    const handleRemove = (promo) => {
        setSelectedPromo(promo);
        setShowRemoveModal(true);
    };


    const handleCloseRemoveModal = () => {
        setShowRemoveModal(false);
        setSelectedPromo(null);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };


    const handleConfirmRemove = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/promocoes/${selectedPromo._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchPromotions(); 
            handleCloseRemoveModal();
            window.location.reload();
        } catch (error) {
            console.error('Erro ao remover promoção:', error);
        }
    };

    const handleSaveAdd = async () => {
        if (!token) {
            console.error('Token de autenticação não encontrado.');
            return;
        }
        try {
            await axios.post('http://localhost:3000/api/promocoes', newPromoData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchPromotions(); 
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


    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col py-3">
                    <h1>Promoções</h1>
                    <Button variant="primary" className="mb-3" onClick={handleAdd}>
                    <i class="bi bi-cash-stack" style={{ fontSize: '1.5em' }}></i>
                    </Button>
                    <ul className="list-group">
                        {promotions.map((promo) => (
                            <li key={promo._id} className="list-group-item d-flex justify-content-between align-items-center">
                                ID: {promo._id} | Produto afetado: {promo.produtoId?.nome || 'Produto não especificado'} | Descrição da promoção: {promo.descricao} | Desconto Percentual: {promo.descontoPercentual}% | Data Início: {new Date(promo.dataInicio).toLocaleDateString()} | Data Fim: {new Date(promo.dataFim).toLocaleDateString()}
                                <div>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemove(promo)}
                                    >
                                       <i class="bi bi-trash-fill" style={{ fontSize: '1.5em' }}></i>
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
                                        type="text" // Alterado para 'text' para aceitar ObjectId
                                        className="form-control"
                                        id="produtoId"
                                        value={newPromoData.produtoId}
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

                    {/* Modal de Remoção */}
                    <Modal show={showRemoveModal} onHide={handleCloseRemoveModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Remover Promoção</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza que deseja remover a promoção: {selectedPromo?.descricao}?
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
