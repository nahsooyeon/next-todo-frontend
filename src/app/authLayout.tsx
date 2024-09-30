'use client';
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";

type Props = ({
	children: React.ReactNode;
});

export default function AuthSession({ children }: Props) {
	return <ApolloProvider client={client}> <SessionProvider>{children}</SessionProvider></ApolloProvider>;
}