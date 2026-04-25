import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  let user: any = null;

  // 🔐 Verify token
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);
      user = payload;
    } catch {
      user = null;
    }
  }

  console.log("user data: ", user);

  const isLoggedIn = !!user;

  // ❌ NOT LOGGED IN → only allow "/"
  if (!isLoggedIn) {
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // ✅ LOGGED IN
  const userType = user?.userType;

  // 🔥 block access to "/"
  if (pathname === "/") {
    if (userType === "admin") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    if (userType === "school_admin") {
      return NextResponse.redirect(
        new URL("/dashboard/schooladmin", request.url),
      );
    }

    if (userType === "user") {
      return NextResponse.redirect(new URL("/dashboard/parent", request.url));
    }
  }

  // 🔐 ROLE-BASED ACCESS

  // ADMIN → only admin_dashboard
  if (userType === "admin") {
    if (!pathname.startsWith("/dashboard/admin")) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
  }

  // SCHOOL ADMIN → only schooladmin_dashboard
  if (userType === "school_admin") {
    if (!pathname.startsWith("/dashboard/schooladmin")) {
      return NextResponse.redirect(
        new URL("/dashboard/schooladmin", request.url),
      );
    }
  }

  // USER → only /dashboard
  if (userType === "user") {
    if (!pathname.startsWith("/dashboard/parent")) {
      return NextResponse.redirect(new URL("/dashboard/parent", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
