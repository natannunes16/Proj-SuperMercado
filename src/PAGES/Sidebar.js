import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/Sidebar.css'; 

const Sidebar = () => {
    const navigate = useNavigate(); 
    const handleLogout = () => {
        navigate('/'); 
    }; 

    return (
        <div className="sidebar d-flex flex-column min-vh-100">
            <div className="logo">
                <span>Menu</span>
            </div>
            <div className="d-flex flex-column flex-grow-1 px-3 pt-2">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                    <li className="nav-item">
                        <a href="/DSH_Funcionarios" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Funcionários</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/DSH_Cliente" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Clientes</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/DSH_Produto" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-box"></i> <span className="ms-1 d-none d-sm-inline">Produtos</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/DSH_Promo" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-tags"></i> <span className="ms-1 d-none d-sm-inline">Promoções</span>
                        </a>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="dropdown pb-4 mt-auto">
                <a href="#" className="dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="User Avatar" width="30" height="30" className="rounded-circle" />
                    <span className="d-none d-sm-inline mx-1">User</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Sair</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;