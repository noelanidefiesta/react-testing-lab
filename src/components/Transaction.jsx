export default function Transaction({ tx }) {
  return (
    <tr data-testid="transaction-row">
      <td>{tx.date}</td>
      <td>{tx.description}</td>
      <td>{tx.category}</td>
      <td align="right">{tx.amount}</td>
    </tr>
  );
}
