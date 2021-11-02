import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development"
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const PedidosItem = (props) => {

    const [data, setData] = useState([]);
    const [id, setId] = useState(props.match.params.id);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItensPed = async () => {
        await axios.get(api + "/pedidositem/" + id)
            .then((response) => {
                console.log(response.data.ped.item_pedidos);
                setData(response.data.ped.item_pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API."
                })
            });
    };
    useEffect(() => {
        getItensPed();
    }, [id]);

    return (<div>
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Itens do Pedidos</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente"
                        className="btn btn-outline-success btn-sm separaBot">Voltar Cliente</Link>
                    <Link to="/listar-pedido"
                        className="btn btn-outline-success btn-sm">Voltar Pedido</Link>
                </div>
            </div>
            {status.type === 'error' ?
                <Alert color="danger">
                    {status.message}
                </Alert> : ""}
            <Table striped>
                <thead>
                    <tr className="text-center">
                        <th>Quantidade</th>
                        <th>PedidoID</th>
                        <th>ServiçoId</th>
                        <th>Valor</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.quantidade}</td>
                            <td>{item.PedidoId}</td>
                            <td>{item.ServicoId}</td>
                            <td>{item.valor}</td>
                            <td>
                                <div className="d-flex p-2">
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