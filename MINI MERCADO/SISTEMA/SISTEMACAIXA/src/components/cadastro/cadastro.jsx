import { useEffect, useRef, useState } from "react";
import { Check2All, ExclamationTriangleFill, X, XLg } from "react-bootstrap-icons";
import "./cadastro.css"
import useCadastro from "./useCadastro";
import BarcodeScanner from "../../barcodescanner/BarcodeScannerCodigo";

const Cadastro = () => {
    const refcode = useRef()
    useEffect(() => {
        refcode.current.focus()
    }, [])

    const [detectedCode, setDetectedCode] = useState('');

    const handleDetected = (code) => {
        setDetectedCode(code);
        setProduct_code(code)
        console.log("Código detectado:", code);
    };

    const {
        product_code, product_name,
        product_price, product_unit,
        setProduct_code, setProduct_name,
        setProduct_price, setProduct_unit,
        handleCadastro, handlePriceChange,
        clear, messageerror, messagesucess,
        formatarMoeda, loading, inicio, message,
        exite,

    } = useCadastro()

    return (
        <div className="container-form">
            <div className="content-form">

                <form className="form" onSubmit={handleCadastro}>
                    <div className='form-title'>
                        <h1 id='title'>Sistema de cadastramento de produtos</h1>
                    </div>
                    <table className="table-form">
                        <thead>
                            <tr>
                                <th>codigo</th>
                                <th>produto</th>
                                <th>preco</th>
                                <th>unidade</th>
                                <th><X /></th>
                                <th><Check2All /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="number"
                                        id="codigo-cadastrar"
                                        placeholder="Codigo"
                                        name="codigo"
                                        onChange={
                                            (event) => setProduct_code(event.target.value)}
                                        value={product_code}
                                        ref={refcode}
                                    />
                                </td>
                                <td>
                                    <input type="text"
                                        id="produto-cadastrar"
                                        placeholder="Produto"
                                        name="produto"
                                        onChange={
                                            (event) => setProduct_name(event.target.value)}
                                        value={product_name}
                                    />
                                </td>
                                <td>
                                    <input type="text"
                                        id="preco-cadastrar"
                                        placeholder="Preco"
                                        name="preco"
                                        value={product_price ? formatarMoeda(product_price) : formatarMoeda(0)} onChange={handlePriceChange}
                                    />
                                </td>
                                <td>
                                    <input type="number"
                                        id="quantidade-cadastrar"
                                        placeholder="Quantidade"
                                        name="quantidade"
                                        onChange={
                                            (event) => setProduct_unit(event.target.value)}
                                        value={product_unit}
                                    />
                                </td>
                                <td onClick={clear}>
                                    <button type="button" id='limpar'>
                                        <X size={30} />
                                    </button>
                                </td>
                                <td onClick={handleCadastro}>
                                    <button type="submit" id='salvar' >
                                        <Check2All size={30} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {messagesucess && (
                        <div className="messagesucess">
                            <p>{messagesucess}</p>
                        </div>
                    )}
                    {messageerror && (
                        <div className="messageerror">
                            <p>{messageerror}</p>
                        </div>
                    )}

                    <BarcodeScanner onDetected={handleDetected} />

                </form>

                {loading && (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                )}

                {inicio && (
                    <div className="inicio">
                        <div className="topo-exite-inicio-cadastro" >
                            <div className="exite-inicio-cadastro">
                                <button id='exite' onClick={exite}><XLg color="black" size={25} /></button>
                            </div>
                        </div>
                        <div className="inicio-message">
                            <ExclamationTriangleFill color="#D93636" size={150} />
                            <p>{message}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Cadastro;