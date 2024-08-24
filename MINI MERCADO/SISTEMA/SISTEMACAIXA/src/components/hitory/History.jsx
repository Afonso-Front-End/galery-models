import { ArrowLeftShort, Calendar2DateFill, Exclamation, ExclamationDiamond, ExclamationTriangleFill, XLg } from "react-bootstrap-icons";
import useHistory from "./js/useHistory";
import "./style/history.css"
import imgAviso from "./img/alert.png"

const History = () => {
    const {
        active, oppenListHistory, history, formatarMoeda,
        formatarDataHours, selectData, dataSelecionada,
        viweNota, nota, detalheNota, exiteNota, exiteSelectData,
        inicio, menssage, loading

    } = useHistory()

    const dataHours = new Date()


    return (
        <div className="container-table">
            <div className="content-table">

                <div className="table-title">
                    <h1>HISTORICO DE VENDAS</h1>
                    <div className={`list-order ${active ? 'list-order-active' : ''}`}>
                        <ol>
                            <li onClick={oppenListHistory}>ordenar</li>
                            <li >Crédito</li>
                            <li >Débito</li>
                            <li >Dinheiro</li>
                            <li >Pix</li>
                        </ol>
                    </div>
                </div>

                {history && (
                    <div className="container-table-venda">
                        <table className="table-venda">
                            <thead >
                                <tr>
                                    <th>data</th>
                                    <th>operador</th>
                                    <th>valor venda</th>
                                    <th>vendas</th>
                                    <th>vizualizar</th>
                                </tr>
                            </thead>

                            <tbody >
                                {Object.keys(history).map((data) => (
                                    <tr key={data}>
                                        <td>{data}</td>
                                        <td>{history[data][0].username}</td>
                                        <td>
                                            {formatarMoeda(history[data].reduce((acc, venda) => acc + venda.subtotalvenda, 0))}
                                        </td>
                                        <td>{history[data].length}</td>
                                        <td>
                                            <button id='expandir' onClick={() => selectData(data)}>
                                                <Calendar2DateFill size={25} color="#253C59" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}

                {dataSelecionada && (
                    <div className="container-data-selecionada">
                        <div className="content-data-selecionada">

                            <div className="topo-data-selecionada">
                                <div className="topo-data">
                                    <p>Vendas de <span>{dataSelecionada}</span></p>
                                    <button id='next-to' onClick={exiteSelectData}>
                                        <ArrowLeftShort color="black" size={25} />
                                    </button>
                                </div>
                            </div>

                            <div className="table-data">
                                <table className="table">
                                    <thead >
                                        <tr>
                                            <th>Codigo de Venda</th>
                                            <th>items</th>
                                            <th>total</th>
                                            <th>unidade</th>
                                            <th>operador</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history[dataSelecionada].map((venda, index) => (
                                            <tr key={venda._id} onClick={() => viweNota(index)}>
                                                <td>{venda.codigo_venda}</td>
                                                <td>{venda.items.length}</td>
                                                <td>{formatarMoeda(venda.subtotalvenda)}</td>
                                                <td>
                                                    {venda.items.reduce((total, item) => total + item.quantidade, 0)}
                                                </td>
                                                <td>{venda.username}</td>
                                            </tr>
                                            // console.log(venda)
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="footer-data-selecionada">
                                <div className="div-footer">
                                    <p>Subtotal da venda</p>
                                    <p>
                                        {formatarMoeda(history[dataSelecionada].reduce((acc, venda) => acc + venda.subtotalvenda, 0))}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {nota && (
                    <div className="container-nota-fiscal">
                        <div className="content-nota-fiscal">

                            <div className="exite-nota-fiscal">
                                {/* <h1>comprovante de venda</h1> */}
                                <button id='exite' onClick={exiteNota}><XLg color="black" size={25} /></button>
                            </div>

                            <div className="nota-fiscal">
                                <div className="data-mercado-logo">
                                    <div className="content-logo">
                                        <div className="logo">
                                            <h1>MINI MERCADO FARIAS</h1>
                                            <p>Emitido: {formatarDataHours(dataHours)}</p>
                                        </div>
                                        <div className="data-mercado">
                                            <p>Comprovante</p>
                                            <p>Não vale como nota fiscal</p>
                                            <p>Mini mercado Farias</p>
                                            <p>Erich Meyer Nº3701</p>
                                            <p>CPF/CNPJ 00000000000</p>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="container-nota">
                                    <table className="table-nota-fiscal">
                                        <thead >
                                            <tr>
                                                {/* <th>ID</th> */}
                                                <th>produto</th>
                                                <th>valor</th>
                                                <th>Unidades</th>
                                                <th>total</th>
                                                <th>operador</th>
                                                <th>data</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {detalheNota.items.map((item, index) => (
                                                <tr key={index}>
                                                    {/* <td id="id">#{index}</td> */}
                                                    <td>{item.product_name}</td>
                                                    <td>{formatarMoeda(item.product_price)}</td>
                                                    <td>{item.quantidade}U</td>
                                                    <td>{formatarMoeda(item.valor_total)}</td>
                                                    <td>{detalheNota.username}</td>
                                                    <td>{formatarDataHours(detalheNota.data_venda)}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                    <div className="subtotal-nota">
                                        <strong>Subtotal <p>{formatarMoeda(detalheNota.subtotalvenda)}</p></strong>
                                    </div>
                                </div>
                                <div>
                                    {detalheNota.pagamentos.map((item, index) => (
                                        <div key={index} className="pagamento">
                                            <p>Pagamento</p>
                                            <p>{formatarMoeda(item.valorPago)} {item.tipoPagamento}</p>
                                        </div>
                                    ))}
                                    <div className="pagamento-troco">
                                        <p>Troco {formatarMoeda(detalheNota.troco)}</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                )}

                {inicio && (
                    <div className="inicio">
                        <div className="inicio-message">
                            <ExclamationTriangleFill color="#D93636" size={150} />
                            <p>{menssage}</p>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default History;
