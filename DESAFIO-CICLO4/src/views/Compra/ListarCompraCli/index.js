import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarCompCli = (props) => {

    const [data, setData] = useState([]);
    const [id, setid] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras = async () => {
        await axios.get(api + "/listaCompraCli/" + id)
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
        getCompras();
    }, [id]);
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Compras do Cliente</h1>
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
                            <th>CompraId</th>
                            <th>Data da Compra</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ClienteId} className="text-center">
                                <td>{item.id}</td>
                                <td>{item.dataCompra}</td>
                                <td>
                                    <Link to={"/listaItemComp/" + item.id}
                                        className="btn btn-outline-primary btn-sm m-auto">
                                        listar Item da Compra
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