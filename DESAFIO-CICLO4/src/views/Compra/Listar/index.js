import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarComp = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras = async () => {
        await axios.get(api + "/listarcompra")
            .then((response) => {
                setData(response.data);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
            });
    };
    const excluirCompra = async (id) => {
        console.log(id)
        const headers = {
            'Content-Type': 'application.json'
        };
        await axios.delete(api + "/excluircompra/" + id, { headers })
            .then((response) => {
                console.log(response.data.error);
                getCompras();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: Sem conexão com a API."
                });
            });
    }
    useEffect(() => {
        getCompras();
    }, []);
    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className="m-auto p-2">
                        <h1>Visualizar Informações de Compra</h1>
                    </div>
                    <div className="p-2 float-left">
                        <Link to="/CadCompraCli"
                            className="btn btn-outline-primary btn-sm">Cadastrar Compra</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Data da Compra</th>
                            <th>ClienteId</th>
                            <th>Data da Criação</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.dataCompra}</td>
                                <td>{item.ClienteId}</td>
                                <td>{item.createdAt}</td>
                                <td>
                                    <div className="d-flex p-2">
                                        <Link to={"/listaItemComp/" + item.id}
                                            className="btn btn-outline-primary btn-sm m-auto">
                                            Consultar item da Compra
                                        </Link>
                                        <Link to={"/cadastrarItem/compra/" + item.id}
                                            className="btn btn-outline-dark btn-sm m-auto">
                                            Cadastrar Item da Compra
                                        </Link>
                                        <Link to={"/editarCompra/" + item.id}
                                            className="btn btn-outline-warning btn-sm m-auto">
                                            Editar Compra
                                        </Link>
                                        <span className="btn btn-outline-danger btn-sm m-auto"
                                            onClick={() => excluirCompra(item.id)}>
                                            Excluir Compra
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