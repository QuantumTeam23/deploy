import DeleteIcon from '@mui/icons-material/Delete'; // Importe o ícone que deseja usar
import Button from '@mui/material/Button';
import styles from './TabelaCarteiraEstab.module.css';


export default function TabelaCarteiraEstab() {
  return (
    <>
      <table className={styles.table}>
      <thead>
          <tr>
            <th>Nome</th>
            <th>Contato</th>
            <th>Endereço</th>
            <th>Volume médio</th>
            <th>Volume total</th>
            <th>Data da última coleta</th>
          </tr>
        </thead>
        <tbody>
          {/* Linhas do corpo */}
          {Array.from({ length: 9 }, (_, index) => (
            /* coloquei 9 linhas, como exemplo*/
            <tr key={index}>
              <td>Nome {index + 1}</td>
              <td>Contato {index + 1}</td>
              <td>Endereço {index + 1}</td>
              <td>Volume médio {index + 1}</td>
              <td>Volume total {index + 1}</td>
              <td>0{index + 1}/09/2023</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>‎ </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
