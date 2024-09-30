"use client";

import { useSession, signIn, signOut } from "next-auth/react";

const UserProfile: React.FC = () => {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				<p>Welcome, {session.user?.name}</p>
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}

	return (
		<>
			<p>You are not signed in</p>
			<button onClick={() => signIn("google")}>Sign in with Google</button>
		</>
	);
};

export default UserProfile;