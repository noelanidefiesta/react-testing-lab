import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../components/App.jsx";

describe("Add Transaction", () => {
    beforeEach(() => {
        vi.spyOn(global, "fetch")
            .mockResolvedValueOnce({ ok: true, json: async () => [] })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: 10, date: "2025-07-04", description: "Groceries", category: "Food", amount: 100 })
            });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("submits and renders the new transaction", async () => {
        render(<App />);
        const date = await screen.findByTestId("date");
        const description = screen.getByTestId("description");
        const category = screen.getByTestId("category");
        const amount = screen.getByTestId("amount");
        const submit = screen.getByTestId("submit");

        fireEvent.change(date, { target: { value: "2025-07-04" } });
        fireEvent.change(description, { target: { value: "Groceries" } });
        fireEvent.change(category, { target: { value: "Food" } });
        fireEvent.change(amount, { target: { value: "100" } });
        fireEvent.click(submit);

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
        const rows = await screen.findAllByTestId("transaction-row");
        expect(rows.length).toBe(1);
        expect(screen.getByText("Groceries")).toBeInTheDocument();

        const [, postCall] = global.fetch.mock.calls;
        expect(postCall[1].method).toBe("POST");
        const body = JSON.parse(postCall[1].body);
        expect(body.description).toBe("Groceries");
        expect(body.amount).toBe(100);
    });
});
