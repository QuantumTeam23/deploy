import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import NavbarCompraCredito from "../Navbars/NavbarCompraCredito";
import { useState } from "react";
import TransacaoPopup from "./TransacaoCPopup";
import Footer from "../Footer/Footer";

function TransacaoCompraCredito() {

  const [popupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };


  return (
    <>
      <NavbarCompraCredito />
      <div className="container" style={{ marginTop: "5%", width: "60%" }}>
        <div className="campo-inserir-valor">
          <div style={{ marginBottom: "3%" }}>
            <h3>Informe a quantidade de créditos Greenneat que deseja comprar:</h3>
          </div>
          <Form.Group
            controlId="campo-valor"
            style={{ marginBottom: "3%" }}
          >
            <InputGroup className="form-control-transacao-compra" >
              <FormControl
                type="campo-valor"
                required
                placeholder="Ex: 1.5"
                aria-label="campo-valor"
                aria-describedby="campo-valor-addon"
                style={{ backgroundColor: "#ddffda" }}
              />
            </InputGroup>
          </Form.Group>

          <div style={{ textAlign: "center" }}>
            <Button
              style={{ fontSize: 18, marginRight: "2%" }}
              variant="success"
              onClick={handleOpenPopup}
            >
              Confirmar
            </Button>
            <Button style={{ fontSize: 18 }} variant="success">
              Voltar
            </Button>
          </div>
        </div>
      </div>

      <Footer />
      {popupOpen && (
        <TransacaoPopup open={popupOpen} onClose={handleClosePopup} />
      )}
    </>
  );
}
export default TransacaoCompraCredito;
