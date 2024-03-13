export const getCookie = (cname: string) => {
  if (typeof window === "undefined") {
    return "";
  }
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

/**
 *
 * @param cname name of the cookie
 * @param cvalue value of the cookie
 * @param cMaxAge in seconds
 */
export const setCookie = (cname: string, cvalue: string, cMaxAge: number) => {
  let expires = "";
  let maxAge = "";
  if (cMaxAge) {
    maxAge = "max-age=" + cMaxAge + ";";
  }
  document.cookie = `${cname}=${cvalue};${expires}${maxAge};SameSite=Strict;Secure;Path=/`;
};

export const deleteCookie = (cname: string) => {
  document.cookie = `${cname}=;Expires=Thu, 01 Jan 1970 00:00:00 UTC;Path=/`;
};
