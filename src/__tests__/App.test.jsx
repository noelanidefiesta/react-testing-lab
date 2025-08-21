import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App.jsx";

afterEach(() => vi.restoreAllMocks());

describe("App", () => {
    it("renders the heading", async () => {
        vi.spyOn(global, "fetch").mockResolvedValue({ ok: true, json: async () => [] });
        render(<App />);
        expect(screen.getByRole("heading", { name: /bank transactions/i })).toBeInTheDocument();
    });
});
