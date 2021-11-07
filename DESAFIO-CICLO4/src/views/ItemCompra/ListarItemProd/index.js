import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ProdutoItemComp = (props) => {

    const [data, setData] = useState([]);

    const [id, setid] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItensProd = async () => {
        await axios.get(api + "/produto/" + id + "/compra")
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
        getItensProd();
    }, [id]);
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Compras do Produto</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listarproduto"
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
                            <th>CompraId</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ProdutoId} className="text-center">
                                <td>{item.CompraId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <div className="d-flex">
                                        <Link to={"/editaritem/produto/" + item.ProdutoId}
                                            className="btn btn-outline-warning btn-sm m-auto">
                                            Editar Item Produto
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