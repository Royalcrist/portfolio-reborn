import 'normalize.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme';
import { Provider } from '../providers/Provider';
import client from '../lib/apollo-client';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<ApolloProvider client={client}>
				<Provider>
					<ChakraProvider theme={theme}>
						<Component {...pageProps} />
					</ChakraProvider>
				</Provider>
			</ApolloProvider>
		</>
	);
}

export default MyApp;
