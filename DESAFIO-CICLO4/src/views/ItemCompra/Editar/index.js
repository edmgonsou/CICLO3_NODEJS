import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
import { useEffect } from "react";

export const EditarItemCompra = (props) => {
    console.log(props);
    const [data, setData] = useState([]);
    const [id, setid] = useState(props.match.params.id);
    const [quantidade, setQuantidade] = useState();
    const [ProdutoId, setProdutoId] = useState();
    const [valor, setValor] = useState();

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const editItemComp = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/editaritem/compra/" + id, { quantidade, ProdutoId, valor }, { headers })
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
        const getItensComp = async () => {
            await axios.get(api + "/listaItemComp/" + id)
                .then((response) => {
                    setQuantidade(response.data.item.quantidade);
                    setProdutoId(response.data.item.ProdutoId);
                    setValor(response.data.item.valor);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: "Erro: sem conexão com a API."
                    })
                });
        };
        getItensComp();
    }, [id]);
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Item Compra</h1>
                </div>
                <div className="p-2">
                    <Link to={"/listaItemComp/" + id}
                        className="btn btn-outline-success btn-sm separaBot">Voltar</Link>
                </div>
            </div>
            <hr className='m-1' />

            {status.type === "error" ?
                <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === "success" ?
                <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={editItemComp}>

                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    <Input type="text" name="quantidade" placeholder="Quantidade do Serviço"
                        value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>ProdutoId</Label>
                    <Input type="text" name="ProdutoId" placeholder="Id do serviço"
                        value={ProdutoId} onChange={e => setProdutoId(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Valor</Label>
                    <Input type="text" name="valor" placeholder="Valor do servico"
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