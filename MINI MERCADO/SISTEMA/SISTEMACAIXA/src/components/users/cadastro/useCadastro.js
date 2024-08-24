import { useState } from 'react';
import axios from 'axios';

const useCadastro = () => {
    const url_base = 'http://localhost:3001/'

    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [usercpf, setUsercpf] = useState('');
    const [type, setType] = useState("")
    const [erro, setErro] = useState(null)
    const [sucess, setSucess] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleInputChange = () => {
        if (erro !== null || sucess !== null) {
            setErro('');
            setSucess('');
        }
    };

    const clear = () => {
        setUsername("")
        setUseremail("")
        setUsercpf("")
        setType("")
    }

    const handleCadastro = async (event) => {
        event.preventDefault()
        try {
            setErro(null)
            setSucess(null)
            setLoading(true)
            const response = await axios.post(`${url_base}cadastro`, {
                username,
                useremail,
                usercpf,
                role: type,
            });

            if (response.status === 200) {
                setSucess(response.data.message)
                clear()
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

    return {
        setUsername,
        setUseremail,
        setUsercpf,
        username,
        useremail,
        usercpf,
        type,
        setType,
        handleCadastro,
        handleInputChange,
        loading,
        erro,
        setErro,
        sucess,
        setSucess,
    }
}

export default useCadastro;