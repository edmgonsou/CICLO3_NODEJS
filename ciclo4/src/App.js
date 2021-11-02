import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Home} from './views/Home/';
import {ListarCli} from './views/Cliente/Listar/';
import {ListarPed} from './views/Pedido/Listar/';
import {ListarServ} from './views/Servico/Listar/';
import {Menu} from './components/Menu';
import {Item} from './views/ItemPedido/item';
import { CadastrarServ } from './views/Servico/Cadastrar';
import { CadastrarCli } from './views/Cliente/Cadastrar';
import { ListarPedCli } from './views/Pedido/ListarPedCli';
import { PedidosItem } from './views/ItemPedido/ListarItem';
import { CadastrarPed } from './views/Pedido/Cadastrar';
import { EditarCli } from './views/Cliente/Editar';
import { CadastrarItemped } from './views/ItemPedido/CadastrarItem';
import { ExcluirCliente } from './views/Cliente/Excluir';

function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path = "/" component = {Home}/>
          <Route path = "/listar-cliente" component = {ListarCli}/>
          <Route path = "/listar-pedido" component = {ListarPed}/>
          <Route path = "/listar-servico" component = {ListarServ}/>
          <Route path = "/listar-pedidos/:id" component = {Item}/>
          <Route path = "/cadastrarservico" component = {CadastrarServ}/>
          <Route path = "/cadastrar-cliente" component = {CadastrarCli}/>
          <Route path = "/listar-pedidos-cli/:id" component = {ListarPedCli}/>
          <Route path = "/listar-pedidos-item/:id" component = {PedidosItem}/>
          <Route path = "/Cadastrar-PedidoCli" component = {CadastrarPed}/>
          <Route path = "/pedido/item/:id" component = {CadastrarItemped}/>
          <Route path = "/editar-cliente/:id" component = {EditarCli}/> 
          <Route path = "/excluircliente/:id" component = {ExcluirCliente}/>         
        </Switch>
      </Router>     
    </div>    
  );
}

export default App;
