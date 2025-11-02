import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Builder from "./Builder";

vi.mock("../state/builderStore", () => ({
  useBuilderStore: () => ({
    spec: {
      identity: {},
      table: {},
      profiles: [],
      behavior: { rules: [] },
    },
    setSpec: vi.fn(),
    selected: { kind: "identity", id: "identity" as const },
    setSelected: vi.fn(),
    addProfile: vi.fn(),
    removeProfile: vi.fn(),
    addRule: vi.fn(),
    removeRule: vi.fn(),
  }),
}));

describe("Builder route", () => {
  it("renders without crashing", () => {
    render(<Builder />);
    expect(screen.getByText(/Editor/i)).toBeTruthy();
  });
});
