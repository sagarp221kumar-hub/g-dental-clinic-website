import { PocketIc } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
});

afterAll(async () => {
  await pic?.tearDown();
});

it("answers an empty-state read instead of trapping", async () => {
  await expect(actor.listAppointments()).resolves.toEqual([]);
});

it("round-trips an appointment through the real canister", async () => {
  const created = await actor.submitAppointment(
    "Ada Lovelace",
    "+91 94180 18910",
    "2026-11-02",
    "10:30",
    "First visit",
  );
  expect(created).toMatchObject({
    name: "Ada Lovelace",
    phone: "+91 94180 18910",
    preferredDate: "2026-11-02",
    preferredTime: "10:30",
    message: "First visit",
  });

  const listed = await actor.listAppointments();
  expect(listed).toHaveLength(1);
  expect(listed[0]).toMatchObject({
    id: created.id,
    name: "Ada Lovelace",
    phone: "+91 94180 18910",
  });
});

it("assigns distinct ids to successive appointments", async () => {
  const first = await actor.submitAppointment("One", "1", "2026-11-03", "11:00", "");
  const second = await actor.submitAppointment("Two", "2", "2026-11-04", "12:00", "");
  expect(second.id).not.toBe(first.id);
  const listed = await actor.listAppointments();
  expect(listed.map((entry) => entry.id)).toEqual(
    expect.arrayContaining([first.id, second.id]),
  );
});

it("exposes the generated API doc and schema without trapping", async () => {
  await expect(actor.getApiDoc()).resolves.toEqual(expect.any(String));
  await expect(actor.schema()).resolves.toEqual(expect.any(String));
});
