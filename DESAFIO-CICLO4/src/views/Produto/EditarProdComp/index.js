import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
import { useEffect } from "react";

export const EditarProdComp = (props) => {
    const [data, setData] = useState([]);
    const [id, setid] = useState(props.match.params.id);
    const [CompraId, setCompraId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const editProdComp = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/editaritem/produto/" + id, { CompraId, quantidade, valor }, { headers })
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
        const getProdutos = async () => {
            await axios.get(api + "/produto/" + id + "/compra")
                .then((response) => {
                    setCompraId(response.data.item.CompraId);
                    setQuantidade(response.data.item.quantidade);
                    setValor(response.data.item.valor);
                })
                .catch(() => {
                    console.log("Erro: Não foi possivel conectar a API")
                })
        }
        getProdutos();
    }, [id]);
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar item Produto</h1>
                </div>
                <div className="p-2">
                    <Link to={"/produto/" + id + "/compra"}
                        className="btn btn-outline-success">Voltar</Link>
                </div>
            </div>
            <hr className='m-1' />

            {status.type === "error" ?
                <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === "success" ?
                <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={editProdComp}>
                <FormGroup className="p-2">
                    <Label>CompraId</Label>
                    <Input type="text" name="CompraId" placeholder="ID da Compra"
                        value={CompraId} onChange={e => setCompraId(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    <Input type="text" name="quantidade" placeholder="Quantidade do Item"
                        value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Valor</Label>
                    <Input type="text" name="valor" placeholder="Valor do serviço"
                        value={valor} onChange={e => setValor(e.target.value)} />
                </FormGroup>

                {status.formSave ?
                    <Button type="submit" outline color="warning" disabled>Salvando...
                        <Spinner color="warning" /></Button> :
                    <Button type="submit" outline color="warning">Salvar</Button>}
            </Form>
        </Container>
    );
};