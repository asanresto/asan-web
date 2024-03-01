import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Had to use a route handler to refresh token because crypto and prisma doesn't work on edge runtime
export async function GET(request: NextRequest) {
  return NextResponse.json({});
  // try {
  //   const createdAt = dayjs();
  //   const newRefreshToken = crypto.randomBytes(20).toString("hex");
  //   const refreshToken = await prisma.refreshToken.update({
  //     where: { refreshToken: request.nextUrl.searchParams.get("refreshToken")! },
  //     data: {
  //       refreshToken: newRefreshToken,
  //       expiryDate: createdAt.add(Number(process.env.REFRESH_TOKEN_TTL), "second").toDate(),
  //       createdAt: createdAt.toDate(),
  //     },
  //     select: { userId: true },
  //   });
  //   const newAccessToken = jwt.sign({ id: refreshToken.userId }, process.env.JWT_SECRET, {
  //     expiresIn: Number(process.env.ACCESS_TOKEN_TTL),
  //   });
  //   const response = NextResponse.json({
  //     accessToken: newAccessToken,
  //     refreshToken: newRefreshToken,
  //     accessTokenTtl: Number(process.env.ACCESS_TOKEN_TTL),
  //     refreshTokenTtl: Number(process.env.REFRESH_TOKEN_TTL),
  //   });
  //   response.cookies
  //     .set(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY, newRefreshToken, {
  //       maxAge: Number(process.env.REFRESH_TOKEN_TTL),
  //       sameSite: "strict",
  //     })
  //     .set(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY, newAccessToken, {
  //       maxAge: Number(process.env.ACCESS_TOKEN_TTL),
  //       sameSite: "strict",
  //     });
  //   return response;
  // } catch (error) {
  //   return NextResponse.json({}, { status: 401 });
  // }
}
