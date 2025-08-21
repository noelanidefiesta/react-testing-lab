import { useState } from "react";

export default function AddTransactionForm({ onCreated, apiUrl }) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  function reset() {
    setDate("");
    setDescription("");
    setCategory("");
    setAmount("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const body = { date, description, category, amount: Number(amount) };

    let res;
    try {
      res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    } catch {
      alert("Network error. Start the JSON server.");
      return;
    }

    if (!res.ok) {
      alert("Server error. Check the API URL.");
      return;
    }

    const saved = await res.json();
    onCreated(saved);
    reset();
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16, display: "grid", gap: 8, maxWidth: 520 }}>
      <h2>Add Transaction</h2>
      <input data-testid="date" placeholder="YYYY-MM-DD" value={date} onChange={e => setDate(e.target.value)} />
      <input data-testid="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input data-testid="category" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <input data-testid="amount" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button data-testid="submit" type="submit" disabled={!date || !description || !category || !amount}>Submit</button>
    </form>
  );
}
