import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
    matcher: [
        /*
        * Run Clerk middleware on all routes except:
        * - static files
        * - image optimization
        * - favicon
        */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
