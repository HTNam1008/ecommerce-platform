import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value;

    if (!token && req.nextUrl.pathname.startsWith("/order")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/order/:path*"],
};