import { describe, expect, it } from "vitest";

import { cleanObject } from "@/utils/json";

describe("cleanObject", () => {
  it("should remove empty objects from the given object", () => {
    const input = {
      where: {
        or: [
          {
            and: [
              {
                id: {},
              },
            ],
          },
        ],
      },
    };

    const expectedOutput = {};

    expect(cleanObject(input)).toEqual(expectedOutput);
  });

  it("should handle nested empty objects", () => {
    const input = {
      a: {
        b: {
          c: {},
        },
      },
    };

    const expectedOutput = {};

    expect(cleanObject(input)).toEqual(expectedOutput);
  });

  it("should handle null and undefined values", () => {
    const input = {
      a: null,
      b: undefined,
      c: {
        d: null,
      },
    };

    const expectedOutput = {};

    expect(cleanObject(input)).toEqual(expectedOutput);
  });

  it("should handle arrays with empty objects", () => {
    const input = {
      a: [
        {},
        {
          b: [],
        },
        {
          c: {},
        },
      ],
    };

    const expectedOutput = {};

    expect(cleanObject(input)).toEqual(expectedOutput);
  });

  it("should not remove non-empty objects", () => {
    const input = {
      a: {
        b: {
          c: 1,
        },
      },
    };

    const expectedOutput = {
      a: {
        b: {
          c: 1,
        },
      },
    };

    expect(cleanObject(input)).toEqual(expectedOutput);
  });
});
