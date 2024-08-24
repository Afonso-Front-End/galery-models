
import useAcesso from './useAcesso';
import { Route, Routes, Link } from 'react-router-dom';
import MenuTauri from '../../components/menuwindow/MenuWindow';
import "./home.css"
import "./menu.css"

// import Produtos from '../produtos/lista_produtos/Produtos';
// import CadastroProdutos from '../produtos/cadastro_produtos/Cadastro';
// import Pdv from '../pdv/Pdv';
// import Vendas from '../venda/Venda';
// import Aprazo from '../aprazo/Aprazo';
// import Estoque from '../estoque/Estoque';

import Estoque from '../estoque/Estoque';
import Cadastro from '../cadastro/cadastro';
import Pdv from '../pdv/Pdv';
import History from '../hitory/History';
import HistoryFechamento from '../historyFechamento/HistoryFecha';
import Clientes from '../cliente/Cliente';

const Home = () => {
  const { handleItemClick, select, inicio, userData } = useAcesso();
  return (
    <div className="container">
      <MenuTauri />
      <div className="content">
        <div className='left-right'>
          <div className="left">
            <menu>
              <nav>
                {/* <hr /> */}
                <ul>
                  <li className={select === 0 ? 'selected' : ''} onClick={() => handleItemClick(0)}><Link to="estoque"><span></span>Estoque</Link></li>
                  <li className={select === 1 ? 'selected' : ''} onClick={() => handleItemClick(1)}><Link to="pdv"><span></span>Caixa</Link></li>
                  <li className={select === 2 ? 'selected' : ''} onClick={() => handleItemClick(2)}><Link to="cadastrar-produtos"><span></span> Cadastro</Link></li>
                  <li className={select === 3 ? 'selected' : ''} onClick={() => handleItemClick(3)}><Link to="history"><span></span>Historico de vendas</Link></li>
                  <li className={select === 4 ? 'selected' : ''} onClick={() => handleItemClick(4)}><Link to="history-fechamento"><span></span>Historico de fechamento</Link></li>
                  <li className={select === 5 ? 'selected' : ''} onClick={() => handleItemClick(5)}><Link to="clientes-fidelidades"><span></span>Clientes Fidelidades</Link></li>
                </ul>
                {/* <hr /> */}
              </nav>
            </menu>
          </div>

          <div className="rigth">
            <Routes>
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/pdv" element={<Pdv />} />
              <Route path="/cadastrar-produtos" element={<Cadastro />} />
              <Route path="/history" element={<History />} />
              <Route path="/history-fechamento" element={<HistoryFechamento />} />
              <Route path="/clientes-fidelidades" element={<Clientes />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
