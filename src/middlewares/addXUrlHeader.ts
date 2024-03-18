import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

import { MiddlewareFactory } from "@/types";

export const addXUrlHeader: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // console.log("addXUrlHeader middleware");
    const res = await next(request, event);
    if (res) {
      res.headers.set("x-url", request.url);
    }
    return res;
  };
};
