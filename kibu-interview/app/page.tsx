"use client";
import { trpc } from "@/utils/trpc";
import Link from "next/link";

export default function MembersPage() {
  const { data: members, isLoading } = trpc.getMembers.useQuery();

  if (isLoading) return <p>Loading members...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Members</h1>
      <ul>
        {members?.map((member: { id: string; firstName: string; lastName: string }) => (
          <li key={member.id}>
            <Link href={`/members/${member.id}`} className="text-blue-500">
              {member.firstName} {member.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
