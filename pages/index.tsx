import { Grid, GridItem } from '@chakra-ui/react';
import Head from 'next/head';
import client from '../queries/apollo-client';
import queries from '../queries/queries';
import BlocksBuilder from '../components/builders/BlocksBuilder';
import useVh from '../hooks/useVh';
import Navbar from '../components/layouts/Navbar';
import { useContext, useRef } from 'react';
import { ProviderContext } from '../providers/Provider';
import useIsVisibleInit from '../hooks/useIsVisibleInit';

interface HomeProps {
	sections: any;
	socialMedias: any;
	projects: any;
}

const Home = ({ sections, socialMedias, projects }: HomeProps) => {
	const { vh } = useVh();
	const { color } = useContext(ProviderContext);

	const ref = useRef<HTMLDivElement>(null);

	useIsVisibleInit(ref);

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
					<Navbar colorName={color} sections={sections} />
				</GridItem>
				<GridItem
					ref={ref}
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
		query: queries(['HOME', 'PROJECTS_HOME', 'SOCIAL_MEDIA']),
		variables: {
			locale,
		},
	});

	return {
		props: {
			...data.home,
			socialMedias: data.socialMedias,
			projects: data.projects,
		},
	};
}

export default Home;
