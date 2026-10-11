import { describe, expect, it } from "vitest";
import { getPage, slugToPath } from "@/lib/pages";

describe("slugToPath", () => {
  it("maps the empty slug to root", () => expect(slugToPath("")).toBe("/"));
  it("prefixes nested slugs", () => expect(slugToPath("work/a")).toBe("/work/a"));
});

describe("getPage", () => {
  it("resolves home from undefined segments", () => expect(getPage(undefined)?.slug).toBe(""));
  it("returns undefined for unknown slugs", () => expect(getPage(["nope"])).toBeUndefined());
});
