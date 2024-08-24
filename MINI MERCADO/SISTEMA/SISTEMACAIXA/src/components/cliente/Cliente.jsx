import { Search } from "react-bootstrap-icons"
import "./cliente.css"
export default function Clientes() {
    return (
        <div className="container-cliente">
            <div className="content-cliente">
                <div className='div-pesquisa-clientes' >

                    <div className='form-title'>
                        <h1 id='title'>Clientes</h1>
                    </div>

                    <div className='div-pesquisa-input-clientes'>
                        <input
                            type="text"
                            placeholder='Nome ou CPF' id='pesquisar'
                        />
                        <button
                            type="button">
                            <Search color="black" size={25} />
                        </button>
                    </div>



                </div>

                <form>

                </form>

            </div >
        </div>
    )
}