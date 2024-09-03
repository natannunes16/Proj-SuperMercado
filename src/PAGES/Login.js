import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/Login.css';
import './Style/Bootstrap.css';

export const Login = () => {
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPassword, setCustomerPassword] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); 

    const handleLogin = (e, userType) => {
        e.preventDefault();

        let email, password;

        if (userType === 'customer') {
            email = customerEmail;
            password = customerPassword;
        } else if (userType === 'employee') {
            email = employeeEmail;
            password = employeePassword;
        }

        if (!email.trim()) {
            setError('O campo de email é obrigatório.');
            return;
        }

        if (!email.endsWith('@gmail.com')) {
            setError('Apenas emails do Gmail são permitidos.');
            return;
        }

        if (password.trim() === '') {
            setError('A senha é obrigatória.');
            return;
        }

        setError('');
        console.log(`${userType.charAt(0).toUpperCase() + userType.slice(1)} Login:`, { email, password });
        navigate('/DSH_Funcionarios'); 
    };

    return (
        <>
            <div className='mt-5 d-flex justify-content-center'>
                {error && (
                    <div className="alert alert-warning error-message" style={{color: '#ff0000'}}>
                        {error}
                    </div>
                )}
            </div>
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-6 login-form-1">
                        <h3>Entre Como Cliente</h3>
                        <form onSubmit={(e) => handleLogin(e, 'customer')}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Seu Email:"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="mt-2 form-control"
                                    placeholder="Sua Senha:"
                                    value={customerPassword}
                                    onChange={(e) => setCustomerPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input type="submit" className="mt-5 btnSubmit" value="Login" />
                            </div>
                            <div className="form-group">
                                <a href="#" className="ForgetPwd">Esqueceu a Senha?</a>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6 login-form-2">
                        <h3>Entre Como Funcionário</h3>
                        <form onSubmit={(e) => handleLogin(e, 'employee')}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Seu Email:"
                                    value={employeeEmail}
                                    onChange={(e) => setEmployeeEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="mt-2 form-control"
                                    placeholder="Sua Senha:"
                                    value={employeePassword}
                                    onChange={(e) => setEmployeePassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input type="submit" className="mt-5 btnSubmit" value="Login" />
                            </div>
                            <div className="form-group">
                                <a href="#" className="ForgetPwd">Esqueceu a Senha?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
