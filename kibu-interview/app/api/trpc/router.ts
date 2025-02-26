import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  getUsers: t.procedure.query(async () => {
    const response = await fetch("http://localhost:3001/users");
    return response.json();
  }),
  
  getNotes: t.procedure.query(async () => {
    const response = await fetch("http://localhost:3001/notes");
    return response.json();
  }),

  addNote: t.procedure
    .input(
      z.object({
        userId: z.number(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await fetch("http://localhost:3001/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: input.userId,
          content: input.content,
          timestamp: new Date().toISOString(),
        }),
      });
      return response.json();
    }),
});

export type AppRouter = typeof appRouter;
