import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
import { useEffect } from "react";

export const EditarServ = (props) => {
    const [data, setData] = useState([]);
    const [id, setid] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const editServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/editarservico/" + id, { nome, descricao }, { headers })
            .then((response) => {
                console.log(response.data.error);
                console.log(response.data.message);
                if (response.data.error) {
                    setStatus({
                        formSave: false,
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        formSave: false,
                        type: 'success',
                        message: response.data.message
                    });
                }
            }).catch(() => {
                setStatus({
                    formSave: false,
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };
    useEffect(() => {
        const getServicos = async () => {
            await axios.get(api + "/listarServico/" + id)
                .then((response) => {
                    setNome(response.data.serv.nome);
                    setDescricao(response.data.serv.descricao);
                })
                .catch(() => {
                    console.log("Erro: Não foi possivel conectar a API")
                })
        }
        getServicos();
    }, [id]);
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Serviços</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-servico"
                        className="btn btn-outline-success">Voltar</Link>
                </div>
            </div>
            <hr className='m-1' />

            {status.type === "error" ?
                <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === "success" ?
                <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={editServico}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do serviço"
                        value={nome} onChange={e => setNome(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Descrição</Label>
                    <Input type="text" name="descricao" placeholder="Descrição do Serviço"
                        value={descricao} onChange={e => setDescricao(e.target.value)} />
                </FormGroup>

                {status.formSave ?
                    <Button type="submit" outline color="warning" disabled>Salvando...
                        <Spinner color="warning" /></Button> :
                    <Button type="submit" outline color="warning">Salvar</Button>}
            </Form>
        </Container>
    );
};