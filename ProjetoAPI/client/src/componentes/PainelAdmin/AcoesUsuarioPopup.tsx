import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from '../styles/PainelAdmin.module.css';
import DeleteIcon from '@mui/icons-material/Delete'; 


export default function AdicionarUsuarioPopup({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth  // Isso define a largura para 100%
      maxWidth="md"  // Isso define a largura máxima para média (pode ajustar para 'sm', 'lg', etc., conforme necessário)
    >
      <DialogTitle>Adicionar Usuário</DialogTitle>
      <DialogContent>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Parceiro" />
          <Tab label="Estabelecimento" />
        </Tabs>
        {tabValue === 0 && (
          <form>
            <div>
              <label>Razão Social/Nome do Responsável:</label>
              <input type="text" id="parceiro_razao_social"/>
            </div>
            <div>
              <label>Nome Fantasia:</label>
              <input type="text" id="parceiro_nome_fantasia" />
            </div>
            <div>
              <label>CNPJ/CPF:</label>
              <input type="text" id="parceiro_cnpj_cpf"/>
            </div>
            <div>
              <label>Email:</label>
              <input type="email" id="parceiro_email" className={styles.emailInput} />
            </div>
            <div>
              <label>Senha:</label>
              <input type="password" id="parceiro_senha" className={styles.passwordInput} />
            </div>
            <div>
              <label>CEP:</label>
              <input type="text" id="parceiro_cep" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: '1' }}>
              <label>Logradouro:</label>
              <input type="text" id="parceiro_logradouro" />
            </div>
            <div style={{ flex: '1', marginLeft: '20px' }}>
              <label>Número:</label>
              <input type="text" id="parceiro_logradouro_numero"/>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: '60%' }}> {/* Bairro ocupando 60% da largura */}
              <label>Bairro:</label>
              <input type="text" id="parceiro_bairro"/>
            </div>
            <div style={{ flex: '30%', marginLeft: '20px' }}> {/* Cidade ocupando 30% da largura */}
              <label>Cidade:</label>
              <input type="text" id="parceiro_cidade"/>
            </div>
            <div style={{ flex: '10%', marginLeft: '20px' }}>
              <label>Estado:</label>
              <select id="parceiro_estado">
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </select>
            </div>
            <div style={{ flex: '20%', marginLeft: '20px' }}>
              <label>Região:</label>
              <select id="parceiro_estado">
                <option value="Norte">Norte</option>
                <option value="Nordeste">Nordeste</option>
                <option value="Centro-Oeste">Centro-Oeste</option>
                <option value="Sudeste">Sudeste</option>
                <option value="Sul">Sul</option>
              </select>
            </div>
          </div>
          <div>
            <label>Telefone:</label>
            <input type="text" id="parceiro_telefone" />
          </div>
          
          <div>
              <label>Tipos de parceiros:</label>
              <select id="parceiro_tipo">
                <option>Restaurantes</option>
                <option>Condomínios</option>
                <option>Lanchonetes</option>
                <option>Shoppings</option>
                <option>Residências</option>
                <option>Outros</option>
              </select>
            </div>
          
          </form>
        )}
        {tabValue === 1 && (
          <form>
            <div>
              <label>Razão Social/Nome do Responsável:</label>
              <input type="text" id="estabelecimento_razao_social"/>
            </div>
            <div>
              <label>Nome Fantasia:</label>
              <input type="text" id="estabelecimento_nome_fantasia"/>
            </div>
            <div>
              <label>CNPJ/CPF:</label>
              <input type="text" id="estabelecimento_cnpj_cpf"/>
            </div>
            <div>
              <label>Email:</label>
              <input type="email" id="estabelecimento_email" className={styles.emailInput} />
            </div>
            <div>
              <label>Senha:</label>
              <input type="password" id="estabelecimento_senha" className={styles.passwordInput} />
            </div>
            <div>
              <label>CEP:</label>
              <input type="text" id="estabelecimento_cep"/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flex: '1' }}>
                <label>Logradouro:</label>
                <input type="text" id="estabelecimento_logradouro"/>
              </div>
              <div style={{ flex: '1', marginLeft: '20px' }}>
                <label>Número:</label>
                <input type="text" id="estabelecimento_logradouro_numero"/>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flex: '60%' }}> {/* Bairro ocupando 60% da largura */}
                <label>Bairro:</label>
                <input type="text" id="estabelecimento_bairro"/>
              </div>
              <div style={{ flex: '30%', marginLeft: '20px' }}> {/* Cidade ocupando 30% da largura */}
                <label>Cidade:</label>
                <input type="text" id="estabelecimento_cidade" />
              </div>
              <div style={{ flex: '10%', marginLeft: '20px' }}>
                <label>Estado:</label>
                <select id="estabelecimento_estado">
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>
              </div>
              <div style={{ flex: '20%', marginLeft: '20px' }}>
                <label>Região:</label>
                <select id="estabelecimento_regiao">
                  <option value="Norte">Norte</option>
                  <option value="Nordeste">Nordeste</option>
                  <option value="Centro-Oeste">Centro-Oeste</option>
                  <option value="Sudeste">Sudeste</option>
                  <option value="Sul">Sul</option>
                </select>
              </div>
            </div>
            <div>
              <label>Telefone:</label>
              <input type="text" id="estabelecimento_telefone"/>
            </div>

            <div>
            <label>Tipo de estabelecimento:</label>
            <select id="parceiro_tipo">
              <option>Cooperativas</option>
              <option>Profissional individual</option>
              <option>Reciclagem</option>
              <option>Restaurantes</option>
              <option>Condomínio</option>
              <option>Residência</option>
              <option>Estabelecimento em geral</option>
              <option>Outros</option>
            </select>
          </div>
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleClose} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function EditarUsuarioPopup({ open, onClose }: { open: boolean, onClose: () => void }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Editar Usuário</DialogTitle>
      <DialogContent>
        <div>
          <label>Endereço:</label>
          <input type="text" id="endereco" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" id="email" className={styles.emailInput} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" id="senha" className={styles.passwordInput} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleClose} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function RemoverUsuarioPopup({ open, onClose, nomeContato }: { open: boolean, onClose: () => void, nomeContato: string }) {
  const handleClose = () => {
    onClose();
  };

  const handleRemover = () => {
    // Lógica para confirmar a remoção do usuário
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Remover Usuário</DialogTitle>
      <DialogContent>
        <h1>Confirma a exclusão de {nomeContato}?</h1>
        <DeleteIcon fontSize="large" color="secondary" />
        <p>Esta ação é irreversível. Tem certeza de que deseja continuar?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleRemover} color="secondary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}