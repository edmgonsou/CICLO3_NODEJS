import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './views/Home/';
import { ListarCli } from './views/Cliente/Listar/';
import { ListarPed } from './views/Pedido/Listar/';
import { ListarServ } from './views/Servico/Listar/';
import { Menu } from './components/Menu';
import { Item } from './views/ItemPedido/ListarItemServ';
import { CadastrarServ } from './views/Servico/Cadastrar';
import { CadastrarCli } from './views/Cliente/Cadastrar';
import { ListarPedCli } from './views/Pedido/ListarPedCli';
import { PedidosItem } from './views/ItemPedido/ListarItemPed';
import { CadastrarPed } from './views/Pedido/Cadastrar';
import { EditarCli } from './views/Cliente/Editar';
import { CadastrarItemped } from './views/ItemPedido/CadastrarItem';
import { ListarComp } from './views/Compra/Listar';
import { ListarCompCli } from './views/Compra/ListarCompraCli';
import { CadastrarComp } from './views/Compra/Cadastrar';
import { EditarItem } from './views/ItemPedido/Editar';
import { EditarPedid } from './views/Pedido/Editar';
import { EditarServ } from './views/Servico/Editar';
import { EditarServPed } from './views/Servico/EditarServPed';
import { EditarCompra } from './views/Compra/Editar';
import { ListarProduto } from './views/Produto/Listar';
import { CadastrarProduto } from './views/Produto/Cadastrar';
import { EditarProduto } from './views/Produto/Editar';
import { ListarItemCompra } from './views/ItemCompra/ListarItemCompra';
import { CadastrarItemCompra } from './views/ItemCompra/Cadastrar';
import { EditarItemCompra } from './views/ItemCompra/Editar';
import { ProdutoItemComp } from './views/ItemCompra/ListarItemProd';
import { EditarProdComp } from './views/Produto/EditarProdComp';

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/listar-cliente" component={ListarCli} />
          <Route path="/cadastrar-cliente" component={CadastrarCli} />
          <Route path="/editar-cliente/:id" component={EditarCli} />
          <Route path="/listar-pedidos-cli/:id" component={ListarPedCli} />
          <Route path="/listar-pedido" component={ListarPed} />
          <Route path="/listaItemPed/:id" component={PedidosItem} />
          <Route path="/editar-item/pedidos/:id" component={EditarItem} />
          <Route path="/Cadastrar-PedidoCli" component={CadastrarPed} />
          <Route path="/pedido/item/:id" component={CadastrarItemped} />
          <Route path="/listar-servico" component={ListarServ} />
          <Route path="/listar-pedidos/:id" component={Item} />
          <Route path="/editarpedido/:id" component={EditarPedid} />
          <Route path="/cadastrarservico" component={CadastrarServ} />
          <Route path="/editar-servico/:id" component={EditarServ} />
          <Route path="/editaritem/servico/:id" component={EditarServPed} />
          <Route path="/listar-pedidos-cli/:id" component={ListarPedCli} />
          <Route path="/listarcompra" component={ListarComp} />
          <Route path="/listar-compra/:id" component={ListarCompCli} />
          <Route path="/CadCompraCli" component={CadastrarComp} />
          <Route path="/editarCompra/:id" component={EditarCompra} />
          <Route path="/listarproduto" component={ListarProduto} />
          <Route path="/cadastrarproduto" component={CadastrarProduto} />
          <Route path="/editarproduto/:id" component={EditarProduto} />
          <Route path="/listaItemComp/:id" component={ListarItemCompra} />
          <Route path="/cadastrarItem/compra/:id" component={CadastrarItemCompra} />
          <Route path="/editaritem/compra/:id" component={EditarItemCompra} />
          <Route path="/produto/:id/compra" component={ProdutoItemComp} />
          <Route path="/editaritem/produto/:id" component={EditarProdComp} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
