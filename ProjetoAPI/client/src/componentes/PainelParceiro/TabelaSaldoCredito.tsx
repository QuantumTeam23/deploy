import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import styles from './TabelaColetas.css';

export function TabelaCreditoContratado() {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {/* Linhas do corpo */}
          {Array.from({ length: 9 }, (_, index) => (
            /* coloquei 9 linhas, como exemplo*/
            <tr key={index}>
              <td>Valor {index + 1}</td>
              <td>Quuantidade {index + 1}</td>
              <td>Data {index + 1}</td>
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

export function TabelaCreditoCedido() {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {/* Linhas do corpo */}
          {Array.from({ length: 9 }, (_, index) => (
            /* coloquei 9 linhas, como exemplo*/
            <tr key={index}>
              <td>Item {index + 1}</td>
              <td>Valor {index + 1}</td>
              <td>Endereço {index + 1}</td>
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
