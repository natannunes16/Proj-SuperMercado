import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './PAGES/Login';
import {DSH_Produto} from './PAGES/DSH_Produto';
import {DSH_Promo} from './PAGES/DSH_Promo';
import {DSH_Cliente} from './PAGES/DSH_Cliente';
import {DSH_Funcionarios} from './PAGES/DSH_Funcionarios';





export const Paginas = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/DSH_Funcionarios" element={<DSH_Funcionarios />} />
                <Route path="/DSH_Cliente" element={<DSH_Cliente />} />
                <Route path="/DSH_Promo" element={<DSH_Promo />} />
                <Route path="/DSH_Produto" element={<DSH_Produto/>}/>
                <Route path="*" element={<div>ERRO: 404 <br/><p>Essa página não existe :( <br/><a href="/">Volte para a Página anterior!</a></p></div>} />
            </Routes>
        </Router>
    );
};
