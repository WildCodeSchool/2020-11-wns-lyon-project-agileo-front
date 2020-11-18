import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'components/Globals/globals.scss';
import { AppProps } from 'next/app';
import React from 'react';
import { useRouter } from 'next/router';
import { Header, HeaderDashboard } from 'components/index';
import Head from 'next/head';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Head>
				<title>Agileo</title>
				<link rel="icon" href="/logo.ico" />
			</Head>
			{useRouter().asPath.includes('dashboard') ? <HeaderDashboard /> : <Header />}
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<div className="px-4 py-6 sm:px-0">
						<Component {...pageProps} />
					</div>
				</div>
			</main>
		</ApolloProvider>
	);
}

export default MyApp;
