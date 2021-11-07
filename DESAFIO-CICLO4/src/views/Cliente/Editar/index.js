import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
import { useEffect } from "react";

export const EditarCli = (props) => {
    const [data, setData] = useState([]);
    const [id, setid] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [clienteDesde, setClienteDesde] = useState('')

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const editCliente = async e => {
        e.preventDefault();
        
        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/editarcliente/" + id, { nome, endereco, cidade, uf, nascimento, clienteDesde }, { headers })
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
        const getCliente = async () => {
            await axios.get(api + "/cliente/" + id)
                .then((response) => {
                    setNome(response.data.serv.nome);
                    setEndereco(response.data.serv.endereco);
                    setCidade(response.data.serv.cidade);
                    setUf(response.data.serv.uf);
                    setNascimento(response.data.serv.nascimento);
                    setClienteDesde(response.data.serv.clienteDesde);
                })
                .catch(() => {
                    console.log("Erro: Não foi possivel conectar a API")
                })
        }
        getCliente();
    }, [id]);
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Clientes</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente"
                        className="btn btn-outline-success">Voltar</Link>
                </div>
            </div>
            <hr className='m-1' />

            {status.type === "error" ?
                <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === "success" ?
                <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={editCliente}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do cliente"
                        value={nome} onChange={e => setNome(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Endereço</Label>
                    <Input type="text" name="endereco" placeholder="Endereço completo"
                        value={endereco} onChange={e => setEndereco(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Cidade</Label>
                    <Input type="text" name="cidade" placeholder="Cidade"
                        value={cidade} onChange={e => setCidade(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>UF</Label>
                    <Input type="text" name="uf" placeholder="Estado"
                        value={uf} onChange={e => setUf(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Data de nascimento</Label>
                    <Input type="date" name="nascimento" placeholder="Data de Nascimento"
                        value={nascimento} onChange={e => setNascimento(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Cliente Desde</Label>
                    <Input type="date" name="clienteDesde" placeholder="Data Cliente desde"
                        value={clienteDesde} onChange={e => setClienteDesde(e.target.value)} />
                </FormGroup >
                {status.formSave ?
                    <Button type="submit" outline color="warning" disabled>Salvando...
                        <Spinner color="warning" /></Button> :
                    <Button type="submit" outline color="warning">Salvar</Button>}
            </Form>
        </Container>
    );
};