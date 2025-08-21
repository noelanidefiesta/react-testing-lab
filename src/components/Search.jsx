export default function Search({ value, onChange }) {
  return (
    <div style={{ margin: "16px 0" }}>
      <input
        data-testid="search-input"
        placeholder="Search by description or category"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
