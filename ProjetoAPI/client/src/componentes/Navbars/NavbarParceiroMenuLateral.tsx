import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MenuLateralParceiro: React.FC = () => {
  const [menuAberto, setMenuAberto] = React.useState(false);

  const abrirMenu = () => {
    setMenuAberto(true);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="Abrir menu"
        edge="start"
        onClick={abrirMenu}
        style={{
          borderRadius: '12px', // Adicionando bordas arredondadas
          padding: '8px', 
          width: '48px', // Ajustando a largura
          height: '48px', // Ajustando a altura
        }}
      >
        <MenuIcon style={{ fontSize: '28px' }} /> {/* Ajustando o tamanho do ícone */}
      </IconButton>
      <Drawer open={menuAberto} onClose={fecharMenu} anchor="right">
        <div style={{ width: '250px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
            <AccountCircleIcon style={{ fontSize: '64px' }} />
            <h2>Conta</h2>
          </div>
          <Divider />
          <List>
            <ListItemButton onClick={fecharMenu} component={Link} to="/painel-parceiro-carteira-estabelecimento">
              <ListItemText primary="Carteira de Estabelecimentos" />
            </ListItemButton>
            <ListItemButton onClick={fecharMenu} component={Link} to="/painel-parceiro-coleta">
              <ListItemText primary="Coletas" />
            </ListItemButton>
            <ListItemButton onClick={fecharMenu} component={Link} to="/painel-parceiro-historico-compra">
              <ListItemText primary="Histórico de Compra" />
            </ListItemButton>
            <ListItemButton onClick={fecharMenu} component={Link} to="/painel-parceiro-saldo-credito">
              <ListItemText primary="Saldo de Crédito" />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default MenuLateralParceiro;
