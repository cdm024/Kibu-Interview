"use client";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function MemberNotesPage({ params }: { params: { id: string } }) {
  const memberId = params.id;
  const { data: notes, isLoading } = trpc.getNotes.useQuery();
  const addNote = trpc.addNote.useMutation();
  const [newNote, setNewNote] = useState("");

  if (isLoading) return <p>Loading notes...</p>;

  // Filter notes for this member
  const memberNotes = notes?.filter((note: { member: string }) => note.member === memberId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Notes for Member {memberId}
      </h1>
      <ul>
        {memberNotes?.map((note: any) => (
          <li key={note.id} className="border p-2 my-2">
            {note.text}{" "}
            {note.timestamp && (
              <span className="text-gray-500">
                ({new Date(note.timestamp).toLocaleString()})
              </span>
            )}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-4">Add Note</h2>
      <textarea
        className="w-full border p-2"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2"
        onClick={() => {
          addNote.mutate({ member: memberId, text: newNote });
          setNewNote("");
        }}
      >
        Add Note
      </button>
    </div>
  );
}
