import { Grid, GridItem } from '@chakra-ui/react';
import Head from 'next/head';
import client from '../queries/apollo-client';
import queries from '../queries/queries';
import BlocksBuilder from '../components/builders/BlocksBuilder';
import useVh from '../hooks/useVh';
import Navbar from '../components/layouts/Navbar';

interface HomeProps {
	sections: any;
	socialMedias: any;
}

const Home = ({ sections, socialMedias }: HomeProps) => {
	const { vh } = useVh();

	// console.log(sections);

	return (
		<>
			<Head>
				<title>Cristian Su&aacute;rez - Tech enthusiast</title>
				<meta name="description" content="Your favorite tech bro." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Grid
				templateColumns="1fr"
				templateRows="auto 1fr"
				templateAreas='"header" "body"'
				height={vh(100)}
				width="100vw"
			>
				<GridItem area="header">
					<Navbar />
				</GridItem>
				<GridItem
					area="body"
					overflow="auto"
					scrollSnapType="y mandatory"
					scrollPadding={0}
				>
					<BlocksBuilder info={{ sections, socialMedias }} />
				</GridItem>
			</Grid>
		</>
	);
};

export async function getServerSideProps({ locale }: any) {
	const { data, error } = await client.query({
		query: queries(['HOME', 'SOCIAL_MEDIA']),
		variables: {
			locale,
		},
	});

	if (error) {
		console.log(error);
	}

	return {
		props: {
			...data.home,
			socialMedias: data.socialMedias,
		},
	};
}

export default Home;
