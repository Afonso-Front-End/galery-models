import { useState, useEffect } from "react";
import axios from "axios";
import useAcesso from "../../home/useAcesso";
export default function useScriptTabela() {
    const { userData } = useAcesso()

    const url_base = 'http://localhost:3001/';
    const [table, set_table] = useState([]);
    const [tableedite, set_tableedit] = useState(false);
    const [inicio, set_inicio] = useState(false)
    const [message, set_menssage] = useState("")
    const [loading, set_loading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [confirmproduct, set_confirmproduct] = useState(null)
    const [resultadosucess, set_resultado_sucess] = useState(null)
    const [resultadoerror, set_resultado_error] = useState(null)
    const [isDisabled, setIsDisabled] = useState(null)

    const [erro, setErro] = useState(null)
    const [sucess, setSucess] = useState(null)

    const cancelarEdite = () => {
        set_tableedit(false)
        setSucess(null)
        setErro(null)
        setIsDisabled(null)
    };

    const comfirmarEdite = async () => {
        try {
            setSucess(null);
            setErro(null);
            set_loading(true);

            const response = await axios.put(
                `${url_base}edit-product/${product_id}`,
                {
                    product_name,
                    product_code,
                    product_price,
                    product_unit,
                },
                {
                    headers: {
                        Authorization: `${userData.token}`,
                    },
                }
            );

            if (response.status === 200) {
                setSucess(response.data.message);
                fetchData();
                setTimeout(() => {
                    setSucess(null);
                }, 3000)
                setIsDisabled(null)
            } else {
                setErro(response.data.message);
                setTimeout(() => {
                    setSucess(null);
                }, 2000)
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setErro(`Erro de conexão "${error.code}"`);
            } else {
                setErro(error.response.data.message);
                setTimeout(() => {
                    setErro(null);
                }, 2000)
                setIsDisabled(null)
                fetchData()
            }
        } finally {
            set_loading(false);
        }
    };

    const [mensagem, set_mensagem] = useState("")
    const [value, set_value] = useState("")

    const formatarMoeda = (valor) => {
        return parseFloat(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    };

    const handlePesquisar = async (e) => {
        e.preventDefault()
        try {
            set_loading(true)
            const response = await axios.get(`${url_base}search-products?query=${value}`);
            if (response.status === 200) {
                set_table(response.data.products)
            } else {
                console.log(response.data.message)
                fetchData()
            }
        } catch (error) {
            set_mensagem(error.response.data.message)
            setTimeout(() => {
                set_mensagem(null)
            }, 2000)
            console.log(error)
        } finally {
            set_loading(false)
        }
    };

    const inputChange = (value) => {
        set_mensagem('');
        if (value.length <= 0) {
            fetchData()
        }
    };

    const fetchData = async () => {
        try {
            set_loading(true)
            set_inicio(false)
            const response = await axios.get(`${url_base}list-products`, {
                headers: {
                    'Authorization': `${userData.token}`
                }
            });

            if (response.status === 200) {
                const productList = Object.values(response.data);
                return set_table(productList[0]);
            } else {
                set_inicio(true)
                set_menssage(response.data.message)
                return
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                set_inicio(true)
                set_menssage(`${error.name} ${error.code}`)
            } else {
                set_inicio(true)
                set_menssage(error.response)
                // console.log(error)
            }
        } finally {
            set_loading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, [userData]);

    const [product_id, setProduct_id] = useState(null);
    const [product_name, setProduct_name] = useState(null);
    const [product_code, setProduct_code] = useState(null);
    const [product_price, setProduct_price] = useState(null);
    const [product_unit, setProduct_unit] = useState(null);
    const [clickedRowIndex, setClickedRowIndex] = useState(null)

    const handleProductNameChange = (index, value) => {
        const updatedProducts = [...table];
        updatedProducts[index] = { ...updatedProducts[index], product_name: value };
        set_table(updatedProducts)
        setProduct_name(updatedProducts[index].product_name)
    }

    const handleProductCodeChange = (index, value) => {
        const updatedProducts = [...table];
        updatedProducts[index] = { ...updatedProducts[index], product_code: value };
        set_table(updatedProducts);
        setProduct_code(updatedProducts[index].product_code)
    }

    const handleProductUnitChange = (index, value) => {
        const updatedProducts = [...table];
        updatedProducts[index] = { ...updatedProducts[index], product_unit: value };
        setProduct_unit(updatedProducts[index].product_unit)
        set_table(updatedProducts);
    }

    const handlePriceChange = (index, event) => {
        const inputValue = event.target.value.replace(/[^\d]/g, ''); // Remover caracteres não numéricos
        const numericValue = parseFloat(inputValue);
        const formattedValue = !isNaN(numericValue) ? (numericValue / 100).toFixed(2) : '';

        const updatedProducts = [...table];
        updatedProducts[index] = { ...updatedProducts[index], product_price: { "$numberDecimal": formattedValue } };
        set_table(updatedProducts);
        setProduct_price(formattedValue)
    };

    const clickEditProduto = (index, product) => {
        setIsDisabled(index)
        setProduct_name(product.product_name)
        setProduct_code(product.product_code)
        setProduct_price(product.product_price)
        setProduct_unit(product.product_unit)
        setProduct_id(product._id)

    }

    const excluir = (product, index) => {
        set_confirmproduct(product)
        setClickedRowIndex(index);
    };

    const cancelar = (index) => {
        console.log('Cancelado:', index);
        set_confirmproduct(false)
        set_resultado_sucess(null)
        set_resultado_error(null)
        setClickedRowIndex(null)
    };

    const excluirConfirm = async (product_id) => {
        try {
            set_loading(true)
            const response = await axios.delete(`${url_base}delete-product/${product_id}`, {
                headers: {
                    'Authorization': `${userData.token}`
                }
            });

            if (response.status === 201) {
                set_resultado_sucess(response.data.message)
                fetchData()
            } else {
                set_resultado_error(response.data.message)
            }
        } catch (error) {
            set_confirmproduct(null)
            if (error.code === "ERR_NETWORK") {
                set_resultado_error(error.message)
                setClickedRowIndex(null)
            } else {
                set_resultado_error(error.response.data.message)
                setClickedRowIndex(null)
            }
        } finally {
            set_loading(false)
        }
    }

    const copyText = (text) => {
        const tempElem = document.createElement('textarea');
        tempElem.value = text;
        document.body.appendChild(tempElem);
        tempElem.select();
        document.execCommand('copy');
        document.body.removeChild(tempElem);
        console.log(text);
    }


    return {
        table, tableedite, clickEditProduto, formatarMoeda,
        selectedProduct, set_tableedit, excluir, message,
        inicio, loading, cancelar, confirmproduct,
        excluirConfirm, fetchData, set_table, handlePesquisar,
        value, set_value, inputChange, mensagem, erro, sucess,
        cancelarEdite, comfirmarEdite, handlePriceChange, tableedite,
        setProduct_name, setProduct_code, setProduct_price, setProduct_unit,
        product_name, product_code, product_price, product_unit, product_id,
        resultadosucess, resultadoerror, isDisabled, handleProductNameChange,
        handleProductCodeChange, handleProductUnitChange, clickedRowIndex, copyText
    }
}