import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    const pathname = request.nextUrl.pathname;
    const isAdminRoute = pathname.startsWith("/admin");
    const isLoginRoute = pathname === "/login";

    if (!session && isAdminRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session && isLoginRoute) {
        return NextResponse.redirect(new URL("/admin/utama/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};