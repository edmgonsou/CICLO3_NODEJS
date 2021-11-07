import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
import { useEffect } from "react";

export const EditarItem = (props) => {
    const [data, setData] = useState([]);
    const [id, setid] = useState(props.match.params.id);
    const [quantidade, setQuantidade] = useState();
    const [ServicoId, setServicoId] = useState();
    const [valor, setValor] = useState();    

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const editItemPed = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/editaritem/pedidos/" + id, { quantidade, ServicoId, valor }, { headers })
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
        const getItensPed = async () => {
            await axios.get(api + "/listaItemPed/" + id)            
                .then((response) => {                   
                  
                    var length = response.data.item.length;
                    console.log(length);

                    var indic = response.data.item.map(function (ped, indice) {
                        return indice;
                    });
                    console.log(indic);

                    setQuantidade(response.data.item.find(quantidade => quantidade).quantidade);
                    setServicoId(response.data.item.find(ServicoId => ServicoId).ServicoId);
                    setValor(response.data.item.find(valor => valor).valor);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: "Erro: sem conexão com a API."
                    })
                });
        };
        getItensPed();
    }, [id]);
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Item Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to={"/listaItemPed/" + id}
                        className="btn btn-outline-success btn-sm separaBot">Voltar</Link>
                </div>
            </div>
            <hr className='m-1' />

            {status.type === "error" ?
                <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === "success" ?
                <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={editItemPed}>

                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    <Input type="text" name="quantidade" placeholder="Quantidade do Serviço"
                        value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>ServicoId</Label>
                    <Input type="text" name="ServicoId" placeholder="Id do serviço"
                        value={ServicoId} onChange={e => setServicoId(e.target.value)} />
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