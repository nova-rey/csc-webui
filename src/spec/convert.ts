import { AuthoringSpec } from "./authoringTypes";

export function toDraft(spec: AuthoringSpec): Record<string, unknown> {
  const clean = JSON.parse(JSON.stringify(spec));
  return {
    identity: clean.identity ?? {},
    table: clean.table ?? {},
    profiles: Array.isArray(clean.profiles) ? clean.profiles : [],
    behavior: {
      schema_version: "1.0",
      rules: (clean.behavior?.rules ?? []).map((r: any) => ({
        id: r.id,
        when: r.when,
        then: r.then,
        cooldown: r.cooldown ?? undefined,
        scope: r.scope ?? undefined,
        guards: r.guards ?? undefined
      }))
    }
  };
}
