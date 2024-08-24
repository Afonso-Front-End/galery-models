import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useLogin = () => {
    const url_base = 'http://localhost:3001/'
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [usercpf, setUsercpf] = useState('');
    const [erro, setErro] = useState(null)
    const [sucess, setSucess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [authenticated, setAuthenticated] = useState(false);

    const handleInputChange = () => {
        if (erro !== null || sucess !== null) {
            setErro('');
            setSucess('');
        }
    };

    const clear = () => {
        setUsername("")
        setUsercpf("")
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            setErro(null)
            setSucess(null)
            setLoading(true)
            const response = await axios.post(`${url_base}login`, {
                username,
                usercpf,
            });

            if (response.status === 200) {
                setSucess(response.data.message)
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('token-data', JSON.stringify(response.data.userdata));
                clear()
                navigate('/home/estoque')
                console.log(response)
                return
            } else {
                setErro(response.data.message)
                return
            }

        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setErro(`Erro de conexão "${error.code}"`)
            }else{
                setErro(error.response.data.message)
            }
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            setAuthenticated(true);
            console.log(token)
            navigate('/home/estoque');
            // setUserData(userData);
        } else {
            console.log("Token não encontrado");
            navigate('/login');
        }

    }, [navigate]);

    return {
        setUsername, setUsercpf,
        username, usercpf,
        handleLogin, handleInputChange,
        loading, erro, sucess,
    }
}

export default useLogin;