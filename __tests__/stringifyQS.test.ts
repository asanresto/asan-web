import { describe, expect, it } from "vitest";

import { parseQs, stringifyQs } from "@/utils/json";

describe("QS Functions", () => {
  const testObject = {
    where: {
      or: [
        {
          and: [
            {
              price: {
                equals: 123,
              },
            },
            {
              name: {
                not_equals: "aaa",
              },
            },
          ],
        },
      ],
    },
  };

  const testString = 'where[or][0][and][0][price][equals]=123&where[or][0][and][1][name][not_equals]="aaa"';

  // it("stringifyQS should skip undefined", () => {
  //   const result = stringifyQS(testObject);
  //   expect(result).toBe(testString);
  // });

  it("stringifyQS should convert object to query string", () => {
    const result = stringifyQs(testObject);
    expect(result).toBe(testString);
  });

  it("parseQS should convert query string back to object", () => {
    const result = parseQs(testString);
    expect(result).toEqual(testObject);
  });

  it("stringifyQS and parseQS should be reversible", () => {
    const qs = stringifyQs(testObject);
    const obj = parseQs(qs);
    expect(obj).toEqual(testObject);
  });

  it("parseQS should handle nested arrays and objects correctly", () => {
    const nestedObject = {
      a: {
        b: {
          c: [1, 2, 3],
        },
      },
    };
    const nestedString = "a[b][c][0]=1&a[b][c][1]=2&a[b][c][2]=3";
    expect(parseQs(nestedString)).toEqual(nestedObject);
  });

  it("stringifyQS should handle nested arrays and objects correctly", () => {
    const nestedObject = {
      a: {
        b: {
          c: [1, 2, 3],
        },
      },
    };
    const nestedString = "a[b][c][0]=1&a[b][c][1]=2&a[b][c][2]=3";
    expect(stringifyQs(nestedObject)).toBe(nestedString);
  });
});
