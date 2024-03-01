/**
 * Convert hex color to rgba
 * @param hex hex string color, supports 3,4,6,8 characters
 * @param alpha(optional) 0-1
 * @returns
 */
export const hexToRGBA = (hex: string, alpha?: number) => {
  // remove invalid characters
  hex = hex.replace(/[^0-9a-fA-F]/g, "");

  if (hex.length < 5) {
    // 3, 4 characters double-up
    hex = hex
      .split("")
      .map((s) => s + s)
      .join("");
  }

  // parse pairs of two
  let rgba = hex.match(/.{1,2}/g)?.map((s) => parseInt(s, 16));
  if (!rgba) {
    return null;
  }
  // alpha code between 0 & 1 / default 1
  rgba[3] = rgba.length > 3 ? Number(parseFloat(String(rgba[3] / 255)).toFixed(2)) : alpha ?? 1;

  return "rgba(" + rgba.join(", ") + ")";
};
