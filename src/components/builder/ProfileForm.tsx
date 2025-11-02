import type { AuthoringSpec, BaseBet, Profile } from "../../spec/authoringTypes";

export default function ProfileForm({
  spec: _spec,
  profile,
  onChange,
}: {
  spec: AuthoringSpec;
  profile: Profile;
  onChange: (_profile: Profile) => void;
}) {
  void _spec;
  function updateBet(idx: number, patch: Partial<BaseBet>) {
    const copy: Profile = {
      ...profile,
      base_bets: profile.base_bets.map((b, i) => (i === idx ? { ...b, ...patch } : b)),
    };
    onChange(copy);
  }
  function addBet() {
    const copy: Profile = {
      ...profile,
      base_bets: [
        ...profile.base_bets,
        { kind: "place", number: 6, amount: 6, working_on_comeout: false },
      ],
    };
    onChange(copy);
  }
  function removeBet(idx: number) {
    const copy: Profile = { ...profile, base_bets: profile.base_bets.filter((_, i) => i !== idx) };
    onChange(copy);
  }
  return (
    <div className="space-y-3 text-sm">
      <label className="block">
        <span className="block">Profile Name</span>
        <input
          className="w-full border rounded px-2 py-1"
          value={profile.name}
          onChange={(e) => onChange({ ...profile, name: e.target.value })}
        />
      </label>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium">Base Bets</span>
          <button className="text-indigo-600" onClick={addBet}>
            + Add Bet
          </button>
        </div>
        <div className="space-y-2">
          {profile.base_bets.map((b, idx) => (
            <div key={idx} className="grid grid-cols-5 gap-2 items-end">
              <label className="block col-span-2">
                <span className="block">Kind</span>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={b.kind}
                  onChange={(e) => updateBet(idx, { kind: e.target.value as BaseBet["kind"] })}
                >
                  <option>place</option>
                  <option>come</option>
                  <option>{"don't_come"}</option>
                  <option>pass</option>
                  <option>{"don't_pass"}</option>
                  <option>odds</option>
                </select>
              </label>
              <label className="block">
                <span className="block">Number</span>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={b.number ?? ""}
                  onChange={(e) =>
                    updateBet(idx, {
                      number: e.target.value
                        ? (Number(e.target.value) as BaseBet["number"])
                        : undefined,
                    })
                  }
                >
                  <option value="">—</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </label>
              <label className="block">
                <span className="block">Amount</span>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={b.amount ?? ""}
                  onChange={(e) => updateBet(idx, { amount: num(e.target.value) })}
                />
              </label>
              <label className="block">
                <span className="block">Working CO</span>
                <input
                  type="checkbox"
                  className="align-middle ml-2"
                  checked={!!b.working_on_comeout}
                  onChange={(e) => updateBet(idx, { working_on_comeout: e.target.checked })}
                />
              </label>
              <div className="col-span-5 text-right">
                <button className="text-red-600 text-xs" onClick={() => removeBet(idx)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function num(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
