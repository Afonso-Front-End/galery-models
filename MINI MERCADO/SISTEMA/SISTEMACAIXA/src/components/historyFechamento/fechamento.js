import axios from "axios";
import React, { useState } from "react";

export default function Fechamento() {
    const [lista, setLista] = useState([])
    const [loading, set_loading] = useState(false)

    const [containerDataOperador, setContainerDataOperador] = useState(false)
    const [dataOperador, setDataOperador] = useState([])

    const [select, setSelect] = useState(null)

    const [itemsTable, setItemsTable] = useState([])

    const [isExpandi, setIsExpandi] = useState(false)


    const fetchDataFechamento = async () => {
        const urlbase = 'http://localhost:3001/history-fechamento'
        try {
            const response = await axios.get(urlbase)
            if (response.status === 200) {
                setLista(response.data.message)
            } else {
                console.log(response.data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const formatarDataHours = (data) => {
        const dataObj = new Date(data);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', };
        return dataObj.toLocaleString('pt-BR', options);
    }

    const formatarMoeda = (valor) => {
        return parseFloat(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    };

    const formatarCPF = (cpf) => {
        // Remove qualquer caractere não numérico
        cpf = String(cpf).replace(/\D/g, '');

        // Verifica se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
            throw new Error("CPF deve conter 11 dígitos.");
        }
        // Formata o CPF    
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    React.useEffect(() => {
        fetchDataFechamento()
    }, [])

    const [containertext, setContainerText] = useState(true)
    const selectOperador = (data, index) => {
        set_loading(true)
        setTimeout(() => {
            setItemsTable(data.items)
            setContainerDataOperador(true)
            setDataOperador(data)
            setSelect(index)
            set_loading(false)
            calcularTotais(data.items)
            totalProdutos(data.items)
            quantidadeProduto(data.items)
            setContainerText(false)
        }, 1000)
    }

    const [totalEntrada, setTotalEntrada] = useState(null)
    const [totalTroco, setTotalTroco] = useState(null)

    const calcularTotais = (items) => {
        let totalEntrada = 0;
        let totalTroco = 0;

        items.forEach(item => {
            item.pagamentos.forEach(pagamento => {
                totalEntrada += pagamento.valorPago;
            });
            totalTroco += item.troco;
        });

        setTotalEntrada(totalEntrada)
        setTotalTroco(totalTroco)
        return { totalEntrada, totalTroco };
    };

    const [totalProdutosLista, setTotalProdutosLista] = useState("")

    const totalProdutos = (items) => {
        var totalproduto = 0;

        items.forEach(item => {
            item.items.forEach(index => {
                totalproduto += index.valor_total;
            });
        });
        setTotalProdutosLista(totalproduto)
        return { totalproduto };
    };

    const [totalQuantidadeLista, setTotalQuantidadeLista] = useState("")
    const quantidadeProduto = (items) => {
        var quantidade = 0

        items.forEach(item => {
            item.items.forEach(index => {
                quantidade += index.quantidade
            })
        })
        setTotalQuantidadeLista(quantidade)
        return { quantidade }
    }

    const voltar = () => {
        setDataOperador([])
        setContainerDataOperador(false)
        setSelect(null)
        setContainerText(true)
        if (isExpandi) {
            setIsExpandi(false)
        }
    }

    const clickProdutos = (data) => {}

    const expandir = () => {
        if (!isExpandi) {
            setIsExpandi(true)
        } else {
            setIsExpandi(false)
        }
    }


    return {
        lista, formatarDataHours, selectOperador, containerDataOperador,
        dataOperador, formatarMoeda, select, loading, voltar, formatarCPF,
        clickProdutos, itemsTable, expandir, isExpandi, totalEntrada, totalTroco,

        totalProdutosLista,totalQuantidadeLista,containertext,
    }
}
