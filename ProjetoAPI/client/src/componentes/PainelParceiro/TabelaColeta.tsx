import DeleteIcon from '@mui/icons-material/Delete'; // Importe o ícone que deseja usar
import Button from '@mui/material/Button';
import styles from './TabelaColetas.css';


export default function TabelaColeta() {
  return (
    <>
      <table className={styles.table}>
      <thead>
          <tr>
            <th>Estabelecimento</th>
            <th>Data</th>
            <th>Volume</th>
            <th>Crédito Cedido</th>
          </tr>
        </thead>
        <tbody>
          {/* Linhas do corpo */}
          {Array.from({ length: 9 }, (_, index) => (
            /* coloquei 9 linhas, como exemplo*/
            <tr key={index}>
              <td>Estabelecimento {index + 1}</td>
              <td>0{index + 1}/09/2023</td>
              <td>Endereço {index + 1}</td>
              <td>Volume médio {index + 1}</td>
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
