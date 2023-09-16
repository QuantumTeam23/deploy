import styles from './TabelaHistTransacoes.module.css';
import DeleteIcon from '@mui/icons-material/Delete'; // Importe o ícone que deseja usar
import Button from '@mui/material/Button';


export default function TabelasHistTransacoes() {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Valor</th>
            <th>Destinatário</th>
          </tr>
        </thead>
        <tbody>
          {/* Linhas do corpo */}
          {Array.from({ length: 9 }, (_, index) => (
            /* coloquei 9 linhas, como exemplo*/
            <tr key={index}>
              <td>Usuário {index + 1}</td>
              <td>Valor {index + 1}</td>
              <td>Destinatário {index + 1} </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>‎ </td>
            <td colSpan={2}>‎ </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}





