import { useState } from "react";
import { ArrowLeftShort, Check, ExclamationTriangleFill, PencilSquare, Plus, PlusSquareFill, Search, X, XCircle, XLg } from "react-bootstrap-icons";
import useScriptTabela from "./scriptTabela";

const Tabela = () => {
    const {
        clickEditProduto, table, formatarMoeda, selectedProduct, excluir,
        message, inicio, loading, confirmproduct, cancelar, excluirConfirm,
        handlePesquisar, inputChange, value, set_value, mensagem, messsage,
        erro, sucess, cancelarEdite, comfirmarEdite, handlePriceChange, tableedite,
        product_code, product_name, product_price, product_unit,
        setProduct_code, setProduct_name, setProduct_price, setProduct_unit, product_id,
        resultadosucess, resultadoerror, isDisabled, handleProductNameChange, handleProductCodeChange,
        handleProductUnitChange, clickedRowIndex,copyText
    } = useScriptTabela()


    return (
        <div className="content-table">

            <form className='form-pesquisa' onSubmit={handlePesquisar}>

                <div className='form-title'>
                    <h1 id='title'>Estoque</h1>
                </div>

                <div className='div-pesquisa-input'>
                    <input
                        type="text"
                        placeholder='NOME/CODIGO'
                        value={value} id='pesquisar'
                        autoComplete="off"
                        onChange={(e) => {
                            set_value(e.target.value),
                                inputChange(e.target.value)
                        }} />
                    <button
                        type="button"
                        onClick={handlePesquisar}>
                        <Search color="black" size={25} />
                    </button>

                </div>

                {mensagem && (
                    <div className='erro-pequisa'>
                        <p>{mensagem}</p>
                    </div>
                )}
            </form>

            <div className='div-table'>
                {inicio && (
                    <div className="container-inicio">
                        <div className="content-inicio">
                            <div className="img"><ExclamationTriangleFill size={150} color="#F74F50" /></div>
                            <div className="message-inicio">
                                <h1>{message}</h1>
                            </div>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                )}

                <table className='table' >
                    <thead>
                        <tr>
                            <th>produto</th>
                            <th>codigo</th>
                            <th>valor</th>
                            <th>unidade</th>
                            <th>exluir</th>
                            <th>editar</th>
                        </tr>
                    </thead>
                    <tbody >
                        {table && table.map((product, index) => (
                            <tr key={index}>
                                <td >
                                    <input type="text"
                                        value={product.product_name}
                                        disabled={isDisabled !== index}
                                        onChange={(e) => handleProductNameChange(index, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input type="number"
                                        value={product.product_code}
                                        disabled={isDisabled !== index}
                                        onChange={(e) => handleProductCodeChange(index, e.target.value)}
                                    />
                                    <button id="copy" onClick={() => copyText(product.product_code)}>
                                        <PencilSquare size={25} color="#f2f2f2"/>
                                    </button>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={formatarMoeda(product.product_price["$numberDecimal"])}
                                        disabled={isDisabled !== index}
                                        onChange={(e) => handlePriceChange(index, e)}
                                    />
                                </td>
                                <td>
                                    <input type="text"
                                        value={product.product_unit}
                                        disabled={isDisabled !== index}
                                        onChange={(e) => handleProductUnitChange(index, e.target.value)}
                                    />
                                </td>

                                {isDisabled !== index ? (
                                    <>
                                        <td >
                                            <button onClick={() => excluir(product, index)} id='excluir'><X color="#FFF" size={20} /></button>

                                            {clickedRowIndex === index && (
                                                <div className="button-container">
                                                    <button onClick={() => cancelar(index)}><ArrowLeftShort size={20} /></button>
                                                    <button onClick={() => excluirConfirm(confirmproduct._id)}><Check size={20} /></button>
                                                </div>
                                            )}
                                        </td>
                                        <td onClick={() => clickEditProduto(index, product)}>
                                            <button id='editar' ><PencilSquare color="#FFF" size={20} /></button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td onClick={cancelarEdite}><button id='cancelar' ><ArrowLeftShort color="#FFF" size={26} /></button></td>
                                        <td onClick={() => comfirmarEdite(product._id)}><button id='confirmar' ><Check color="#FFF" size={30} /></button></td>
                                    </>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>

                <>
                    {erro && (
                        <div>
                            <p id='erro-table'>{erro}</p>
                        </div>
                    )}

                    {sucess && (
                        <div>
                            <p id='sucess-table'>{sucess}</p>
                        </div>
                    )}
                </>

                {resultadosucess && (
                    <div className='resultado'>
                        <div className="topo-exite" >
                            <h1></h1>
                            <button id='exite' onClick={cancelar}><XLg color="#FFFFFF" size={25} /></button>
                        </div>
                        <div>
                            <h2><Check size={100} /></h2>
                            <h1>{resultadosucess}</h1>
                        </div>
                    </div>
                )}

                {resultadoerror && (
                    <div className='resultado'>
                        <div className="topo-exite" >
                            <h1></h1>
                            <button id='exite' onClick={cancelar}><XLg color="#FFFFFF" size={25} /></button>
                        </div>
                        <div>
                            <h2><XCircle size={100} /></h2>
                            <h1>{resultadoerror}</h1>
                        </div>
                    </div>
                )}

            </div>

        </div>

    )
}

export default Tabela;