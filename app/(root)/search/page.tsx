import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";

async function Page () {
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetchUser(user.id);
    if (userInfo?.onboarding !== true) redirect('/onboarding');
    const results = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25,
    });
  return (
    <section>
        <h1 className="head-text mb-10">Search</h1>

        {/* search bar */}
        <div className="mt-14 flex flex-col gap-9">
            {results.users.length === 0 ? (
                <p className="no-results">No Users</p>
            ) : (

                <>
                { results.users.map((person) => (
                    <UserCard 
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    username={person.username}
                    imageUrl={person.image}
                    personType= 'User'
                    />
                )) }
             </>
            )}
        </div>
    </section>
  )
}

export default Page