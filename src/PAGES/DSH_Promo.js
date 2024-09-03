import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from './component/Sidebar';

export const DSH_Promo = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [promotions, setPromotions] = useState([
        {
            id: 1,
            produto_id: 1,
            nome_produto: 'Arroz',
            descricao: 'Desconto especial no pacote de 5 kg de arroz branco.',
            desconto_percentual: 10,
            data_inicio: '2024-08-01',
            data_fim: '2024-08-31'
        },
        {
            id: 2,
            produto_id: 2,
            nome_produto: 'Leite',
            descricao: 'Leve 4 e pague 3 no leite integral.',
            desconto_percentual: 25,
            data_inicio: '2024-08-15',
            data_fim: '2024-09-15'
        },
        {
            id: 3,
            produto_id: 3,
            nome_produto: 'Sabão em Pó',
            descricao: 'Sabão em pó com 15% de desconto para compras acima de 3 unidades.',
            desconto_percentual: 15,
            data_inicio: '2024-08-10',
            data_fim: '2024-08-20'
        },
        {
            id: 4,
            produto_id: 4,
            nome_produto: 'Chips',
            descricao: 'Leve 2 e pague 1 na batatinha.',
            desconto_percentual: 10,
            data_inicio: '2024-08-15',
            data_fim: '2024-09-15'
        },
        {
            id: 5,
            produto_id: 5,
            nome_produto: 'Vassoura',
            descricao: 'Leve 3 e pague 2 na vassoura.',
            desconto_percentual: 25,
            data_inicio: '2024-08-15',
            data_fim: '2024-09-15'
        },
        {
            id: 6,
            produto_id: 6,
            nome_produto: 'Cream Cracker',
            descricao: 'Leve 4 e pague 3 na bolacha.',
            desconto_percentual: 15,
            data_inicio: '2024-08-15',
            data_fim: '2024-09-15'
        },
        {
            id: 7,
            produto_id: 7,
            nome_produto: 'Esponja',
            descricao: 'Leve 6 e pague 3 na esponja.',
            desconto_percentual: 25,
            data_inicio: '2024-08-15',
            data_fim: '2024-09-15'
        },
        {
            id: 8,
            produto_id: 8,
            nome_produto: 'Monster',
            descricao: 'Leve 2 e pague 1 no Monster Energy.',
            desconto_percentual: 50,
            data_inicio: '2024-08-15',
            data_fim: '2024-09-15'
        }
    ]);

    const [newPromoData, setNewPromoData] = useState({
        produto_id: '',
        nome_produto: '',
        descricao: '',
        desconto_percentual: '',
        data_inicio: '',
        data_fim: ''
    });

    const handleAdd = () => {
        setNewPromoData({
            produto_id: '',
            nome_produto: '',
            descricao: '',
            desconto_percentual: '',
            data_inicio: '',
            data_fim: ''
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

    const handleSaveEdit = () => {
        setPromotions((prevPromotions) =>
            prevPromotions.map((promo) =>
                promo.id === selectedPromo.id ? { ...promo, ...selectedPromo } : promo
            )
        );
        handleCloseEditModal();
    };

    const handleConfirmRemove = () => {
        setPromotions((prevPromotions) =>
            prevPromotions.filter((promo) => promo.id !== selectedPromo.id)
        );
        handleCloseRemoveModal();
    };

    const handleSaveAdd = () => {
        setPromotions((prevPromotions) => [
            ...prevPromotions,
            { ...newPromoData, id: prevPromotions.length + 1 }
        ]);
        handleCloseAddModal();
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
                    <h1>PROMOÇÃO</h1>
                    <Button variant="primary" className="mb-3" onClick={handleAdd}>
                        Adicionar Promoção
                    </Button>
                    <ul className="list-group">
                        {promotions.map((promo) => (
                            <li key={promo.id} className="list-group-item d-flex justify-content-between align-items-center">
                                ID:{promo.id} | ID Do Produto: {promo.produto_id} | Nome da Promoção: {promo.nome_produto} | Desconto Percentual: {promo.desconto_percentual}% | Data Início: {promo.data_inicio} | Data Fim: {promo.data_fim}
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
                                    <label htmlFor="produto_id" className="form-label">ID do Produto</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="produto_id"
                                        value={newPromoData.produto_id}
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
                                    <label htmlFor="desconto_percentual" className="form-label">Desconto Percentual</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="desconto_percentual"
                                        value={newPromoData.desconto_percentual}
                                        onChange={handleNewPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="data_inicio" className="form-label">Data de Início</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="data_inicio"
                                        value={newPromoData.data_inicio}
                                        onChange={handleNewPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="data_fim" className="form-label">Data de Fim</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="data_fim"
                                        value={newPromoData.data_fim}
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
                                    <label htmlFor="produto_id" className="form-label">ID do Produto</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="produto_id"
                                        value={selectedPromo?.produto_id || ''}
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
                                    <label htmlFor="desconto_percentual" className="form-label">Desconto Percentual</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="desconto_percentual"
                                        value={selectedPromo?.desconto_percentual || ''}
                                        onChange={handleEditPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="data_inicio" className="form-label">Data de Início</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="data_inicio"
                                        value={selectedPromo?.data_inicio || ''}
                                        onChange={handleEditPromoChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="data_fim" className="form-label">Data de Fim</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="data_fim"
                                        value={selectedPromo?.data_fim || ''}
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
                            <Modal.Title>Confirmar Remoção</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza de que deseja remover a promoção para o produto "{selectedPromo?.nome_produto}"?
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