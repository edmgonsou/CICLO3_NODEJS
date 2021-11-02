import Time from './imagem/Time.jpg';
import logo from './imagem/logo.jpg';
import bolsa from './imagem/turma1.jpg';
import tistart from './imagem/tistart.jpg';

import { Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import {   
    Navbar,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

export const Home = () => {
    return (
        <div>
            <div className="imagemHome">
            <Container>
                <div className="d-flex alinhaCent">
                    <div className="alinhaLeft p-2">
                        <CardImg className="alinhaLeft p-2" src={logo} />
                    </div>
                    <div className=" p-2">
                        <h1 className="p-2">TI Academy</h1>
                        <h5 className="p-2">Preparar e inserir profissionais de TI no Mercado</h5>
                    </div>
                    <div className="p-2">
                    <h6 className="p-2">Fale conosco:</h6>
                    <h6 className="p-2">contato@tiacademybrasil.com.br</h6>
                        
                        {/* <div className="p-2">
                            <a href="/listar-cliente" className="btn btn-outline-success btn-sm">Cliente</a>
                        </div>
                        <div className="p-2">
                            <a href="/listar-pedido" className="btn btn-outline-success btn-sm">Pedido</a>
                        </div>
                        <div className="p-2">
                            <a href="/listar-servico" className="btn btn-outline-success btn-sm">Serviço</a>
                        </div> */}
                    </div>
                </div>
            </Container>
            </div>
            <div id="botaoHome">
               
                    <Navbar color="ligth" dark expand="md">
                        <Container className='d-flex alinhaCent m-auto'>
                        <div>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink href="/listar-cliente">CLIENTES</NavLink>
                                </NavItem>
                            </Nav>
                            </div>
                            <div>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/listar-pedido">PEDIDOS</NavLink>
                                </NavItem>
                            </Nav>
                            </div>
                            <div>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/listar-servico">SERVIÇOS</NavLink>
                                </NavItem>
                            </Nav>
                            </div>
                            <div>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/listar-servico">COMPRAS</NavLink>
                                </NavItem>
                            </Nav>
                            </div>
                            <div>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/listar-servico">PRODUTO</NavLink>
                                </NavItem>
                            </Nav>
                            </div>
                        </Container>
                    </Navbar>                   
            </div>
            <div className="d-flex align-items-center">
                <div className="d-flex  tamanho">
                    <div className="tamanho m-auto">
                        <Card>
                            <CardBody>
                                <CardImg src={bolsa} />
                                <CardTitle tag="h5">SBM Academy:Bolsa</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Turma 5</CardSubtitle>
                                <CardText className="alinhaText">Início em Novembro/21. É importante a leitura atenta ao Edital 01/2021 do Processo Seletivo.</CardText>

                            </CardBody>
                        </Card>
                    </div>
                    <div className="tamanho m-auto">
                        <Card>
                            <CardBody>
                                <CardImg src={tistart} />
                                <CardTitle tag="h5">Turma 5 - 2021</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">INSCREVA-SE JÁ!</CardSubtitle>
                                <CardText className="alinhaText">O ciclo de aprendizagem do programa de qualificação TI Start é dividido em 4 etapas.</CardText>

                            </CardBody>
                        </Card>
                    </div>


                </div>
                <div className=" d-flex tamanho">
                    <CardImg src={Time} />
                </div>

            </div>
            <footer className="d-flex bg-dark">
                <h4 className="m-auto" ><Badge color="secondary">Copyright © 2021 TI Academy | Radiant Business by Firefly Themes</Badge></h4>
            </footer>
        </div>
    );
};
