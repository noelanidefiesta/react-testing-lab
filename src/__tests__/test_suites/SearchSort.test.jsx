import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../components/App.jsx";

const sample = [
    { id: 1, date: "2024-10-10", description: "Coffee", category: "Food", amount: 4.5 },
    { id: 2, date: "2024-11-02", description: "Books", category: "Education", amount: 28 },
    { id: 3, date: "2025-01-01", description: "Bus", category: "Transport", amount: 2.75 }
];

describe("Search and Sort", () => {
    beforeEach(() => {
        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => sample
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("filters the table by search text", async () => {
        render(<App />);
        await screen.findAllByTestId("transaction-row");
        const input = screen.getByTestId("search-input");
        fireEvent.change(input, { target: { value: "bo" } });
        const rows = await screen.findAllByTestId("transaction-row");
        expect(rows.length).toBe(1);
        expect(screen.getByText("Books")).toBeInTheDocument();
    });

    it("sorts by amount descending", async () => {
        render(<App />);
        await screen.findAllByTestId("transaction-row");
        const select = screen.getByTestId("sort-select");
        fireEvent.change(select, { target: { value: "amount-desc" } });
        const rows = await screen.findAllByTestId("transaction-row");
        const amounts = rows.map(r => Number(r.lastChild.textContent));
        const sorted = [...amounts].sort((a, b) => b - a);
        expect(amounts).toEqual(sorted);
    });
});
