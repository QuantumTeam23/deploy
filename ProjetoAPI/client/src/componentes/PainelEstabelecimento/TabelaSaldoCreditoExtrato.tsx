import styles from './TabelasEstabelecimento.css';


export default function TabelaSaldoCreditoExtrato() {
  return (
    <>
      <table className={styles.table}>
      <thead>
          <tr>
            <th>Movimentação</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {/* Linhas do corpo */}
          {Array.from({ length: 9 }, (_, index) => (
            /* coloquei 9 linhas, como exemplo*/
            <tr key={index}>
              <td>Movimentação {index + 1}</td>
              <td>Valor {index + 1}</td>
              <td>0{index + 1}/09/2023</td>
              <td>Descrição{index + 1}</td>
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
