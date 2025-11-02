import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AboutStatus from "./AboutStatus";

vi.mock("../api/client", () => ({
  getApiStatus: vi.fn().mockResolvedValue({ ok: true, api_version: "v1", server: "mock" })
}));

describe("AboutStatus", () => {
  it("shows API info when status OK", async () => {
    render(<AboutStatus />);
    await waitFor(() => {
      expect(screen.getByText(/API:/i)).toBeTruthy();
      expect(screen.getByText("v1")).toBeTruthy();
    });
  });
});
