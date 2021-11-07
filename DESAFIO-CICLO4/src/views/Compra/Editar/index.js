import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
import { useEffect } from "react";

export const EditarCompra = (props) => {
    const [data, setData] = useState([]);
    const [id, setid] = useState(props.match.params.id);
    const [dataCompra, setDataCompra] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const editCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/editarCompra/" + id, { dataCompra, ClienteId }, { headers })
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
        const getCompras = async () => {
            await axios.get(api + "/listarcompra/" + id)
                .then((response) => {
                    setDataCompra(response.data.comp.dataCompra);
                    setClienteId(response.data.comp.ClienteId);
                }).catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: sem conexão com a API.'
                    })
                });
        };
        getCompras();
    }, [id]);
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listarcompra"
                        className="btn btn-outline-success">Voltar</Link>
                </div>
            </div>
            <hr className='m-1' />

            {status.type === "error" ?
                <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === "success" ?
                <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={editCompra}>
                <FormGroup className="p-2">
                    <Label>Data da Compra</Label>
                    <Input type="text" name="dataCompra" placeholder="Data da Compra"
                        value={dataCompra} onChange={e => setDataCompra(e.target.value)} />
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

}