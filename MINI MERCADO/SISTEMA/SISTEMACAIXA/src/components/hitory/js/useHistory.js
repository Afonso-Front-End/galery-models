import axios from 'axios'
import React, { useEffect, useState } from 'react';

const useHistory = () => {
    const [active, setactive] = useState(false)
    const [history, sethistory] = useState([])
    const [dataSelecionada, setDataSelecionada] = useState(null);
    const [nota, setnota] = useState(false)
    const [detalheNota, setDetalheNota] = useState([])
    const [inicio, setInicio] = useState(false)
    const [menssage, setMessage] = useState("")
    const [loading, setloading] = useState(false)

    React.useEffect(() => {
        const urlbase = "http://localhost:3001/list-history"
        setloading(true)
        const GetListHistory = async () => {
            try {
                const response = await axios.get(urlbase)
                if (response.status === 200) {
                    organizarVendasPorData(response.data.historico)
                    setInicio(false)
                } else {
                    setInicio(true)
                    setMessage(response.data.message)
                    console.log(response.data)  
                }
            } catch (error) {
                if (error.code === "ERR_NETWORK") {
                    setInicio(true)
                    setMessage(`${error.name} ${error.code}`)
                }else{
                    setInicio(true)
                    setMessage(error)
                }
            }finally{
                setloading(false)
            }
        }

        GetListHistory()
    }, [])

    const oppenListHistory = () => {
        if (!active) {
            setactive(true)
        } else {
            setactive(false)
        }
    }

    const organizarVendasPorData = (vendas) => {
        const vendasOrganizadas = {};
        vendas.forEach((venda) => {
            const dataVenda = new Date(venda.data_venda).toLocaleDateString('pt-BR');
            if (!vendasOrganizadas[dataVenda]) {
                vendasOrganizadas[dataVenda] = [];
            }
            vendasOrganizadas[dataVenda].push(venda);
        });
        sethistory(vendasOrganizadas);
    };

    const selectData = (data) => {
        setDataSelecionada(data);
    };

    const exiteSelectData = () => {
        setDataSelecionada(null);
    }

    const viweNota = (index) => {
        setnota(true)
        setDetalheNota(history[dataSelecionada][index])
    }

    const exiteNota = () => {
        setnota(false)
        setDetalheNota([])
    }

    const formatarDataHours = (data) => {
        const dataObj = new Date(data);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return dataObj.toLocaleString('pt-BR', options);
    }

    const formatarMoeda = (valor) => {
        return parseFloat(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    };

    return {
        active, oppenListHistory, history,
        formatarMoeda, formatarDataHours,
        selectData, dataSelecionada,
        viweNota, nota, detalheNota,exiteNota,
        exiteSelectData,inicio, menssage, loading,
    }

}

export default useHistory;

