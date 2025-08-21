export default function Sort({ value, onChange }) {
    return (
        <div style={{ marginBottom: 8 }}>
            <label>
                Sort:
                <select
                    data-testid="sort-select"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    style={{ marginLeft: 8 }}
                >
                    <option value="none">None</option>
                    <option value="amount-asc">Amount ↑</option>
                    <option value="amount-desc">Amount ↓</option>
                    <option value="date-asc">Date ↑</option>
                    <option value="date-desc">Date ↓</option>
                </select>
            </label>
        </div>
    );
}
