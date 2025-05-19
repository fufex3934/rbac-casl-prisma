import { subject } from "@casl/ability";
import type { AppAbility } from "./abilities";

export function checkAbility(ability: AppAbility, action: string, resource: any) {
  return ability.can(action, subject(resource.constructor.name, resource));
}
