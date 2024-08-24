import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { format } from 'date-fns';
import useAcesso from "../home/useAcesso";

const usePadv = () => {
    const { userData } = useAcesso()
    const Refcode = useRef()
    const [subtotal, setsubtotal] = useState(null)

    const [carrinho, setcarrinho] = useState(null)
    const [BTcredito, setBTcredito] = useState(true)
    const [BTdebito, setBTdebito] = useState(true)
    const [BTdinheiro, setBTdinheiro] = useState(true)
    const [BTpix, setBTpix] = useState(true)
    const [BTcancelar, setBTcancelar] = useState(true)
    const [BTfinalizar, setBTfinalizar] = useState(true)
    const [BTvalor, setBTvalor] = useState(true)
    const [INPUTvalor, setINPUTvalor] = useState(null)
    const [typepagamento, settypepagamento] = useState(null);
    const [IPcode, setIPcode] = useState("")
    const [IPunidade, setIPunidade] = useState("")
    const [DSIPunidade, setDSIPunidade] = useState(true)
    const [BTadicionar, setBTadicionar] = useState(true)
    const [Abacancelar, setAbacancelar] = useState(false)
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState(null)
    const [sucess, setsucess] = useState(null)
    const [error, seterror] = useState(null)

    const [troco, settroco] = useState(null)

    const [isDisableCaixa, setIsDisableCaixa] = useState(false)
    const [containerAbrirCaixa, setContainerAbrirCaixa] = useState(null)
    const [initMenssage, setInitMenssage] = useState(null)
    const [loginCaixa, setLoginCaixa] = useState(false)

    const [containerFecharCaixa, setContainerFecharCaixa] = useState(false)


    // formatar valor para moeda
    const formatarMoeda = (valor) => {
        return parseFloat(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    };

    // formatar data
    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return format(data, 'dd/MM/yyyy HH:mm:ss');
    };

    // habilitar BT
    const habilitarBT = () => {
        setBTcredito(true)
        setBTdebito(true)
        setBTdinheiro(true)
        setBTpix(true)
        setBTcancelar(true)
        setBTfinalizar(true)
    }

    // desabilitar BT
    const desabilitarBT = () => {
        setBTcredito(false)
        setBTdebito(false)
        setBTdinheiro(false)
        setBTpix(false)
        setBTcancelar(false)
        setBTfinalizar(false)
    }

    // items do carrinho
    const fetchData = async () => {
        const urlbase = "http://localhost:3001/carrinho"
        setloading(true)
        try {
            const response = await axios.get(urlbase);
            if (response.status === 200) {
                setcarrinho(response.data)
                setsubtotal(response.data.carrinho.subtotal.$numberDecimal)
                desabilitarBT()
            } else {
                setcarrinho(null)
                habilitarBT()
            }
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false)
        }
    };

    React.useEffect(() => {
        fetchData();
    }, [])

    // selecionar pagamento
    const options = [
        { value: 1, label: 'credito' },
        { value: 2, label: 'debito' },
        { value: 3, label: 'dinheiro' },
        { value: 4, label: 'pix' },
    ];

    const selectpagamento = (value) => {
        const selectedOption = options.find(option => option.value === value)
        settypepagamento(selectedOption.label);
        setBTcredito(selectedOption.value === 1);
        setBTdebito(selectedOption.value === 2);
        setBTdinheiro(selectedOption.value === 3);
        setBTpix(selectedOption.value === 4);
        setBTvalor(false)
    };

    // onchange
    const onchangeIPcode = (value) => {
        const valueTrim = value.trim();
        setIPcode(valueTrim);
        if (valueTrim.length > 0) {
            setDSIPunidade(false)
        } else {
            setDSIPunidade(true)
            setBTadicionar(true)
            setIPunidade("")
        }
    };

    const onchangeIPunidade = (value) => {
        const valueTrim = value.trim()
        setIPunidade(value)
        if (valueTrim.length > 0) {
            setBTadicionar(false)
        } else {
            setBTadicionar(true)
        }
    }

    // function adicionar
    const limpar = () => {
        setIPcode("")
        setIPunidade("")
        setBTadicionar(true)
        setDSIPunidade(true)
    }

    const adicionar = async (event) => {
        event.preventDefault();
        const urlbase = "http://localhost:3001/to-ad-cart";

        try {
            const response = await axios.post(urlbase, {
                username: userData.decodedToken.payload.username,
                usercpf: userData.decodedToken.payload.usercpf,
                product_code: IPcode,
                quantidade: IPunidade,
                operadorId: userData.decodedToken.payload.userId,
            });
            if (response.status === 200) {
                fetchData()
                limpar()
                Refcode.current.focus()

            } else {
                setmessage(`${response.data.message} ${response.data.codigo}`)
            }
        } catch (error) {
            setmessage(`${error.response.data.message}`)
            console.error('Erro ao enviar solicitação:', error);

        }
    };

    // cancelar
    const cancelar = async (event) => {
        event.preventDefault()
        setAbacancelar(false)
        setloading(true)
        const urlbase = "http://localhost:3001/cancelar-compra"
        try {
            const response = await axios.delete(urlbase)
            if (response.status === 200) {
                fetchData()
                habilitarBT()
                setsubtotal(null)
                console.log(console.log(response.data))
            } else {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    // scanner
    const scanner = async (code) => {
        const urlbase = "http://localhost:3001/to-ad-cart-scaner";
        try {
            const response = await axios.post(urlbase, {
                username: userData.decodedToken.payload.username,
                usercpf: userData.decodedToken.payload.usercpf,
                barcode: code
            });

            if (response.status === 200) {
                fetchData();
                limpar()
                console.log(response.data)
            } else {
                limpar()
                console.log(response.data)
            }
        } catch (error) {
            setmessage(`${error.response.data.message}`)
            console.log(error)
        }
    }

    // exite "fechar abas"
    const exitecancelar = () => {
        if (!Abacancelar) {
            setAbacancelar(true)
        } else {
            setAbacancelar(false)
        }
    }

    const oppencancelar = (event) => {
        event.preventDefault()
        if (!Abacancelar) {
            setAbacancelar(true)
        } else {
            setAbacancelar(false)
        }
    }

    const exite = () => {
        setmessage(null)
    }

    // input valor
    const handleValorChange = (event) => {
        const inputValue = event.target.value.replace(/[^\d]/g, '');

        const numericValue = parseFloat(inputValue);

        const formattedValue = !isNaN(numericValue) ? (numericValue / 100).toFixed(2) : '';

        setINPUTvalor(formattedValue);
        setSaldoInicial(formattedValue)
    };
    const handleValorInicial = (event) => {
        const inputValue = event.target.value.replace(/[^\d]/g, '');

        const numericValue = parseFloat(inputValue);

        const formattedValue = !isNaN(numericValue) ? (numericValue / 100).toFixed(2) : '';

        setSaldoInicial(formattedValue)
    };
    const handleValorFinal = (event) => {
        const inputValue = event.target.value.replace(/[^\d]/g, '');

        const numericValue = parseFloat(inputValue);

        const formattedValue = !isNaN(numericValue) ? (numericValue / 100).toFixed(2) : '';


        setSaldoFinal(formattedValue)
    };

    // finalizar 
    const finalizarCompra = async (event) => {
        event.preventDefault()
        try {
            const urlbase = "http://localhost:3001/finalizar-compra"
            const response = await axios.post(`${urlbase}`, {
                tipoPagamento: typepagamento,
                valorPago: INPUTvalor,
                operadorId: userData.decodedToken.payload.userId
            })
            if (response.status === 200) {
                fetchData()
                settypepagamento(null)
                setsucess(response.data.message)
                settroco(response.data.troco)
                console.log(response.data)
            } else {
                fetchData()
                settypepagamento(null)
            }
        } catch (error) {
            console.log(error)
            seterror(error.response.data.message)

        }
    }

    // limpar a tela ao finalizar OK
    const oksuces = () => {
        setsucess(null)
        fetchData()
        setsubtotal(null)
        setINPUTvalor(null)
        setBTvalor(true)
        settroco(null)
    }

    const okerror = () => {
        seterror(null)
    }

    // verificar caixa
    const verificarCaixaAberto = async () => {
        try {
            const response = await axios.post('http://localhost:3001/verificar-caixa-aberto', {
                operadorId: userData.decodedToken.payload.userId,
            });
            if (response.status === 200) {
                setIsDisableCaixa(true)
            }
            console.log(response.data);
        } catch (error) {
            setContainerAbrirCaixa(true)
            setInitMenssage(error.response.data.message)
        }
    };

    useEffect(() => {

        if (userData) {
            verificarCaixaAberto();
        }
    }, [userData]);

    const oppenCaixaModal = () => {
        setLoginCaixa(true)
    }

    const exiteCaixaLogin = () => {
        setLoginCaixa(false)
        setErroCaixa(false)
    }

    const [username, setUserName] = useState("")
    const [usercpf, setUserCpf] = useState("")
    const [saldoInicial, setSaldoInicial] = useState("")
    const [saldoFinal, setSaldoFinal] = useState("")
    const [erroCaixa, setErroCaixa] = useState(false)
    const [sucessCaixa, setSucessCaixa] = useState("")

    const clearInputs = () => {
        setUserName("")
        setUserCpf("")
        setSaldoInicial("")
        setSaldoFinal("")
    }

    const entrar = async (event) => {
        event.preventDefault();
        setloading(true)
        try {
            const urlbase = "http://localhost:3001/abrir-caixa";
            const response = await axios.post(urlbase, {
                operador: {
                    userId: userData.decodedToken.payload.userId,
                    username: username,
                    usercpf: usercpf,
                    role: userData.decodedToken.payload.role
                },
                saldoInicial: saldoInicial
            });

            if (response.status === 200) {
                setIsDisableCaixa(true)
                setLoginCaixa(false);
                setInitMenssage(null)
                setContainerAbrirCaixa(false)
                clearInputs()
                
            } else {
                console.log(response.data)
            }
        } catch (error) {
            setErroCaixa(error.response.data.error)
            setTimeout(() => {
                setErroCaixa(false)
            }, 4000)
            console.log(error);
        } finally {
            setloading(false)
        }
    };

    const fechar = async (event) => {
        event.preventDefault();
        setloading(true)
        try {
            const urlbase = "http://localhost:3001/fechar-caixa";
            const response = await axios.post(urlbase, {
                operador: {
                    userId: userData.decodedToken.payload.userId,
                    username: username,
                    usercpf: usercpf,
                    role: userData.decodedToken.payload.role
                },
                saldoFinal: saldoFinal
            });

            if (response.status === 200) {
                setSucessCaixa(response.data.message)
                clearInputs()
                setTimeout(() => {
                    setIsDisableCaixa(false)
                    setContainerAbrirCaixa(true)
                    setContainerFecharCaixa(false)
                    verificarCaixaAberto()
                }, 4000)

            } else {
                setErroCaixa(error.response.data.error)
                setTimeout(() => {
                    setErroCaixa(false)
                }, 4000)
            }
        } catch (error) {
            setErroCaixa(error.response.data.error)
            setTimeout(() => {
                setErroCaixa(false)
            }, 4000)
        } finally {
            setloading(false)
        }
    }

    const abrirContainerCaixa = () => {
        setContainerFecharCaixa(true)
    }

    const fecharContainerCaixa = () => {
        setContainerFecharCaixa(false)
    }

    return {
        formatarMoeda, carrinho, formatarData,
        BTcredito, BTdebito, BTdinheiro, BTpix,
        BTcancelar, BTfinalizar, BTvalor,
        selectpagamento, onchangeIPcode, onchangeIPunidade,
        DSIPunidade, BTadicionar, IPcode, IPunidade, adicionar,
        Refcode, subtotal, cancelar, scanner, exitecancelar, Abacancelar,
        oppencancelar, loading, message, exite, handleValorChange, INPUTvalor,
        finalizarCompra, sucess, oksuces, okerror, error, troco, isDisableCaixa,
        containerAbrirCaixa, initMenssage, loginCaixa, oppenCaixaModal, exiteCaixaLogin,
        username, usercpf, setUserCpf, setUserName, saldoInicial, setSaldoInicial, entrar,
        containerFecharCaixa, erroCaixa, abrirContainerCaixa, fecharContainerCaixa, fechar,
        saldoFinal, handleValorInicial, handleValorFinal, sucessCaixa,
    }
}
export default usePadv;