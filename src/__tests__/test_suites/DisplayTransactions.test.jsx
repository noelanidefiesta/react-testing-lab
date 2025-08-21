import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../components/App.jsx";

const sample = [
    { id: 1, date: "2024-10-10", description: "Coffee", category: "Food", amount: 4.5 },
    { id: 2, date: "2024-11-02", description: "Books", category: "Education", amount: 28 },
    { id: 3, date: "2025-01-01", description: "Bus", category: "Transport", amount: 2.75 }
];

describe("Display Transactions", () => {
    beforeEach(() => {
        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => sample
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows transactions from the server on load", async () => {
        render(<App />);
        const rows = await screen.findAllByTestId("transaction-row");
        expect(rows.length).toBe(sample.length);
        expect(screen.getByText("Coffee")).toBeInTheDocument();
        expect(screen.getByText("Books")).toBeInTheDocument();
    });
});
