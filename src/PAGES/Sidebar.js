import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/Sidebar.css'; 

const Sidebar = () => {
    const navigate = useNavigate(); 
    const handleLogout = () => {
        navigate('/'); 
    }; 
    const userName = localStorage.getItem("email");

    return (
        <div className="sidebar d-flex flex-column min-vh-100 p-3 bg-dark text-white">
            <div className="logo mb-4 text-center">
                <h4><i class="bi bi-display"></i> Menu </h4> 
            </div>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="/DSH_Funcionarios" className="nav-link text-white">
                        <i className="fs-5 bi-people"></i> 
                        <span className="ms-2">Funcionários</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/DSH_Cliente" className="nav-link text-white">
                        <i className="fs-5 bi-person"></i> 
                        <span className="ms-2">Clientes</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/DSH_Produto" className="nav-link text-white">
                        <i className="fs-5 bi-box"></i> 
                        <span className="ms-2">Produtos</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/DSH_Promo" className="nav-link text-white">
                        <i className="fs-5 bi-tags"></i> 
                        <span className="ms-2">Promoções</span>
                    </a>
                </li>
            </ul>
            <div className="dropdown mt-auto text-center">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    
                    <strong>{userName}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li>
                        <a className="dropdown-item" href="#" onClick={handleLogout}><i class="bi bi-box-arrow-left"></i> Sair</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
