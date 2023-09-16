
import styles from './TabelasEstabelecimento.css';


export default function TabelaHistoricoCompra() {
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
