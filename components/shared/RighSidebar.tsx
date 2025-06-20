import { fetchCommunities } from "@/lib/actions/community.action";
import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function RightSidebar() {
  const user = await currentUser();
  // Fetch suggested communities (first 5)
  const { communities } = await fetchCommunities({ pageSize: 5 });
  // Fetch suggested users (first 5, excluding current user)
  const { users } = await fetchUsers({ userId: user?.id || "", pageSize: 5 });

  return (
    <section className="custom-scrollbar p-4">
      <div className="mb-8">
        <h3 className="text-heading4-medium text-light-1 mb-4">
          Suggested Communities
        </h3>
        <ul className="space-y-3">
          {communities.map(
            (community: { id: string; image: string; name: string }) =>
              community.id ? (
                <li key={community.id} className="flex items-center gap-3">
                  <Link
                    href={`/communities/${community.id}`}
                    className="flex items-center gap-3 hover:underline"
                  >
                    <Image
                      src={community.image}
                      alt={community.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                      unoptimized
                    />
                    <span className="text-base text-light-2 font-medium">
                      {community.name}
                    </span>
                  </Link>
                </li>
              ) : null
          )}
        </ul>
      </div>
      <div>
        <h3 className="text-heading4-medium text-light-1 mb-4">
          Suggested Users
        </h3>
        <ul className="space-y-3">
          {users.map((user: { id: string; image: string; name: string }) => (
            <li key={user.id} className="flex items-center gap-3">
              <Link
                href={`/profile/${user.id}`}
                className="flex items-center gap-3 hover:underline"
              >
                <Image
                  src={user.image}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                  unoptimized
                />
                <span className="text-base text-light-2 font-medium">
                  {user.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default RightSidebar;
