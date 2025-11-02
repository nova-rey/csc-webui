import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RunsList from "./RunsList";
import * as runsApi from "../api/runs";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("RunsList", () => {
  it("renders runs table", async () => {
    vi.spyOn(runsApi, "listRuns").mockResolvedValue([
      {
        id: "r1",
        name: "Test Run",
        status: "complete",
        seed: 42,
        started_at: "2025-11-02T10:00:00Z",
      },
    ]);

    render(
      <MemoryRouter>
        <RunsList />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText("Test Run")).toBeTruthy());
  });
});
