const express = require('express');
const { Sequelize } = require('./models');
const cors = require('cors');

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;
let compra = models.Compra;
let produto = models.Produto;
let itemcompra = models.ItemCompra;

//      +-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-
//         ---------------      DESAFIO  CICLO 4 - REACTJS   ---------------
//      +-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-

//ROTA DE INSERÇÃO

app.post('/CadCompraCli', async (req, res) => {
    await compra.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: 'Serviço criado com sucesso!'
        })
    }).catch(function (error) {
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel se conectar!'
        })
    });
});

app.post('/cliente/:id/inserircompra', async (req, res) => {
    const comp = {
        dataCompra: req.body.data,
        ClienteId: req.params.id
    };
    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };
    await compra.create(comp)
        .then(compcli => {
            return res.json({
                error: false,
                message: "A compra foi inserido com sucesso.",
                compcli
            });
        }).catch(error => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível inserir o compra."
            });
        });
});

app.post('/cadastrarproduto', async (req, res) => {
    await produto.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: 'Produto criado com sucesso!'
        })
    }).catch(function (error) {
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel inserir o produto!'
        })
    });
});

app.post('/inseritemcompra', async (req, res) => {
    await itemcompra.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "O itemcompra foi inserido com sucesso."
        });
    }).catch(function (error) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o itemcompra."
        });
    });
});

app.post('/cadastrarItem/compra/:id', async (req, res) => {
    const item = {
        CompraId: req.params.id,
        ProdutoId: req.body.ProdutoId,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    }

    if (!await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Compra não existe."
        });
    };

    await itemcompra.create(item)
        .then(order => {
            return res.json({
                error: false,
                message: "O item foi inserido com sucesso.",
                order
            });
        }).catch(error => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível inserir o item."
            });
        });
});

// ROTA DE LISTAGEM

app.get('/listarcompra', async (req, res) => {
    await compra.findAll({
        raw: true
    }).then(function (compra) {
        res.json(compra)
    });
});

app.get('/listarcompra/:id', async (req, res) => {
    await compra.findByPk(req.params.id)
        .then(comp => {
            return res.json({
                error: false,
                comp
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Não foi possível conectar."
            });
        });
});

app.get('/listaCompraCli/:id', async (req, res) => {
    await compra.findAll({
        where: { ClienteId: req.params.id }
    }).then(ped => {
        return res.json({
            error: false,
            ped
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: ('Erro: Cliente não encontrado')
        });
    });
});

app.get('/listarcompra/:id', async (req, res) => {
    await compra.findByPk(req.params.id, { include: [{ all: true }] })
        .then(comp => {
            return res.json({ comp });
        });
});

app.get('/listarproduto', async (req, res) => {
    await produto.findAll({
        raw: true
    }).then(function (produto) {
        res.json(produto)
    });
});

app.get('/listarProduto/:id', async (req, res) => {
    await produto.findByPk(req.params.id)
        .then(prod => {
            return res.json({
                error: false,
                prod
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Não foi possível conectar."
            });
        });
});

app.get('/listaprodutoCli', async (req, res) => {
    await produto.findByPk(req.body.ClienteId, {
        where: {
            and: { compra: { include: [{ all: true }] } },
            produto: { include: [{ all: true }] }
        }
    }).then(prod => {
        return res.json({ prod });
    });

});

app.get('/produto/:id/compra', async (req, res) => {
    await itemcompra.findAll({
        where: { ProdutoId: req.params.id }
    })
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Não foi possível conectar."
            });
        });
});

app.get('/listaItemComp/:id', async (req, res) => {
    await itemcompra.findAll({
        where: { CompraId: req.params.id }
    }).then((item) => {
        return res.json({
            error: false,
            item
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: ('Erro: Pedido não encontrado')
        });
    });
});

app.get('/listaritemcom', async (req, res) => {
    await itemcompra.findAll({
        raw: true
    }).then(function (item) {
        res.json(item)
    });
});

// ROTA PARA EDIÇÃO

app.put('/editarCompra/:id', async (req, res) => {
    await compra.update(req.body, {
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Compra alterada com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Compra não alterado."
        });
    });
});

app.put('/atualizacompra', async (req, res) => {
    await compra.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Compra alterada com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Compra não alterado."
        });
    });
});

app.put('/editarproduto/:id', async (req, res) => {
    await produto.update(req.body, {
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Produto alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: produto não alterado."
        });
    });
});

app.put('/atualizaproduto', async (req, res) => {
    await produto.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Produto alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: produto não alterado."
        });
    });
});

app.put('/editaritem/compra/:id', async (req, res) => {
    const item = {
        ProdutoId: req.body.ProdutoId,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if (!await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Compra não foi encontrado'
        });
    };
    if (!await produto.findByPk(req.body.ProdutoId)) {
        return res.status(400).json({
            error: true,
            message: 'Produto não foi encontrado.'
        });
    };

    await itemcompra.update(item, {
        where: Sequelize.and({ ProdutoId: req.body.ProdutoId },
            { CompraId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: "Item alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alteração."
        });
    });
});


app.put('/compra/:id/editaritemcom', async (req, res) => {
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };
    if (!await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Compra não foi encontrado'
        });
    };
    if (!await produto.findByPk(req.body.ProdutoId)) {
        return res.status(400).json({
            error: true,
            message: 'Produto não foi encontrado.'
        });
    };
    await itemcompra.update(item, {
        where: Sequelize.and({ ProdutoId: req.body.ProdutoId },
            { compraId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: "Compra alterado com sucesso.",
            itens
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alteração."
        });
    });
});

app.put('/editaritem/produto/:id', async (req, res) => {
    const item = {
        CompraId: req.body.CompraId,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if (!await produto.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Produto não foi encontrado.'
        });
    };

    if (!await compra.findByPk(req.body.CompraId)) {
        return res.status(400).json({
            error: true,
            message: 'Compra não foi encontrado'
        });
    };

    await itemcompra.update(item, {
        where: Sequelize.and({ CompraId: req.body.CompraId },
            { ProdutoId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alteração."
        });
    });
});

// ROTA DE EXCLUSÃO

app.delete('/excluircompra/:id', async (req, res) => {
    await compra.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "A compra foi excluido com sucesso"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir a compra"
        });
    });
});

app.delete('/excluirproduto/:id', async (req, res) => {
    await produto.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "O produto foi excluido com sucesso"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir o produto"
        });
    });
});

app.delete('/excluirItemComp/:id', async (req, res) => {
    await itemcompra.destroy({
        where: { CompraId: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "O Item foi excluido com sucesso"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir o item"
        });
    });
});

app.get('/compra/:id/excluiritemcom', async (req, res) => {
    await itemcompra.destroy({
        where: Sequelize.and({ ProdutoId: req.body.ProdutoId },
            { compraId: req.params.id })
    }).then(function () {
        return res.json({
            error: false,
            message: "Item excluido com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível a exclusão."
        });
    });
});

//      +-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+
//           ---------      ROTAS CICLO 4 - AULAS GRAVADAS    ---------
//      +-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+

// ROTA DE LISTAGEM

app.get('/listarclientes', async (req, res) => {
    await cliente.findAll({
        raw: true
        //order:[['nascimento','ASC']]        
    }).then(function (clientes) {
        res.json(clientes)
    });
});

app.get('/cliente/:id', async (req, res) => {
    await cliente.findByPk(req.params.id)
        .then(serv => {
            return res.json({
                error: false,
                serv
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Não foi possível conectar."
            });
        });
});

app.get('/listarservicos', async (req, res) => {
    await servico.findAll({
        raw: true
        //order: [['nome', 'ASC']]
    }).then(function (servicos) {
        res.json(servicos)
    });
});

app.get('/listarServico/:id', async (req, res) => {
    await servico.findByPk(req.params.id)
        .then(serv => {
            return res.json({
                error: false,
                serv
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Não foi possível conectar."
            });
        });
});

app.get('/listapedidosCli/:id', async (req, res) => {
    await pedido.findAll({
        where: { ClienteId: req.params.id }
    }).then(ped => {
        return res.json({
            error: false,
            ped
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: ('Erro: Cliente não encontrado')
        });
    });
});

app.get('/servico/:id/pedido', async (req, res) => {
    await itempedido.findAll({
        where: { ServicoId: req.params.id }
    })
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Não foi possível conectar."
            });
        });
});

app.get('/listarpedidos', async (req, res) => {
    await pedido.findAll({
        raw: true
        //order: [['valor', 'DESC']]
    }).then(function (ped) {
        res.json(ped)
    });
});

app.get('/listarpedido/:id', async (req, res) => {
    await pedido.findByPk(req.params.id)
        .then(ped => {
            return res.json({
                error: false,
                ped
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Não foi possível conectar."
            });
        });
});

app.get('/pedidositem/:id', async (req, res) => {
    await pedido.findByPk(req.params.id, { include: [{ all: true }] })
        .then(ped => {
            return res.json({ ped });
        });
});

app.get('/listaItemPed/:id', async (req, res) => {
    await itempedido.findAll({
        where: { PedidoId: req.params.id }
    }).then((item) => {
        return res.json({
            error: false,
            item
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: ('Erro: Pedido não encontrado')
        });
    });
});

// ROTA DE CADASTRAR

app.post('/clientes', async (req, res) => {
    await cliente.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "O cliente foi inserido com sucesso"
        });
    }).catch(function (error) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel cadastrar o cliente "
        });
    });
});

app.post('/servicos', async (req, res) => {
    await servico.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: 'Serviço criado com sucesso!'
        })
    }).catch(function (error) {
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel se conectar!'
        })
    });
});

app.post('/CadPedidoCli', async (req, res) => {
    await pedido.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: 'Serviço criado com sucesso!'
        })
    }).catch(function (error) {
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel se conectar!'
        })
    });
});

app.post('/cliente/:id/pedido', async (req, res) => {
    const ped = {
        dataPedido: req.body,
        ClienteId: req.params.id
    };

    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };

    await pedido.create(ped)
        .then(order => {
            return res.json({
                error: false,
                message: "O pedido foi inserido com sucesso.",
                order
            });
        }).catch(error => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível inserir o pedido."
            });
        });
});

app.post('/itempedido', async (req, res) => {
    await itempedido.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "O itempedido foi inserido com sucesso."
        });
    }).catch(function (error) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o item."
        });
    });
});

app.post('/pedido/item/:id', async (req, res) => {
    const item = {
        PedidoId: req.params.id,
        ServicoId: req.body.ServicoId,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    }

    if (!await pedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Pedido não existe."
        });
    };

    await itempedido.create(item)
        .then(order => {
            return res.json({
                error: false,
                message: "O item foi inserido com sucesso.",
                order
            });
        }).catch(error => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível inserir o pedido."
            });
        });
});

// ROTA DE EDIÇÃO

app.put('/editarcliente/:id', async (req, res) => {
    await cliente.update(req.body, {
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Cliente alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: cliente não alterado."
        });
    });
});

app.put('/editarpedido/:id', async (req, res) => {
    await pedido.update(req.body, {
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Pedido não alterado."
        });
    });
});

app.put('/editaritem/pedidos/:id', async (req, res) => {
    const item = {
        ServicoId: req.body.ServicoId,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if (!await pedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado'
        });
    };
    if (!await servico.findByPk(req.body.ServicoId)) {
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ ServicoId: req.body.ServicoId },
            { PedidoId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alteração."
        });
    });
});

app.put('/editarservico/:id', async (req, res) => {
    await servico.update(req.body, {
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Serviço alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: serviço não alterado."
        });
    });
});

app.put('/editaritem/servico/:id', async (req, res) => {
    const item = {
        PedidoId: req.body.PedidoId,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if (!await servico.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    if (!await pedido.findByPk(req.body.PedidoId)) {
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado'
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ PedidoId: req.body.PedidoId },
            { ServicoId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alteração."
        });
    });
});


// ROTA DE EXCLUSÃO

app.delete('/excluircliente/:id', async (req, res) => {
    await cliente.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "O Cliente foi excluido com sucesso"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir o cliente"
        });
    });
});

app.delete('/excluirServico/:id', async (req, res) => {
    await servico.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "O Serviço foi excluido com sucesso"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir o serviço"
        });
    });
});

app.delete('/excluirpedido/:id', async (req, res) => {
    await pedido.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "O Pedido foi excluido com sucesso"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir o Pedido"
        });
    });
});

app.delete('/excluirItemPed/:id', async (req, res) => {
    await itempedido.destroy({
        where: { PedidoId: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "O Item foi excluido com sucesso"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir o item"
        });
    });
});

//      +-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+
//         ------------      AULAS GRAVADAS  CICLO 3   ------------
//      +-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+

app.post('/servicos', async (req, res) => {
    await servico.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: 'Serviço criado com sucesso!'
        })
    }).catch(function (error) {
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel se conectar!'
        })
    });
});
app.post('/clientes', async (req, res) => {
    await cliente.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "O cliente foi inserido com sucesso"
        });
    }).catch(function (error) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel cadastrar o cliente "
        });
    });
});

app.post('/cliente/:id/pedido', async (req, res) => {
    const ped = {
        dataPedido: req.body,
        ClienteId: req.params.id
    };

    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };

    await pedido.create(ped)
        .then(order => {
            return res.json({
                error: false,
                message: "O pedido foi inserido com sucesso.",
                order
            });
        }).catch(error => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível inserir o pedido."
            });
        });
});

app.post('/itempedido', async (req, res) => {
    await itempedido.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "O itempedido foi inserido com sucesso."
        });
    }).catch(function (error) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o item."
        });
    });
});

app.get('/consultaservicos', async (req, res) => {
    await servico.findAll({
        //raw: true
        order: [['nome', 'ASC']]
    }).then(function (servicos) {
        res.json(servicos)
    });
});

app.get('/ofertaservicos', async (req, res) => {
    await servico.count('id').then(function (servicos) {
        res.json({ servicos });
    });
});

app.get('/consultaclientes', async (req, res) => {
    await cliente.findAll({
        //raw: true
        order: [['nascimento', 'ASC']]
    }).then(function (clientes) {
        res.json(clientes)
    });
});

app.get('/quantclientes', async (req, res) => {
    await cliente.count('id').then(function (clientes) {
        res.json({ clientes });
    });
});
app.get('/quantpedidos', async (req, res) => {
    await pedido.count('id').then(function (pedidos) {
        res.json({ pedidos });
    });
});

app.get('/consultapedidos', async (req, res) => {
    await itempedido.findAll({
        //raw: true
        order: [['valor', 'DESC']]
    }).then(function (ped) {
        res.json(ped)
    });
});

app.put('/atualizaservico', async (req, res) => {
    await servico.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Serviço alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: serviço não alterado."
        });
    });
});
//aula 11

app.get('/pedidos/:id', async (req, res) => {
    await pedido.findByPk(req.params.id, { include: [{ all: true }] })
        .then(ped => {
            return res.json({ ped });
        });
});
//aula 12

app.put('/editaritem/pedidos/:id', async (req, res) => {
    const item = {
        ServicoId: req.body.ServicoId,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if (!await pedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado'
        });
    };
    if (!await servico.findByPk(req.body.ServicoId)) {
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ ServicoId: req.body.ServicoId },
            { PedidoId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alteração."
        });
    });
});
//exercicio aula 12
app.get('/listaservicosCli', async (req, res) => {
    await servico.findByPk(req.body.ClienteId, {
        where: {
            and: { pedido: { include: [{ all: true }] } },
            servico: { include: [{ all: true }] }
        }
    }).then(cli => {
        return res.json({ cli });
    });

});

app.put('/atualizacliente', async (req, res) => {
    await cliente.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Cliente alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: cliente não alterado."
        });
    });
});

app.put('/atualizapedido', async (req, res) => {
    await pedido.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Pedido não alterado."
        });
    });
});

app.get('/listapedidosCli', async (req, res) => {
    await pedido.findAll({
        where: { ClienteId: req.body.ClienteId }
    }).then(ped => {
        return res.json({ ped });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: ('Erro: Cliente não encontrado')
        });
    });
});
//AULA 13

app.get('/excluircliente/:id', async (req, res) => {
    await cliente.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "O Cliente foi excluido com sucesso"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir o cliente"
        });
    });
});

let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Servido Ativo: http://localhost:3001');
})