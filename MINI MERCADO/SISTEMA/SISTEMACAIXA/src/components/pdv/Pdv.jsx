import { FaCcMastercard, FaCreditCard, FaMoneyCheckAlt } from "react-icons/fa";
import "./pdv.css"
import { FaPix, FaRectangleList } from "react-icons/fa6";
import usePadv from "./usepdv";
import BarcodeScanner from "../../barcodescannerpdv/BarcodeScannerPdv";
import { Check, LockFill, XLg } from "react-bootstrap-icons";

const Pdv = () => {
    const {
        formatarMoeda, carrinho, formatarData,
        BTcredito, BTdebito, BTdinheiro, BTpix,
        BTcancelar, BTfinalizar, BTvalor, selectpagamento,
        onchangeIPcode, onchangeIPunidade, DSIPunidade,
        BTadicionar, IPcode, IPunidade, adicionar, Refcode,
        subtotal, cancelar, scanner, exitecancelar, Abacancelar,
        oppencancelar, loading, message, exite, handleValorChange,
        INPUTvalor, finalizarCompra, sucess, oksuces, okerror, error,
        troco, isDisableCaixa, containerAbrirCaixa, initMenssage, loginCaixa,
        oppenCaixaModal, exiteCaixaLogin, setUserCpf, setUserName, usercpf, username,
        entrar, saldoInicial, setSaldoInicial, containerFecharCaixa, erroCaixa, abrirContainerCaixa,
        fecharContainerCaixa, fechar, handleValorFinal, handleValorInicial, saldoFinal,sucessCaixa
    } = usePadv()

    const handleDetected = (code) => {
        onchangeIPcode(code)
        scanner(code)
        console.log("Código detectado:", code);
    };

    return (
        <div className="container-pdv">
            <div className="content-pdv">

                {isDisableCaixa && (
                    <div className="container-caixa">

                        <div className='content-caixa'>
                            <table className="table-caixa">
                                <thead >
                                    <tr>
                                        <th>nome produto</th>
                                        <th>codigo</th>
                                        <th>quantidade</th>
                                        <th>valor unitario</th>
                                        <th>total</th>
                                        <th>data</th>

                                    </tr>
                                </thead>
                                <tbody >
                                    {carrinho && carrinho.carrinho && carrinho.carrinho.items && carrinho.carrinho.items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.product_name}</td>
                                            <td>{item.product_code}</td>
                                            <td>{item.quantidade}</td>
                                            <td>{formatarMoeda(item.product_price.$numberDecimal)}</td>
                                            <td>{formatarMoeda(item.total.$numberDecimal)}</td>
                                            {/* <td>{item.product_unit}</td> */}
                                            <td>{formatarData(item.data_venda)}</td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>
                        </div>

                        <div className="content-operacao">

                            <div className='inputs' >

                                <input
                                    type="number"
                                    placeholder='0000000000'
                                    id='codigo'
                                    autoComplete='off'
                                    value={IPcode}
                                    onChange={(event) => onchangeIPcode(event.target.value)}
                                    ref={Refcode}
                                />

                                <input type="number"
                                    placeholder='unidade'
                                    id='unidade'
                                    autoComplete='off'
                                    disabled={DSIPunidade}
                                    value={IPunidade}
                                    onChange={(event) => onchangeIPunidade(event.target.value)}

                                />

                                <input type="button"
                                    id='adicionar'
                                    value="Adicionar"
                                    disabled={BTadicionar}
                                    onClick={adicionar}
                                />

                                <BarcodeScanner onDetected={handleDetected} />

                            </div>

                            <div className='type-pagamento'>

                                <div className="collun">
                                    <div id='credito'>
                                        <button disabled={BTcredito} onClick={() => selectpagamento(1)}>
                                            <FaCcMastercard size={30} className='icon' />
                                        </button>
                                        <p>credito</p>
                                    </div>
                                    <div id='debito'>
                                        <button disabled={BTdebito} onClick={() => selectpagamento(2)}>
                                            <FaCreditCard size={30} className='icon' />
                                        </button>
                                        <p>debito</p>
                                    </div>
                                </div>

                                <div className="collun">
                                    <div id='dinheiro'>
                                        <button disabled={BTdinheiro} onClick={() => selectpagamento(3)}>
                                            <FaMoneyCheckAlt size={30} className='icon' />
                                        </button>
                                        <p>dinheiro</p>
                                    </div>
                                    <div id='pix'>
                                        <button disabled={BTpix} onClick={() => selectpagamento(4)}>
                                            <FaPix size={30} className='icon' />
                                        </button>
                                        <p>pix</p>
                                    </div>
                                </div>

                            </div>

                            <div className='valores'>

                                <div className='entrada-saida'>

                                    <div id='entrada-total'>
                                        <p>recebido</p>
                                        <div className='valor-recebido'>
                                            <input type="text"
                                                value={INPUTvalor ? formatarMoeda(INPUTvalor) : formatarMoeda(0)}
                                                autoComplete='off'
                                                disabled={BTvalor}
                                                onChange={handleValorChange}
                                            />
                                        </div>
                                    </div>

                                    <div id='saida-troco'>
                                        <p>troco</p>
                                        <input
                                            type="text"
                                            value={troco ? formatarMoeda(troco) : formatarMoeda(0)}
                                            disabled
                                        />
                                    </div>

                                </div>

                                <form className='finalizar-pagamento'>

                                    <div className='finalizar'>
                                        <div id='cancelar-compra'>
                                            <button disabled={BTcancelar} onClick={oppencancelar}>
                                                cancelar
                                            </button>
                                        </div>
                                        <div id='finalizar-compra'>
                                            <button disabled={BTfinalizar} onClick={finalizarCompra}>
                                                finalizar
                                            </button>
                                        </div>
                                    </div>


                                </form>

                                <div className="subtotal">
                                    <div className="subtotal-value">
                                        <p>Subtotal</p>
                                        <h1>{subtotal === null ? formatarMoeda(0) : formatarMoeda(subtotal)}</h1>
                                    </div>
                                    <button id="fechar-caixa" onClick={abrirContainerCaixa}>fechar caixa</button>
                                </div>

                            </div>

                        </div>

                        {Abacancelar && (
                            <div className='cancelar-exclusao'>
                                <div className="topo-exite" >
                                    <h1></h1>
                                    <button id='exite' onClick={exitecancelar}><XLg color="#FFFFFF" size={25} /></button>
                                </div>
                                <div >
                                    <h1>Cancelar esta venda?</h1>
                                    <div className="buttons-confirm">
                                        <button className="" onClick={exitecancelar}>nao</button>
                                        <button className="" onClick={cancelar}>sim</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="message">
                                <div className="topo-exite" >
                                    <h1></h1>
                                    <button id='exite' onClick={exite}><XLg color="#FFFFFF" size={25} /></button>
                                </div>
                                <div className="message-res">
                                    <h3>{message}</h3>
                                </div>
                            </div>
                        )}

                        {sucess && (
                            <div className="sucess-finali">
                                <div className="finali">
                                    <h4>{sucess}</h4>
                                    <button onClick={oksuces}>ok</button>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="error-finali">
                                <div className="finali-error">
                                    <div>
                                        <h4>{error}</h4>
                                    </div>
                                    <button onClick={okerror}>ok</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {containerAbrirCaixa && (
                    <div className="abrir-caixa">
                        <div className="menssage-aviso-caixa">
                            <LockFill size={100} color="#D93636" />
                            <h1>{initMenssage}</h1>
                            <button onClick={oppenCaixaModal}>Abrir caixa</button>
                        </div>

                        {loginCaixa && (
                            <div className="form-caixa">
                                <div className="topo-form-caixa">
                                    <button onClick={exiteCaixaLogin}><XLg color="#f2f2f2" /></button>
                                </div>
                                <form onSubmit={entrar}>
                                    <h4>abrir caixa</h4>
                                    <label htmlFor="">Nome</label>
                                    <input type="text" placeholder="Nome do usuario" value={username} onChange={(e) => setUserName(e.target.value)} />
                                    <label htmlFor="">CPF</label>
                                    <input type="number" placeholder="cpf do usuario" value={usercpf} onChange={(e) => setUserCpf(e.target.value)} />
                                    <label htmlFor="">Saldo inicial</label>
                                    <input type="text" placeholder="Saldo inicial" value={saldoInicial ? formatarMoeda(saldoInicial) : formatarMoeda(0)} onChange={handleValorInicial} />

                                    <input type="submit" value="entrar" />

                                    {erroCaixa && (
                                        <input type="text" value={erroCaixa} disabled style={
                                            {
                                                backgroundColor: "red",
                                                marginTop: "10px",
                                                color: "#f2f2f2",
                                                textAlign: "center"
                                            }
                                        } />
                                    )}

                                </form>
                            </div>
                        )}
                    </div>
                )}

                {containerFecharCaixa && (
                    <div className="abrir-caixa">
                        <div className="form-caixa">
                            <div className="topo-form-caixa">
                                <button onClick={fecharContainerCaixa}><XLg color="#f2f2f2" /></button>
                            </div>
                            <form onSubmit={fechar}>
                                <h4>Fechar caixa</h4>
                                <label htmlFor="">Nome</label>
                                <input type="text" placeholder="Nome do usuario" value={username} onChange={(e) => setUserName(e.target.value)} />
                                <label htmlFor="">CPF</label>
                                <input type="number" placeholder="cpf do usuario" value={usercpf} onChange={(e) => setUserCpf(e.target.value)} />
                                <label htmlFor="">Saldo final</label>
                                <input type="text" placeholder="Saldo final" value={saldoFinal ? formatarMoeda(saldoFinal) : formatarMoeda(0)} onChange={handleValorFinal} />

                                <input type="submit" value="fechar" />

                                {erroCaixa && (
                                    <input type="text" value={erroCaixa} disabled style={
                                        {
                                            backgroundColor: "#D93636",
                                            marginTop: "10px",
                                            color: "#f2f2f2",
                                            textAlign: "center"
                                        }
                                    } />
                                )}

                                {sucessCaixa && (
                                    <input type="text" value={sucessCaixa} disabled style={
                                        {
                                            backgroundColor: "#03A64A",
                                            marginTop: "10px",
                                            color: "#f2f2f2",
                                            textAlign: "center"
                                        }
                                    } />
                                )}
                            </form>
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
    )
}

export default Pdv;