import '../styles/CadastroEstabelecimento.css';
import { Form, FormControl,  } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ChangeEvent, useState,  } from 'react';


function CadastroEstabelecimento() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      razao_social: '',
      nome_fantasia: '',
      email: '',
      senha: '',
      cpfCnpj: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      regiao: '',
      telefone: '',
      tipo: '',
      volumeMes: '',
    });
  
    const fieldsPerStep = 5;
    const [showFields, setShowFields] = useState(true);
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleNextStep = () => {
        if (step * fieldsPerStep < 15) {
          setStep(step + 1);
          setShowFields(false);
          setTimeout(() => {
            setShowFields(true);
          }, 250);
        } else {
          console.log('Formulário enviado:', formData);

        }
    };
  
    const renderInputs = () => {
      const startIndex = (step - 1) * fieldsPerStep;
      const endIndex = Math.min(startIndex + fieldsPerStep, 15);
      const inputFields = [];
  
      for (let i = startIndex; i < endIndex; i++) {
        let label = '';
        let placeholder = '';
  
        switch (i) {
          case 0:
            label = 'Razão Social/Nome do responsável';
            placeholder = 'Digite a Razão Social/Nome do responsável';
            break;
          case 1:
            label = 'Nome Fantasia';
            placeholder = 'Digite o Nome Fantasia';
            break;
          case 2:
            label = 'Email';
            placeholder = 'Digite o Email';
            break;
          case 3:
            label = 'Senha';
            placeholder = 'Digite a Senha';
            break;
          case 4:
            label = 'CNPJ/CPF';
            placeholder = 'Digite o CNPJ/CPF';
            break;
          case 5:
            label = 'Logradouro';
            placeholder = 'Digite o Logradouro';
            break;
          case 6:
            label = 'Número';
            placeholder = 'Digite o Número';
            break;
          case 7:
            label = 'Bairro';
            placeholder = 'Digite o Bairro';
            break;
          case 8:
            label = 'Cidade';
            placeholder = 'Digite a Cidade';
            break;
          case 9:
            label = 'Estado';
            placeholder = 'Digite o Estado';
            break;
          case 10:
            label = 'CEP';
            placeholder = 'Digite o CEP';
            break;
          case 11:
            label = 'Região';
            placeholder = 'Digite a Região';
            break;
          case 12:
            label = 'Telefone';
            placeholder = 'Digite o Telefone';
            break;
          case 13:
            label = 'Tipo';
            break;
          case 14:
            label = "Volume Comercializado no Mês";
            placeholder = "Digite o Volume em Litros";
            break
          default:
            break;
        }
  
        if (i === 13) {
          inputFields.push(
            <Form.Group key={i} controlId={`campo-${i}`}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                as='select'
                name={`campo-${i}`}
                required
                className='form-control-cadastro-estabelecimento'
                onChange={handleInputChange}
              >
                <option value=''>Selecione o tipo</option>
                <option value='Cooperativas'>Cooperativas</option>
                <option value='Profissional individual'>Profissional individual</option>
                <option value='Reciclagem'>Reciclagem</option>
                <option value='Restaurantes'>Restaurantes</option>
                <option value='Condomínio'>Condomínio</option>
                <option value='Residência'>Residência</option>
                <option value='Estabelecimento em geral'>Estabelecimento em geral</option>
                <option value='Outros'>Outros</option>
              </Form.Control>
            </Form.Group>
          );
        } else {
          inputFields.push(
            <Form.Group key={i} controlId={`campo-${i}`}>
              <Form.Label>{label}</Form.Label>
              <FormControl
                type='text'
                name={`campo-${i}`}
                required
                placeholder={placeholder}
                className='form-control-cadastro-estabelecimento'
                onChange={handleInputChange}
              />
            </Form.Group>
          );
        }
      }
  
      return inputFields.map((field, index) => (
            <div key={index} className={`form-group-transition ${showFields ? '' : 'hidden'}`}>
            {field}
            </div>
        ));
    };
  
    return (
      <div className='container-geral-cadastro-estabelecimento'>
        <div className='container-janela-cadastro-estabelecimento'>
          <div className='container-esquerda-cadastro-estabelecimento'>
            <span className='logo-cadastro-estabelecimento'>
              <img src='logo-greenneat.png' alt='' />
            </span>
          </div>
          <div className='container-direita-cadastro-estabelecimento'>
            <div>
              <span className='titulo-cadastro-estabelecimento'>
                <h1>Cadastro Estabelecimento</h1>
              </span>
            </div>
            <div className='campo-cadastro-estabelecimento'>
              {renderInputs()}
              <div className='botao-cadastro-estabelecimento'>
                {step * fieldsPerStep < 15 ? (
                  <Button
                    variant='success'
                    onClick={handleNextStep}
                  >
                    Continuar
                  </Button>
                ) : (
                  <Button style={{fontSize: 18}}
                    variant='success'
                    onClick={handleNextStep}
                  >
                    CADASTRAR
                  </Button>
                )}
              </div>
            </div>
            <div className='registro-cadastro-estabelecimento'>
              <p>Voltar para a página de <a href='#'>Login</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default CadastroEstabelecimento;