import { useEffect, useRef, useState } from "react";
import type { AuthoringSpec, Profile, Rule } from "../spec/authoringTypes";
import { presetMolly } from "../spec/presets";

const LS_KEY = "csc_builder_workspace_v1";

export function useBuilderStore() {
  const [spec, setSpec] = useState<AuthoringSpec>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : presetMolly;
    } catch {
      return presetMolly;
    }
  });
  const [selected, setSelected] = useState<{
    kind: "identity" | "table" | "profile" | "rule";
    id?: string;
  }>({
    kind: "identity",
  });

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    localStorage.setItem(LS_KEY, JSON.stringify(spec));
  }, [spec]);

  function addProfile() {
    const id = `prof_${Date.now()}`;
    const p: Profile = { id, name: "New Profile", base_bets: [] };
    setSpec((s) => ({ ...s, profiles: [...s.profiles, p] }));
    setSelected({ kind: "profile", id });
  }
  function removeProfile(id: string) {
    setSpec((s) => ({ ...s, profiles: s.profiles.filter((p) => p.id !== id) }));
    if (selected.kind === "profile" && selected.id === id) setSelected({ kind: "identity" });
  }

  function addRule() {
    const id = `r_${Date.now()}`;
    const r: Rule = { id, when: "true", then: { verb: "press", args: { delta: 1 } } };
    setSpec((s) => ({ ...s, behavior: { ...s.behavior, rules: [...s.behavior.rules, r] } }));
    setSelected({ kind: "rule", id });
  }
  function removeRule(id: string) {
    setSpec((s) => ({
      ...s,
      behavior: { ...s.behavior, rules: s.behavior.rules.filter((r) => r.id !== id) },
    }));
    if (selected.kind === "rule" && selected.id === id) setSelected({ kind: "identity" });
  }

  return { spec, setSpec, selected, setSelected, addProfile, removeProfile, addRule, removeRule };
}
