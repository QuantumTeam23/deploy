import '../styles/CadastroParceiro.css';
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ChangeEvent, useState } from 'react';
import Alert from 'react-bootstrap/Alert';


interface FormData {
  razao_social: string;
  nome_fantasia: string;
  email: string;
  senha: string;
  cnpj: string;
  logradouro: string;
  logradouroNumero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  regiao: string;
  telefone: string;
  volume: string;
  tipo: string;
  showEmptyFieldsAlert: boolean;
  cadastrado: boolean;
  cnpjEmUso: boolean;
}

function CadastroParceiro() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    razao_social: '',
    nome_fantasia: '',
    email: '',
    senha: '',
    cnpj: '',
    logradouro: '',
    logradouroNumero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    regiao: '',
    telefone: '',
    tipo: '',
    volume: '',
    showEmptyFieldsAlert: false,
    cadastrado: false,
    cnpjEmUso: false,
  });

  const {
    razao_social,
    nome_fantasia,
    email,
    senha,
    cnpj,
    logradouro,
    logradouroNumero,
    bairro,
    cidade,
    estado,
    cep,
    regiao,
    telefone,
    tipo,
    volume,
    showEmptyFieldsAlert,
    cadastrado,
    cnpjEmUso,
  } = formData;

  const fieldsPerStep = 5;
  const [showFields, setShowFields] = useState(true);

  const fieldMappings: Record<string, string> = {
    'campo-0': 'razao_social',
    'campo-1': 'nome_fantasia',
    'campo-2': 'email',
    'campo-3': 'senha',
    'campo-4': 'cnpj',
    'campo-5': 'logradouro',
    'campo-6': 'logradouroNumero',
    'campo-7': 'bairro',
    'campo-8': 'cidade',
    'campo-9': 'estado',
    'campo-10': 'cep',
    'campo-11': 'regiao',
    'campo-12': 'telefone',
    'campo-13': 'tipo',
    'campo-14': 'volume',
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = fieldMappings[name] || name; 
    setFormData({ ...formData, [fieldName]: value });
  }


  const handleNextStep = () => {
    if (step * fieldsPerStep < 15) {
      setStep(step + 1);
      setShowFields(false);
      setTimeout(() => {
        setShowFields(true);
      }, 250);
    }
    else {
      console.log('Formulário enviado:', formData);
    }
  };
  
  const handleSubmit = async () => {
    if (!isFormValid()) {
      setFormData({ ...formData, showEmptyFieldsAlert: true });
      return; 
    }
    try {
      const response = await fetch('http://localhost:3001/addParceiro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razao_social,
          nome_fantasia,
          email,
          senha,
          cnpj,
          logradouro,
          logradouroNumero,
          bairro,
          cidade,
          estado,
          cep,
          regiao,
          telefone,
          tipo,
          volume,
        }),
      });

      if (response.status === 200) {
        console.log('Parceiro cadastrado com sucesso!');
        setFormData((prevState) => ({
          ...prevState,
          cadastrado: true,
        }));
        setTimeout(() => {
          setFormData((prevState) => ({
            ...prevState,
            cadastrado: false,
          }));
        }, 10000);
  
        window.location.reload();
      }  else if (response.status === 409) {
        console.log('Existe um parceiro com esse CNPJ.');
        setFormData({ ...formData, cnpjEmUso: true });
        console.log('cnpjEmUso:', formData.cnpjEmUso);
        setTimeout(() => {
          setFormData((prevState) => ({
            ...prevState,
            cnpjEmUso: false,
          }));
        }, 5000);
      } else {
        console.error('Erro ao cadastrar parceiro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar parceiro:', error);
    }

    console.log('Formulário enviado:', formData);
  };


  const isFormValid = () => {
    return razao_social !== '' && nome_fantasia !== '' && email !== '' && senha !== '' && cnpj !== '' && logradouro !== '' && logradouroNumero !== '' && bairro !== '' && cidade !== '' && estado !== '' && cep !== ''
      && regiao !== '' && tipo !== '' && volume !== '';
  };

  const renderInputs = () => {
    const startIndex = (step - 1) * fieldsPerStep;
    const endIndex = Math.min(startIndex + fieldsPerStep, 15);
    const inputFields = [];

    for (let i = startIndex; i < endIndex; i++) {
      let label = '';
      let placeholder = '';
      let name = '';

      switch (i) {
        case 0:
          label = 'Razão Social/Nome do responsável';
          placeholder = 'Digite a Razão Social/Nome do responsável';
          name = 'razao_social';
          break;
        case 1:
          label = 'Nome Fantasia';
          placeholder = 'Digite o Nome Fantasia';
          name = 'nome_fantasia';
          break;
        case 2:
          label = 'Email';
          placeholder = 'Digite o Email';
          name = 'email';
          break;
        case 3:
          label = 'Senha';
          placeholder = 'Digite a Senha';
          name = 'senha';
          break;
        case 4:
          label = 'CNPJ/CPF';
          placeholder = 'Digite o CNPJ/CPF';
          name = 'cnpj';
          break;
        case 5:
          label = 'Logradouro';
          placeholder = 'Digite o Logradouro';
          name = 'logradouro';
          break;
        case 6:
          label = 'Número';
          placeholder = 'Digite o Número';
          name = 'logradouroNumero';
          break;
        case 7:
          label = 'Bairro';
          placeholder = 'Digite o Bairro';
          name = 'bairro';
          break;
        case 8:
          label = 'Cidade';
          placeholder = 'Digite a Cidade';
          name = 'cidade';
          break;
        case 9:
          label = 'Estado';
          placeholder = 'Digite o Estado';
          name = 'estado';
          break;
        case 10:
          label = 'CEP';
          placeholder = 'Digite o CEP';
          name = 'cep';
          break;
        case 11:
          label = 'Região';
          placeholder = 'Digite a Região';
          name = 'regiao';
          break;
        case 12:
          label = 'Telefone';
          placeholder = 'Digite o Telefone';
          name = 'telefone';
          break;
        case 13:
          label = 'Tipo';
          name = 'tipo';
          break;
        case 14:
          label = 'Volume Coletado no Mês';
          placeholder = 'Digite o Volume em Litros';
          name = 'volume';
          break;
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
              className='form-control-cadastro-parceiro'
              onChange={handleInputChange}
            >
              <option value=''>Selecione o tipo</option>
              <option value='Restaurantes'>Restaurantes</option>
              <option value='Condomínios'>Condomínios</option>
              <option value='Lanchonetes'>Lanchonetes</option>
              <option value='Shoppings'>Shoppings</option>
              <option value='Residências'>Residências</option>
              <option value='Cooperativas'>Cooperativas</option>
              <option value='Profissional individual'>Profissional individual</option>
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
              className='form-control-cadastro-parceiro'
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
    <div className='container-geral-cadastro-parceiro'>
      <div className='container-janela-cadastro-parceiro'>
        <div className='container-esquerda-cadastro-parceiro'>
          <span className='logo-cadastro-parceiro'>
            <img src='logo-greenneat.png' alt='' />
          </span>
        </div>
        <div className='container-direita-cadastro-parceiro'>
          {showEmptyFieldsAlert && (
            <Alert variant="danger">Preencha todos os campos do formulário.</Alert>
          )}
          {cadastrado && (
            <Alert variant="success">Parceiro cadastrado com sucesso!!</Alert>
          )}
          {cnpjEmUso && (
            <Alert variant="danger">Já existe um parceiro com esse cnpj.</Alert>
          )}
          <div>
            <span className='titulo-cadastro-parceiro'>
              <h1>Cadastro Parceiro</h1>
            </span>
          </div>
          <div className='campo-cadastro-parceiro'>
            {renderInputs()}
            <div className='botao-cadastro-parceiro'>
              {step * fieldsPerStep < 15 ? (
                <Button variant='success' onClick={handleNextStep}>
                  Continuar
                </Button>
              ) : (
                <Button
                  style={{ fontSize: 18 }}
                  variant='success'
                  onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                >CADASTRAR
                </Button>

              )}
            </div>
          </div>
          <div className='registro-cadastro-parceiro'>
            <p>Voltar para a página de <a href='/login'>Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroParceiro;