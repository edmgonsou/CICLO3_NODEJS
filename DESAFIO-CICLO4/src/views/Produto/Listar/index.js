import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarProduto = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProdutos = async () => {
        await axios.get(api + "/listarproduto")
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
    const excluirProduto = async (id) => {
        const headers = {
            'Content-Type': 'application.json'
        };
        await axios.delete(api + "/excluirproduto/" + id, { headers })
            .then((response) => {
                console.log(response.data.error);
                getProdutos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: Sem conexão com a API."
                });
            });
    }
    useEffect(() => {
        getProdutos();
    }, []);
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Visualizar Informações do Produto</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/cadastrarproduto"
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
                                        <Link to={"/produto/" + item.id + "/compra"}
                                            className="btn btn-outline-primary btn-sm m-auto">
                                            Consultar Compras
                                        </Link>
                                        <Link to={"/editarproduto/" + item.id}
                                            className="btn btn-outline-warning btn-sm m-auto">
                                            Editar Produto
                                        </Link>
                                        <span className="btn btn-outline-danger btn-sm m-auto"
                                            onClick={() => excluirProduto(item.id)}>
                                            Excluir Produto
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