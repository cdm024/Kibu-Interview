import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  // Fetch all members
  getMembers: t.procedure.query(async () => {
    const response = await fetch("http://localhost:3001/members");
    return response.json();
  }),

  // Fetch all notes
  getNotes: t.procedure.query(async () => {
    const response = await fetch("http://localhost:3001/notes");
    return response.json();
  }),

  // Create a new note for a member
  addNote: t.procedure
    .input(
      z.object({
        member: z.string(), // member id as a string
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Optionally add a timestamp
      const newNote = {
        member: input.member,
        text: input.text,
        timestamp: new Date().toISOString(),
      };
      const response = await fetch("http://localhost:3001/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });
      return response.json();
    }),
});

export type AppRouter = typeof appRouter;
