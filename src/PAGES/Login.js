import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Style/Login.css';
import './Style/Bootstrap.css';

export const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/api/usuarios/login', {
                email: data.email,
                senha: data.password
            }, {
                withCredentials: true, // Para enviar cookies (JWT token)
            });
    
            if (response.status === 200) {
                console.log('Login bem-sucedido', response.data);
                // Salvar o token no localStorage
                localStorage.setItem('token', response.data.token);
                navigate('/DSH_Funcionarios'); // Redirecionar após o login
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('E-mail ou senha incorretos');
            } else {
                setErrorMessage('Erro ao realizar login. Tente novamente.');
            }
        }
    };
    
    return (
        <>
            <div className="login-container">
                <div className="login-box">
                    <h3>Seja bem-vindo!</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Seu Email:"
                                {...register('email', {
                                    required: 'Campo obrigatório.', 
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Formato de e-mail inválido.'
                                    }
                                })}
                            />
                            {errors.email && <p className="error-message">{errors.email.message}</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="mt-2 form-control"
                                placeholder="Sua Senha:"
                                {...register('password', { required: 'A senha é obrigatória.' })}
                            />
                            {errors.password && <p className="error-message">{errors.password.message}</p>}
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="form-group">
                            <input type="submit" className="mt-5 btnSubmit" value="Login" />
                        </div>
                        <div className="form-group">
                            <a href="#" className="ForgetPwd">Esqueceu a Senha?</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
