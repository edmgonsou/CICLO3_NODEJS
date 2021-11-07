import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
import { useEffect } from "react";

export const EditarPedid = (props) => {
    const [data, setData] = useState([]);
    const [id, setid] = useState(props.match.params.id);
    const [dataPedido, setDataPedido] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });


    const editPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/editarpedido/" + id, { dataPedido, ClienteId }, { headers })
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
        const getPedidos = async () => {
            await axios.get(api + "/listarpedido/" + id)
                .then((response) => {
                    setDataPedido(response.data.ped.dataPedido);
                    setClienteId(response.data.ped.ClienteId);
                }).catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: sem conexão com a API.'
                    })
                });
        };

        getPedidos();
    }, [id]);
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-pedido"
                        className="btn btn-outline-success">Voltar</Link>
                </div>
            </div>
            <hr className='m-1' />

            {status.type === "error" ?
                <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === "success" ?
                <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={editPedido}>
                <FormGroup className="p-2">
                    <Label>Data do Pedido</Label>
                    <Input type="text" name="dataPedido" placeholder="Data do Pedido"
                        value={dataPedido} onChange={e => setDataPedido(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>ClienteId</Label>
                    <Input type="text" name="ClienteId" placeholder="Id do Cliente"
                        value={ClienteId} onChange={e => setClienteId(e.target.value)} />
                </FormGroup>

                {status.formSave ?
                    <Button type="submit" outline color="warning" disabled>Salvando...
                        <Spinner color="warning" /></Button> :
                    <Button type="submit" outline color="warning">Salvar</Button>}
            </Form>
        </Container>
    );
};