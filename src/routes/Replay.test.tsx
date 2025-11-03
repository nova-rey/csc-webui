import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as api from "../api/client";
import type { ComponentType } from "react";

let Replay: ComponentType;

beforeAll(async () => {
  vi.stubEnv("VITE_CSC_REPLAY_CHART", "off");
  Replay = (await import("./Replay")).default;
});

describe("Replay route", () => {
  it("loads frames and shows controls", async () => {
    vi.spyOn(api, "getRunReplay").mockResolvedValue({
      run_id: "x",
      frames: [
        { roll: 1, bankroll_after: 1000, hand_id: 1, point_on: null, dice: [3, 4] },
        { roll: 2, bankroll_after: 1005, hand_id: 1, point_on: 6, dice: [4, 2] },
      ],
    });

    render(
      <MemoryRouter initialEntries={["/replay/x"]}>
        <Routes>
          <Route path="/replay/:id" element={<Replay />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText(/Replay x/i)).toBeTruthy());
    expect(screen.getByRole("button", { name: /Play/i })).toBeTruthy();
  });
});
