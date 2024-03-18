import { assert, test } from "vitest";

import { isAbsoluteUrl } from "@/utils/url";

test("isAbsoluteUrl function", () => {
  assert(isAbsoluteUrl("http://www.example.com") === true, "Should return true for absolute URLs");
  assert(isAbsoluteUrl("https://www.example.com") === true, "Should return true for absolute URLs");
  assert(isAbsoluteUrl("ftp://example.com") === true, "Should return true for absolute URLs");
  assert(isAbsoluteUrl("//example.com") === true, "Should return true for protocol-relative URLs");
  assert(isAbsoluteUrl("example.com") === false, "Should return false for relative URLs");
  assert(isAbsoluteUrl("/path/to/resource") === false, "Should return false for relative URLs");
  assert(isAbsoluteUrl("mailto:user@example.com") === false, "Should return false for relative URLs");
});
