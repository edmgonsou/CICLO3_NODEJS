const express = require('express');
const {Sequelize} = require('./models');
const cors = require('cors');

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

app.get('/', function(req, res){
    res.send('Olá, mundo')
});

// app.get('/clientes', async(req, res)=>{
//     await cliente.create({
//         nome: "Madalena Queiroz Fonseca",
//         endereco: "Av. Alexandre Rasgulaeff, 1350",
//         cidade: "Maringá",
//         uf: "PR",
//         nascimento: 1980/08/19,
//         clienteDesde: 2019/06/21,
//         createAt: new Date(),
//         updateAt: new Date()
//     });
//     res.send('Cliente inserido com sucesso!');
// });

// app.get('/pedidos', async(req, res)=>{
//     await pedido.create({
//         dataPedido: '2021-10-16',
//         ClienteId: 1,        
//     });
//     res.send('Pedido inserido com sucesso!');
// });

app.post('/servicos', async(req, res)=>{
    await servico.create(
        req.body        
    ).then(function(){
        return res.json({
            error: false,
            message: 'Serviço criado com sucesso!'
        })
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel se conectar!'
        })
    });    
});
app.post('/clientes', async(req, res)=>{
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "O cliente foi inserido com sucesso"
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Não foi possivel cadastrar o cliente "
        });
    });
});

app.post('/cliente/:id/pedido', async(req, res)=>{
    const ped = {
        dataPedido: req.body,
        ClienteId: req.params.id
    };
    
    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };

    await pedido.create(ped)
    .then(order=>{
        return res.json({
            error: false,
            message: "O pedido foi inserido com sucesso.",
            order
        });
    }).catch(error=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o pedido."
        });
    });   
});

app.post('/itempedido', async(req, res)=>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "O itempedido foi inserido com sucesso."
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o item."
        });
    });
});

app.get('/consultaservicos', async(req, res)=>{
    await servico.findAll({
        //raw: true
        order: [['nome', 'ASC']]
    }).then(function(servicos){
        res.json(servicos)
    });
});

app.get('/ofertaservicos', async(req, res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/servico/:id', async(req, res)=>{
    await servico.findByPk(req.params.id)
    .then(serv=>{
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Não foi possível conectar."
        });
    });
});

app.get('/consultaclientes', async(req, res)=>{
    await cliente.findAll({
        //raw: true
        order:[['nascimento','ASC']]        
    }).then(function(clientes){
        res.json(clientes)
    });
});

app.get('/quantclientes', async(req, res)=>{
    await cliente.count('id').then(function(clientes){
        res.json({clientes});
    });
});
app.get('/quantpedidos', async(req, res)=>{
    await pedido.count('id').then(function(pedidos){
        res.json({pedidos});
    });
});

app.get('/consultapedidos', async(req, res)=>{
    await itempedido.findAll({
        //raw: true
        order: [['valor', 'DESC']]
    }).then(function(ped){
        res.json(ped)
    });
});

app.put('/atualizaservico', async(req, res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: serviço não alterado."
        });
    });
});
//aula 11

app.get('/pedidos/:id', async(req, res)=>{
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(ped=>{
        return res.json({ped});
    });
});
//aula 12

app.put('/pedidos/:id/editaritem', async(req, res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado'
        });
    };
    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    await itempedido.update(item,{
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Não foi possível alteração."
        });
    });
});
//exercicio aula 12
app.get('/listaservicosCli', async(req, res)=>{   
        await servico.findByPk(req.body.ClienteId,{
            where: {and:{pedido:{include:[{all:true}]}},
                    servico: {include:[{all:true}]}}
        }).then(cli=>{
            return res.json({cli});
        });
        
    });

app.put('/atualizacliente', async(req, res)=>{
    await cliente.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: cliente não alterado."
        });
    });
});

app.put('/atualizapedido', async(req, res)=>{
    await pedido.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: Pedido não alterado."
        });
    });
});

app.get('/listapedidoscli', async(req, res)=>{    
        await cliente.findByPk(req.body.ClienteId,{
            where: {pedido:{include:[{all:true}]}}
                    
        }).then(ped=>{
            return res.json({ped});
        });
        
    });
//AULA 13

app.get('/excluircliente/:id', async(req, res)=>{
    await cliente.destroy({
       where: {id: req.params.id}
    }). then(function(){
        return res.json({
            error: false,
            message: "O Cliente foi excluido com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir o cliente"
        });
    });
});

let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servido Ativo: http://localhost:3001');
})