import React from 'react';
import './login.css';
import MenuTauri from '../../menuwindow/MenuWindow';
import useLogin from './useLogin';

const Login = () => {
  const {
    setUsername, setUsercpf,
    handleLogin, username,
    usercpf, loading,
    erro, sucess,
    handleInputChange,
  } = useLogin()

  return (
    <div>
      <MenuTauri />
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      <div className='container-form-login'>
        <div className="content-form-login">
          <form className='form-login' onSubmit={handleLogin}>

            <input type="text" id="nome-login" name="nome" placeholder='Seu nome' autoComplete='off' value={username} onChange={(e) => {setUsername(e.target.value), handleInputChange()}}/>

            <input type="number" id="cpf-login" name="cpf" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" title="Digite um CPF válido (ex: 123.456.789-09)" placeholder='Seu CPF' autoComplete='off' value={usercpf} onChange={(e) => {setUsercpf(e.target.value), handleInputChange()}}/>


            <button type="submit" id='enviar-login'>Entrar</button>

            <span className="btn-link-cadastro">
              <a href="/cadastro">CADASTRO</a>
            </span>

            {erro && (
              <div>
                <p id='erro'>{erro}</p>
              </div>
            )}

            {sucess && (
              <div>
                <p id='sucess'>{sucess}</p>
              </div>
            )}

          </form>
          <div className="detalhe"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
