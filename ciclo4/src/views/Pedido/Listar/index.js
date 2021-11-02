import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarPed = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api + "/listarpedidos")
            .then((response) => {
                //console.log(response.data);
                setData(response.data);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
            });
    };
    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className="m-auto p-2">
                        <h1>Visualizar Informações do Pedido</h1>
                    </div>
                    <div className="p-2 float-left">
                        <Link to="/Cadastrar-PedidoCli"
                            className="btn btn-outline-primary btn-sm">Cadastrar Pedido</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Data do Pedido</th>
                            <th>ClienteId</th>
                            <th>Data da Criação</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.dataPedido}</td>
                                <td>{item.ClienteId}</td>
                                <td>{item.createdAt}</td>
                                <td>
                                    <div className="d-flex p-2">
                                        <Link to={"/listar-pedidos-item/" + item.id}
                                            className="btn btn-outline-primary btn-sm m-auto">
                                            Consultar item
                                        </Link>
                                        <Link to={"/pedido/item/" + item.id}
                                            className="btn btn-outline-dark btn-sm m-auto">
                                            Cadastrar Item
                                        </Link>
                                        <Link to={"/listar-pedidos-item/" + item.id}
                                            className="btn btn-outline-warning btn-sm m-auto">
                                            Editar Pedido
                                        </Link>
                                        <Link to={"/listar-pedidos-item/" + item.id}
                                            className="btn btn-outline-danger btn-sm m-auto">
                                            Excluir Pedido
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Container>
        </div>
    );
};