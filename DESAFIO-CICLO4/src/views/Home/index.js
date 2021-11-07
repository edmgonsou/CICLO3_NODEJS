import fotoes from './imagem/fotoes.jpg';
import logo from './imagem/logo.jpg';
import swtc from './imagem/swtch.jpg';
import accpoint from './imagem/accpoin.jpg';

import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
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
                            <h1 className="p-2">TIC Services</h1>
                            <h5 className="p-2">Aproximando você às inovações tecnologicas</h5>
                        </div>
                        <div className="p-2">
                            <h6 className="p-2">Fale conosco:</h6>
                            <h6 className="p-2">contato@ticservicesbrasil.com.br</h6>
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
                                    <NavLink href="/listarcompra">COMPRAS</NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                        <div>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/listarproduto">PRODUTO</NavLink>
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
                            <CardBody className="alinhaText">
                                <CardImg src={swtc} />
                                <CardTitle tag="h5">Hub Switch Tp-link</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
                                <CardText>Switch de Mesa de 16 Portas RJ45 de 10/100Mpbs. suporta Auto MDI/MDIX. Controle de fluxo IEEE 802.3x.</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="tamanho m-auto">
                        <Card>
                            <CardBody className="alinhaText">
                                <CardImg src={accpoint} />
                                <CardTitle tag="h5">Access Pointer</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Intelbras ACtion RG1200</CardSubtitle>
                                <CardText>Sinal Contínuo, conexão sem fio e grande alcance e estabilidade.</CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className=" d-flex tamanho">
                    <CardImg src={fotoes} />
                </div>
            </div>
            <footer className="d-flex bg-dark">
                <h5 className="m-auto">Copyright © 2021 TI Academy | Radiant Business by Firefly Themes</h5>
            </footer>
        </div>
    );
};
