import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const CadastrarItemped = (props)=>{

    const [itemped, setItemped] = useState({
        ServicoId: '',
        quantidade: '',
        valor: ''
    });

    const [id, setid] = useState(props.match.params.id);
    
    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemped({
        ...itemped,[e.target.name]: e.target.value        
    });   

    const cadItemped = async e =>{
        e.preventDefault();
        console.log(itemped);

        const headers = {
            'Content-Type': 'application/json'
        }
        console.log(id);

        await axios.post(api+"/pedido/item/"+ id,itemped,{headers})
        .then((response)=>{            
            if (response.data.erro){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
            }
        })
        .catch(()=>{
            console.log("Erro: sem conexão com a API.")
        });
    };
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar ItemPedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-pedido"
                        className="btn btn-outline-success">Voltar</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === "error" ? 
            <Alert color="danger">{status.message}</Alert>: ""}

            {status.type === 'success' ? <Alert color='success'>{status.message}</Alert>: ""}

            <Form className="p-2" onSubmit={cadItemped}>
                <FormGroup className="p-2">
                    <Label>ID do Serviço</Label>
                    <Input type="text" name="ServicoId" placeholder="Digite o ID do serviço" 
                    onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    <Input type="text" name="quantidade" placeholder="Quantidade deste Serviço" 
                    onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Valor</Label>
                    <Input type="float" name="valor" placeholder="Valor do Serviço" 
                    onChange={valorInput}/>
                </FormGroup> 

                <Button className="separaBot p-2" type="submit" outline color="success">Cadastrar</Button>
                <Button className="p-2" type="reset" outline color="success">Limpar</Button>
            </Form>
        </Container>

    )
}