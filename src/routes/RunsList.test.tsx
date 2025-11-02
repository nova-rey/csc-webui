import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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

describe("RunsList launch", () => {
  it("calls launchRun and refreshes list", async () => {
    const listSpy = vi.spyOn(runsApi, "listRuns").mockResolvedValue([
      { id: "r1", name: "Before", status: "complete", seed: 1, started_at: "2025-11-02T10:00:00Z" },
    ]);
    const launchSpy = vi
      .spyOn(runsApi, "launchRun")
      .mockResolvedValue({
        id: "r2",
        name: "New Run",
        status: "pending",
        seed: 999,
        started_at: "2025-11-02T11:00:00Z",
      } as any);

    render(
      <MemoryRouter>
        <RunsList />
      </MemoryRouter>,
    );
    await waitFor(() => expect(screen.getByText("Before")).toBeTruthy());

    const startBtn = screen.getByRole("button", { name: /start run/i });
    fireEvent.click(startBtn);

    await waitFor(() => expect(launchSpy).toHaveBeenCalled());
    // After refresh, listRuns will be called again
    expect(listSpy).toHaveBeenCalledTimes(2);
  });
});
