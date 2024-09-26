import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Style/Login.css';
import './Style/Bootstrap.css';

export const Login = () => {
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        console.log('Login:', data);
        navigate('/DSH_Funcionarios'); 
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