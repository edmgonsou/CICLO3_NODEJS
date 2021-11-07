import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarPedCli = (props) => {
    
    const [data, setData] = useState([]);

    const [id, setid] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api + "/listapedidosCli/" + id)
            .then((response) => {
                console.log(response.data.ped);
                setData(response.data.ped);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })                
            });
    };
    useEffect(() => {
        getPedidos();
    }, [id]);
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Pedidos do Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-cliente"
                            className="btn btn-outline-success btn-sm">Voltar</Link>
                    </div>
                </div>
                {status.type === 'error' ?
                    <Alert color="danger">
                        {status.message}
                    </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr className="text-center">
                            <th>PedidosId</th>
                            <th>Data do Pedido</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ClienteId} className="text-center">
                                <td>{item.id}</td>
                                <td>{item.dataPedido}</td>
                                <td>
                                    <Link to={"/listaItemPed/" + item.id}
                                        className="btn btn-outline-primary btn-sm m-auto">
                                        listar Item do Pedido
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};