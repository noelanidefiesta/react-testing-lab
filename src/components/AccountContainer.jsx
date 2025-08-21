import { useEffect, useMemo, useState } from "react";
import Search from "./Search.jsx";
import Sort from "./Sort.jsx";
import TransactionsList from "./TransactionsList.jsx";
import AddTransactionForm from "./AddTransactionForm.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/transactions";

export default function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("none");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then(r => (r.ok ? r.json() : Promise.reject(r)))
      .then(setTransactions)
      .catch(() => {
        setTransactions([]);
        setError("Unable to load transactions. Start the JSON server.");
      });
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const base = q
      ? transactions.filter(t =>
        String(t.description || "").toLowerCase().includes(q) ||
        String(t.category || "").toLowerCase().includes(q)
      )
      : transactions.slice();

    if (sort === "amount-asc") return base.slice().sort((a, b) => Number(a.amount) - Number(b.amount));
    if (sort === "amount-desc") return base.slice().sort((a, b) => Number(b.amount) - Number(a.amount));
    if (sort === "date-asc") return base.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === "date-desc") return base.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    return base;
  }, [transactions, query, sort]);

  function handleAdd(newTx) {
    setTransactions(prev => [...prev, newTx]);
  }

  return (
    <section>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      <Search value={query} onChange={setQuery} />
      <Sort value={sort} onChange={setSort} />
      <TransactionsList rows={filtered} />
      <AddTransactionForm onCreated={handleAdd} apiUrl={API_URL} />
    </section>
  );
}
