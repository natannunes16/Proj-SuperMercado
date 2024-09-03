import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from './component/Sidebar'; // Ajuste o caminho se necessário

export const DSH_Produto = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProductData, setNewProductData] = useState({
        nome: '',
        categoria: '',
        preco: '',
        unidade: '',
        descricao: '',
        validade: ''
    });

    const [products, setProducts] = useState([
        {
            id: 1,
            nome: 'Arroz',
            categoria: 'Alimentos',
            preco: 25.99,
            unidade: 'kg',
            descricao: 'Arroz branco tipo 1, pacote de 5 kg.',
            validade: '2025-01-01'
        },
        {
            id: 2,
            nome: 'Leite',
            categoria: 'Bebidas',
            preco: 4.50,
            unidade: 'litro',
            descricao: 'Leite integral, caixa de 1 litro.',
            validade: '2024-12-31'
        },
        {
            id: 3,
            nome: 'Sabão em Pó',
            categoria: 'Limpeza',
            preco: 12.99,
            unidade: 'kg',
            descricao: 'Sabão em pó para roupas, pacote de 1 kg.',
            validade: '2026-05-01'
        },
        {
            id: 4,
            nome: 'Chips',
            categoria: 'Alimentos',
            preco: 8.99,
            unidade: 'g',
            descricao: 'Salgadinho Elma Chips, pacote de 500 g.',
            validade: '2025-06-01'
        },
        {
            id: 5,
            nome: "Vassoura",
            categoria: "Limpeza",
            preco: 8.99,
            unidade: "kg",
            descricao: "Vassoura do Harry Potter, peso de 0,300 kg.",
            validade: '2026-07-01'
          },
          {
            id: 6,
            nome: "Cream Cracker",
            categoria: "Alimentos",
            preco: 3.99,
            unidade: "g",
            descricao: "Bolacha Cream Cracker, pacote de 30 g.",
            validade: '2025-04-07'
          },
          {
            id: 7,
            nome: "Esponja",
            categoria: "Limpeza",
            preco: 2.99,
            unidade: "g",
            descricao: "Esponja de cozinha Scoth Brite, pacote de 10 g.",
            validade: '2027-08-02'
          },
          {
            id: 8,
            nome: "Monster",
            categoria: "Bebidas",
            preco: 9.99,
            unidade: "ml",
            descricao: "Monster Energy, lata de 473 ml.",
            validade: '2025-05-03'
          }
    ]);

    const handleAdd = () => {
        setNewProductData({
            nome: '',
            categoria: '',
            preco: '',
            unidade: '',
            descricao: '',
            validade: ''
        });
        setShowAddModal(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleRemove = (product) => {
        setSelectedProduct(product);
        setShowRemoveModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedProduct(null);
    };

    const handleCloseRemoveModal = () => {
        setShowRemoveModal(false);
        setSelectedProduct(null);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleSaveEdit = () => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === selectedProduct.id ? { ...product, ...selectedProduct } : product
            )
        );
        handleCloseEditModal();
    };

    const handleConfirmRemove = () => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== selectedProduct.id)
        );
        handleCloseRemoveModal();
    };

    const handleSaveAdd = () => {
        setProducts((prevProducts) => [
            ...prevProducts,
            { ...newProductData, id: prevProducts.length + 1 }
        ]);
        handleCloseAddModal();
    };

    const handleNewProductChange = (e) => {
        const { id, value } = e.target;
        setNewProductData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleEditProductChange = (e) => {
        const { id, value } = e.target;
        setSelectedProduct((prevData) => ({
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
                    <h1>PRODUTO</h1>
                    <Button variant="primary" className="mb-3" onClick={handleAdd}>
                        Adicionar Produto
                    </Button>
                    <ul className="list-group">
                        {products.map((product) => (
                            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                ID: {product.id} | {product.nome} | Categoria: {product.categoria} | Preço: R${product.preco} | Validade: {product.validade}
                                <div>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(product)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemove(product)}
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
                            <Modal.Title>Adicionar Produto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        value={newProductData.nome}
                                        onChange={handleNewProductChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoria" className="form-label">Categoria</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="categoria"
                                        value={newProductData.categoria}
                                        onChange={handleNewProductChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="preco" className="form-label">Preço</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="preco"
                                        value={newProductData.preco}
                                        onChange={handleNewProductChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="unidade" className="form-label">Unidade</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="unidade"
                                        value={newProductData.unidade}
                                        onChange={handleNewProductChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descricao" className="form-label">Descrição</label>
                                    <textarea
                                        className="form-control"
                                        id="descricao"
                                        rows="3"
                                        value={newProductData.descricao}
                                        onChange={handleNewProductChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="validade" className="form-label">Data de Validade</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="validade"
                                        value={newProductData.validade}
                                        onChange={handleNewProductChange}
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
                            <Modal.Title>Editar Produto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        value={selectedProduct?.nome || ''}
                                        onChange={handleEditProductChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoria" className="form-label">Categoria</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="categoria"
                                        value={selectedProduct?.categoria || ''}
                                        onChange={handleEditProductChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="preco" className="form-label">Preço</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="preco"
                                        value={selectedProduct?.preco || ''}
                                        onChange={handleEditProductChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="unidade" className="form-label">Unidade</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="unidade"
                                        value={selectedProduct?.unidade || ''}
                                        onChange={handleEditProductChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descricao" className="form-label">Descrição</label>
                                    <textarea
                                        className="form-control"
                                        id="descricao"
                                        rows="3"
                                        value={selectedProduct?.descricao || ''}
                                        onChange={handleEditProductChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="validade" className="form-label">Data de Validade</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="validade"
                                        value={selectedProduct?.validade || ''}
                                        onChange={handleEditProductChange}
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
                            Tem certeza de que deseja remover o produto "{selectedProduct?.nome}"?
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