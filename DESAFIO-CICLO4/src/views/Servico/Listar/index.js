import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarServ = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async () => {
        await axios.get(api + "/listarservicos")
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
            });
    };
    const excluirServico = async (id) => {
        const headers = {
            'Content-Type': 'application.json'
        };
        await axios.delete(api + "/excluirServico/" + id, { headers })
            .then((response) => {
                console.log(response.data.error);
                getServicos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: Sem conexão com a API."
                });
            });
    }
    useEffect(() => {
        getServicos();
    }, []);
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Visualizar Informações do Serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/cadastrarservico"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ?
                    <Alert color="danger">
                        {status.message}
                    </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="text-center/">
                                    <div className="d-flex">
                                        <Link to={"/listar-pedidos/" + item.id}
                                            className="btn btn-outline-primary btn-sm m-auto">
                                            Consultar Pedidos
                                        </Link>
                                        <Link to={"/editar-servico/" + item.id}
                                            className="btn btn-outline-warning btn-sm m-auto">
                                            Editar Serviço
                                        </Link>
                                        <span className="btn btn-outline-danger btn-sm m-auto"
                                            onClick={() => excluirServico(item.id)}>
                                            Excluir Serviço
                                        </span>
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