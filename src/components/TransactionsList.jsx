import Transaction from "./Transaction.jsx";

export default function TransactionsList({ rows }) {
  return (
    <table width="100%" cellPadding="6" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th align="left">Date</th>
          <th align="left">Description</th>
          <th align="left">Category</th>
          <th align="right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(tx => (
          <Transaction key={tx.id} tx={tx} />
        ))}
      </tbody>
    </table>
  );
}
