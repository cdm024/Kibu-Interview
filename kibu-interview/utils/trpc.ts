import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/app/api/trpc/router";

export const trpc = createTRPCReact<AppRouter>();
