// app/api/trpc/[trpc]/route.ts
import { NextRequest } from "next/server";
import type { NextApiRequest } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/app/api/trpc/router";

const handler = createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

export async function GET(req: NextRequest) {
  // Cast the NextRequest to NextApiRequest.
  return handler(req as unknown as NextApiRequest, {} as any);
}

export async function POST(req: NextRequest) {
  return handler(req as unknown as NextApiRequest, {} as any);
}
