import cloneDeep from "lodash.clonedeep";

export const stringifyQs = (obj: any, prefix?: string): string => {
  let str = [];
  for (let [key, value] of Object.entries(obj)) {
    let prefixedKey = prefix ? `${prefix}[${key}]` : key;
    if (typeof value === "object" && value !== null) {
      str.push(stringifyQs(value, prefixedKey));
    } else if (value === undefined) {
      str.push(`${prefixedKey}=""`);
    } else if (typeof value === "string") {
      str.push(`${prefixedKey}="${value}"`);
    } else {
      str.push(`${prefixedKey}=${value}`);
    }
  }

  return str.join("&");
};

export const parseQs = (qsString: string) => {
  const obj: Record<string, any> = {};

  qsString.split("&").forEach((pair) => {
    let [key, value] = pair.split("=");
    let realValue: string | number;
    // Remove quotes around the string values
    if (value.startsWith('"') && value.endsWith('"')) {
      realValue = value.slice(1, -1);
    } else if (!isNaN(Number(value))) {
      realValue = Number(value);
    }

    const keys = key.split(/[\[\]]+/).filter((k) => k);

    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) {
        acc[k] = realValue;
      } else {
        if (!acc[k]) {
          acc[k] = isNaN(Number(keys[i + 1])) ? {} : [];
        }
        return acc[k];
      }
    }, obj);
  });

  return obj;
};

export const cleanObject = (obj: Record<string, any>, isChild?: boolean) => {
  let clone = obj;
  if (!isChild) {
    clone = cloneDeep(obj);
  }
  if (Array.isArray(clone)) {
    // Recursively clean each item in the array
    for (let i = 0; i < clone.length; i++) {
      clone[i] = cleanObject(clone[i], true);
    }
    // Remove empty objects and null/undefined from the array
    return clone.filter(
      (item) =>
        !(item && typeof item === "object" && Object.keys(item).length === 0) && item !== null && item !== undefined,
    );
  } else if (clone && typeof clone === "object") {
    // Recursively clean each property in the object
    for (const key in clone) {
      clone[key] = cleanObject(clone[key], true);

      // Delete properties that are empty objects, null, or undefined
      if (
        (clone[key] && typeof clone[key] === "object" && Object.keys(clone[key]).length === 0) ||
        clone[key] === null ||
        clone[key] === undefined
      ) {
        delete clone[key];
      }
    }
  }
  return clone;
};
