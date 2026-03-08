import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Mark the Inngest API route as public
const isPublicRoute = createRouteMatcher([
  '/api/inngest(.*)', 
  '/', 
  '/sign-in(.*)', 
  '/sign-up(.*)'
]);

export default clerkMiddleware(async (auth, request) => {
  // 2. Protect everything EXCEPT the public routes
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  // 3. Ensure the matcher includes your API routes
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};