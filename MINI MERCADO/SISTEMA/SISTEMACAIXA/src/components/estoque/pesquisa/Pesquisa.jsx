import { Search } from "react-bootstrap-icons";
import useScripPesquisa from "./scriptPesquisa";

const Pesquisa = () => {
    const { handlePesquisar, inputChange, mensagem, set_value, value } = useScripPesquisa()

    return (
        <>
            <form className='form-pesquisa' onSubmit={handlePesquisar}>

                <div className='form-title'>
                    <h1 id='title'>Estoque</h1>
                </div>

                <div className='div-pesquisa-input'>
                    <input
                        type="text"
                        placeholder='NOME/CODIGO'
                        value={value} id='pesquisar'
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
        </>
    )
}
export default Pesquisa;