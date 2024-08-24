import { useState } from "react";
import axios from 'axios';
import useAcesso from "../home/useAcesso";
const useCadastro = () => {
    const { userData } = useAcesso()
    const [product_name, setProduct_name] = useState("")
    const [product_code, setProduct_code] = useState("")
    const [product_price, setProduct_price] = useState(Number)
    const [product_unit, setProduct_unit] = useState("")

    const [messageerror, setMessageError] = useState("")
    const [messagesucess, setMessageSucess] = useState("")

    const [loading, setloading] = useState(false)

    const [inicio, setInicio] = useState(false)
    const [message, setMessage] = useState("")

    const formatarMoeda = (valor) => {
        return parseFloat(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    };

    const handlePriceChange = (event) => {
        const inputValue = event.target.value.replace(/[^\d]/g, '');

        const numericValue = parseFloat(inputValue);

        const formattedValue = !isNaN(numericValue) ? (numericValue / 100).toFixed(2) : '';

        setProduct_price(formattedValue);
    };

    const clear = () => {
        setProduct_code("")
        setProduct_name("")
        setProduct_price(null)
        setProduct_unit("")
    }

    const handleCadastro = async (event) => {
        event.preventDefault()
        setloading(true)
        const url_base = 'http://localhost:3001/';
        try {
            const response = await axios.post(`${url_base}register-product`,
                {
                    product_code,
                    product_name,
                    product_price,
                    product_unit,
                },
                {
                    headers: {
                        'Authorization': `${userData.token}`
                    }
                })

            if (response.status === 200) {
                setMessageSucess(response.data.message)
                clear()
                setTimeout(() => {
                    setMessageSucess(null)
                }, 4000)
                console.log(response)

            } else {
                setMessageError(response.data.message)
                setTimeout(() => {
                    setMessageError(null)
                }, 4000)
                console.log(response)
            }

        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setInicio(true)
                setMessage(`${error.name} ${error.code}`)
            } else {
                setInicio(true)
                setMessage(error)
                console.log(error)
            }
        } finally {
            setloading(false)
        }
    }

    const exite = () => {
        setInicio(false)
        setMessage(null)
    }

    return {
        product_code,
        product_name,
        product_price,
        product_unit,
        setProduct_code,
        setProduct_name,
        setProduct_price,
        setProduct_unit,
        handleCadastro,
        handlePriceChange,
        messageerror,
        messagesucess,
        formatarMoeda,
        clear,
        loading,
        inicio, message, exite
    }
}

export default useCadastro;