import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RunDetail from "./RunDetail";
import * as runsApi from "../api/runs";
import type { RunDetail as RunDetailType } from "../api/runs";

describe("RunDetail", () => {
  it("shows manifest link", async () => {
    const mockRun: RunDetailType = {
      id: "r1",
      name: "Test",
      status: "complete",
      seed: 1,
      started_at: "2025-11-02T10:00:00Z",
      artifacts: { manifest: "/mock-data/artifacts/run001_manifest.json" },
    };

    vi.spyOn(runsApi, "getRun").mockResolvedValue(mockRun);

    render(
      <MemoryRouter initialEntries={["/runs/r1"]}>
        <Routes>
          <Route path="/runs/:id" element={<RunDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText(/Artifacts/i)).toBeTruthy());
    const manifestLink = await screen.findByRole("link", { name: /manifest/i });
    expect(manifestLink).toBeTruthy();
  });
});
