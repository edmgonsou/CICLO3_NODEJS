import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const Item = (props) => {

    const [data, setData] = useState([]);

    const [id, setid] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api + "/servico/" + id + "/pedido")
            .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
            });
    };
    useEffect(() => {
        getItens();
    }, [id]);
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Pedidos do Servico</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-servico"
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
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ServicoId} className="text-center">
                                <td>{item.PedidoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <div className="d-flex">
                                        <Link to={"/editaritem/servico/" + item.ServicoId}
                                            className="btn btn-outline-warning btn-sm m-auto">
                                            Editar Item Serviço
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