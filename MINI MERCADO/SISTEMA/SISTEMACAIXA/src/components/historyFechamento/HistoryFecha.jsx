import { ArrowLeftShort, ArrowsExpand, ArrowsFullscreen, Calendar3, ChevronDown, HandIndexThumb, HandIndexThumbFill, LockFill, ViewList } from 'react-bootstrap-icons'

import './style.css'
import Fechamento from './fechamento'
const HistoryFechamento = () => {
    const {
        lista, formatarDataHours, containerDataOperador, selectOperador, dataOperador,
        formatarMoeda, select, loading, voltar, formatarCPF, clickProdutos, itemsTable,
        expandir, isExpandi, totalEntrada, totalTroco, totalProdutosLista, totalQuantidadeLista,
        containertext
    } = Fechamento()
    return (
        <div className={`container-fechamento ${isExpandi ? 'activeExpandi' : ''}`}>
            <div className='content-fechamento'>
                <div className='fechamento'>

                    <div className='list-users-fechamento'>
                        <div className='topo-list-users-fechamento'>
                            <span>Lista de usuarios</span>
                        </div>

                        <ol >
                            {lista && lista.map((operador, index) => (
                                <li key={index} onClick={() => selectOperador(operador, index)} className={`${select === index ? 'selectedUser' : ''}`}>
                                    <span></span>
                                    <p>{operador.operador.username}</p>
                                    <div className='div-ol'>
                                        <p style={{ fontSize: '10px' }}>Data da abertura</p>
                                        <button>
                                            <Calendar3 color='#202225' size={25} />
                                            {formatarDataHours(operador.dataAbertura)}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {containerDataOperador && (
                        <div className='container-table-fechamento'>
                            <div className='topo-table-fechamento'>
                                <span>
                                    <button onClick={voltar}>
                                        <ArrowLeftShort color='#F2F2F2' size={20} />
                                        <p>Voltar</p>
                                    </button>
                                    <button onClick={expandir}>
                                        {
                                            isExpandi ? <ArrowsExpand color='#F2F2F2' size={20} /> : <ArrowsFullscreen color='#F2F2F2' size={20} />
                                        }
                                        <p>{isExpandi ? "diminuir" : "expandi"}</p>
                                    </button>
                                    {/* Dados do fechamento */}
                                </span>
                                <p>User {dataOperador.operador.username}</p>
                                <div className='div-ol'>
                                    <p style={{ fontSize: '10px' }}>Data do fechamento</p>
                                    <button disabled>
                                        <Calendar3 color='#202225' size={25} />
                                        {formatarDataHours(dataOperador.dataFechamento)}
                                    </button>
                                </div>
                            </div>

                            <div className='table-fechamento'>
                                <div className='title-fechamento'>
                                    <span>caixa fechado  <LockFill size={25} color="#F2F2F2" /></span>
                                </div>

                                <table>
                                    <thead>
                                        <tr>
                                            <th>data abertura</th>
                                            <th>data fechamento</th>
                                            <th>role</th>
                                            <th>username</th>
                                            <th>usercpf</th>
                                            <th>userId</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{formatarDataHours(dataOperador.dataAbertura)}</td>
                                            <td>{formatarDataHours(dataOperador.dataFechamento)}</td>
                                            <td>{dataOperador.operador.role}</td>
                                            <td>{dataOperador.operador.username}</td>
                                            <td>{formatarCPF(dataOperador.operador.usercpf)}</td>
                                            <td>{dataOperador.operador.userId}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h4>Produtos</h4>

                                <div className='items-table'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>id document</th>
                                                <th>codigo de venda</th>
                                                <th>quantidade de produtos</th>
                                                <th>total dos produtos</th>
                                                <th>troco da venda</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemsTable && itemsTable.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.codigo_venda}</td>
                                                    <td>{totalQuantidadeLista}</td>
                                                    <td>{formatarMoeda(totalProdutosLista)}</td>
                                                    <td>{formatarMoeda(item.troco)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className='detalhes-table-fechamento'>
                                <div>
                                    <button>
                                        <p>Saldo inicial</p>
                                        <p>{formatarMoeda(dataOperador.saldoInicial)}</p>
                                    </button>
                                    <button>
                                        <p>Total de vendas </p>
                                        <p>{formatarMoeda(dataOperador.totalVendas)}</p>
                                    </button>
                                    <button>
                                        <p>Saldo final lancado</p>
                                        <p>{formatarMoeda(dataOperador.saldoFinal)}</p>
                                    </button>
                                    <button >
                                        <p>Entrada total</p>
                                        <p>{formatarMoeda(totalEntrada)}</p>
                                    </button>
                                    <button >
                                        <p>Total troco</p>
                                        <p>
                                            {formatarMoeda(totalTroco)}
                                        </p>
                                    </button>
                                    <button >
                                        <p>Resultado final</p>
                                        <p
                                            style={
                                                {
                                                    color: dataOperador.resultadoFinal < 0 ? 'red' : 'green'
                                                }}>
                                            {formatarMoeda(dataOperador.resultadoFinal)}
                                        </p>
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}

                    {loading && (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    )}

                    {containertext && (
                        <div className='container-text'>
                            <div className='content-text'>
                                <HandIndexThumbFill color='#D93636' style={
                                    {   
                                        borderRadius: '10px',
                                        width: '120px',
                                        height: '100px',
                                        padding: "1rem"
                                    }}
                                />
                                <p>Selecione um usuario para</p>
                                <p>ver detalhes do fechaamento</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default HistoryFechamento;