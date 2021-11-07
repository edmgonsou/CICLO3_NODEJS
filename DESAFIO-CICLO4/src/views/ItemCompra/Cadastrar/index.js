import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const CadastrarItemCompra = (props) => {

    const [itemComp, setItemComp] = useState({
        ProdutoId: '',
        quantidade: '',
        valor: ''
    });

    const [id, setid] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemComp({
        ...itemComp, [e.target.name]: e.target.value
    });

    const cadItemComp = async e => {
        e.preventDefault();
        console.log(itemComp);

        const headers = {
            'Content-Type': 'application/json'
        }
        console.log(id);

        await axios.post(api + "/cadastrarItem/compra/" + id, itemComp, { headers })
            .then((response) => {
                if (response.data.erro) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                }
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            });
    };
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Itens da Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listarcompra"
                        className="btn btn-outline-success">Voltar</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === "error" ?
                <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color='success'>{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadItemComp}>
                <FormGroup className="p-2">
                    <Label>ID do Produto</Label>
                    <Input type="text" name="ProdutoId" placeholder="Digite o ID do produto"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    <Input type="text" name="quantidade" placeholder="Quantidade deste item"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Valor</Label>
                    <Input type="float" name="valor" placeholder="Valor do Produto"
                        onChange={valorInput} />
                </FormGroup>

                <Button className="separaBot p-2" type="submit" outline color="success">Cadastrar</Button>
                <Button className="p-2" type="reset" outline color="success">Limpar</Button>
            </Form>
        </Container>

    )
}