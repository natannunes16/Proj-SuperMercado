import React, { useState, useEffect } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';
import './Style/DSH_Produto.css';

const token = localStorage.getItem('token');
export const DSH_Produto = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProductData, setNewProductData] = useState({
        nome: '',
        tipo: '',
        precoAtual: '',
        descricao: '',
        validade: '',
        img: null 
    });
    console.log(token);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/produtos', {
                    headers: {
                        Authorization: `token ${token}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAdd = () => {
        setNewProductData({
            nome: '',
            tipo: '',
            precoAtual: '',
            descricao: '',
            validade: '',
            img: null
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

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/produtos/${selectedProduct._id}`, selectedProduct, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === response.data._id ? response.data : product
                )
            );
            handleCloseEditModal();
            window.location.reload();
        } catch (error) {
            console.error("Erro ao editar produto:", error);
        }
    };

    const handleConfirmRemove = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/produtos/${selectedProduct._id}`, {
                headers: {
                    Authorization: `Cookie ${token}`
                }
            });
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== selectedProduct._id)
            );
            handleCloseRemoveModal();
            window.location.reload();
        } catch (error) {
            console.error("Erro ao remover produto:", error);
        }
    };

    const handleSaveAdd = async () => {
        const formData = new FormData();
        Object.entries(newProductData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await axios.post('http://localhost:3000/api/produtos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `token ${token}`
                }
            });
            setProducts((prevProducts) => [...prevProducts, response.data]);
            handleCloseAddModal();
            window.location.reload();
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
        }
    };

    const handleNewProductChange = (e) => {
        const { id, value } = e.target;
        setNewProductData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleImageChange = (e) => {
        setNewProductData((prevData) => ({
            ...prevData,
            img: e.target.files[0]
        }));
    };

    const handleEditProductChange = (e) => {
        const { id, value } = e.target;
        setSelectedProduct((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedProduct({ ...selectedProduct, img: reader.result.split(',')[1] }); 
            };
            reader.readAsDataURL(file); 
        }
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col py-3">
                    <h1>Produtos</h1>
                    <Button variant="primary" className="mb-3" onClick={handleAdd}>
                    <i class="bi bi-bag-plus-fill"></i>
                    </Button>
                    <div className="card-grid">
                        {products.map((product) => (
                            <Card key={product._id} style={{ width: '18rem' }} className="mb-3">
                                <Card.Img variant="top" src={`data:image/png;base64,${product.img}`} />
                                <Card.Body>
                                    <Card.Title>{product.nome}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Categoria: {product.tipo}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        ID: {product._id}<br />
                                        Preço: R${product.precoAtual}<br />
                                        Preço com desconto: R${product.precoPromocional}<br />
                                        Validade: {new Date(product.validade).toLocaleDateString()}<br />
                                        Descrição: {product.descricao}
                                    </Card.Text>
                                    <Button variant="warning" onClick={() => handleEdit(product)} className="me-2">
                                    <i class="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => handleRemove(product)}>
                                    <i class="bi bi-trash-fill"></i>
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>

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
                                    <label htmlFor="tipo" className="form-label">Tipo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tipo"
                                        value={newProductData.tipo}
                                        onChange={handleNewProductChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="precoAtual" className="form-label">Preço Atual</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="precoAtual"
                                        value={newProductData.precoAtual}
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
                                <div className="mb-3">
                                    <label htmlFor="img" className="form-label">Imagem</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="img"
                                        onChange={handleImageChange}
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
                                    <label htmlFor="tipo" className="form-label">Tipo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tipo"
                                        value={selectedProduct?.tipo || ''}
                                        onChange={handleEditProductChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="precoAtual" className="form-label">Preço Atual</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="precoAtual"
                                        value={selectedProduct?.precoAtual || ''}
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
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleSaveEdit}>
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal de Remoção */}
                    <Modal show={showRemoveModal} onHide={handleCloseRemoveModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Remover Produto</Modal.Title>
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