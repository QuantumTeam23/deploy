import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Tab from "react-bootstrap/Tab";
import { Form, FormControl } from "react-bootstrap";
import "../styles/ComparadorDePreco.css";
import "../styles/Grafico.css";
import Grafico from "../Graficos/Grafico";

import Footer from "../Footer/Footer";
import ApexCharts from "react-apexcharts";
import { Divider } from "@mui/material";
import NavbarAdministrador from "../Navbars/NavbarAdministrador";

function ComparadorPrecos() {
  return (
    <>
      <Row>
        <NavbarAdministrador />
      </Row>
      <Row className="" style={{ width: "flex", alignContent: "center" }}>
        <Container
          style={{ alignItems: "center", marginTop: "2%", padding: "2%" }}
        >
          <Row>
            <Col sm={3} style={{ textAlign: "center", paddingTop: "2%" }}>
              <Form.Label
                className="campos-textos"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h5>Região</h5>
              </Form.Label>
              <Button
                size="lg"
                style={{ width: "100%", marginBottom: "2%", marginLeft: "1%" }}
                className="botao"
                id="BotaoRegiaoNorte"
              >
                Norte
              </Button>
              <Button
                size="lg"
                style={{ width: "100%", marginBottom: "2%", marginLeft: "1%" }}
                className="botao"
                id="BotaoRegiaoSul"
              >
                Sul
              </Button>
              <Button
                size="lg"
                style={{ width: "100%", marginBottom: "2%", marginLeft: "1%" }}
                className="botao"
                id="BotaoRegiaoSuldeste"
              >
                Suldeste
              </Button>
              <Button
                size="lg"
                style={{ width: "100%", marginBottom: "2%", marginLeft: "1%" }}
                className="botao"
                id="BotaoRegiaoCentroOeste"
              >
                Centro-oeste
              </Button>
              <Button
                size="lg"
                style={{ width: "100%", marginBottom: "2%", marginLeft: "1%" }}
                className="botao"
                id="BotaoNordeste"
              >
                Nordeste
              </Button>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Form.Group controlId="card-preco-oleo-virgem">
                    <Form.Label
                      className="campos-textos"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>Óleo Virgem</h5>
                    </Form.Label>
                    <FormControl
                      placeholder="R$5,00/L"
                      type="preco-oleo-virgem"
                      name="preco-oleo-virgem"
                      className="cor-cards"
                      id="valorOleoVirgem"
                      style={{
                        height: "10vh",
                        textAlign: "center",
                        fontFamily: "Oswald",
                        fontSize: "1.8em",
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="card-preco-oleo-fritura">
                    <Form.Label
                      className="campos-textos"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>Óleo de Fritura</h5>
                    </Form.Label>
                    <FormControl
                      placeholder="R$7,49/L"
                      type="preco-oleo-fritura"
                      name="preco-oleo-fritura"
                      className="cor-cards"
                      id="valorOleoFritura"
                      style={{
                        height: "10vh",
                        textAlign: "center",
                        fontFamily: "Oswald",
                        fontSize: "1.8em",
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="card-preco-credito-greenneat">
                    <Form.Label
                      className="campos-textos"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>Crédito Greenneat</h5>
                    </Form.Label>
                    <FormControl
                      placeholder="$2,49/L"
                      type="preco-credito-greenneat"
                      name="preco-credito-greenneat"
                      className="cor-cards"
                      id="valorCreditoGreenneat"
                      style={{
                        height: "10vh",
                        textAlign: "center",
                        fontFamily: "Oswald",
                        fontSize: "1.8em",
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col
                  sm={6}
                  className="size-grafic-bar"
                  style={{ marginTop: "2%", alignContent: "center" }}
                >
                  <Grafico />
                </Col>
                <Col style={{ marginTop: "2%", minWidth: "45vh" }}>
                  <Form.Group controlId="card-preco-preco-medio">
                    <Form.Label
                      className="campos-textos"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "11vh",
                        margin: ""
                      }}
                    >
                      <div>
                        <h5>Preço Médio</h5>
                        <p>Região Norte</p>
                      </div>
                    </Form.Label>
                    <FormControl
                      placeholder="$2,49/L"
                      type="preco-credito-greenneat"
                      name="preco-credito-greenneat"
                      className="cor-cards"
                      id="valorPrecoMedio"
                      style={{
                        height: "35vh",
                        textAlign: "center",
                        fontFamily: "Oswald",
                        fontSize: "4.2em",
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
      <Footer />
    </>
  );
}

export default ComparadorPrecos;
