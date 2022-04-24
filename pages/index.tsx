import { Grid, GridItem } from '@chakra-ui/react';
import Head from 'next/head';
import client from '../queries/apollo-client';
import queries from '../queries/queries';
import BlocksBuilder from '../components/builders/BlocksBuilder';
import useVh from '../hooks/useVh';
import Navbar from '../components/layouts/Navbar';
import useScroll from '../hooks/useScroll';
import useIndicator from '../hooks/useIndicator';
import { useContext, useEffect } from 'react';
import { ProviderContext } from '../providers/Provider';

interface HomeProps {
	sections: any;
	socialMedias: any;
	projects: any;
}

const Home = ({ sections, socialMedias, projects }: HomeProps) => {
	const { vh } = useVh();
	const { color, setColor } = useContext(ProviderContext);
	const scroll = useScroll(0);
	const scrollInfo = useIndicator(scroll.value);

	const getSectionColor = (section: any) => {
		if (section.color) return section.color.name;
		else return 'blue';
	};

	useEffect(() => {
		const sectionsTypeDispatch: any = {
			ComponentPagesHomeSection: () =>
				setColor(getSectionColor(sections[scrollInfo.value - 1])),

			ComponentPagesHomeProjectSection: () => {
				if (projects) setColor(projects[0].color.name);
			},
		};

		const currentSection = sections[scrollInfo.value - 1];

		// Dispatch the color setter depending on the section type
		sectionsTypeDispatch[currentSection['__typename']]();
	}, [projects, scrollInfo.value, sections, setColor]);

	useEffect(() => {
		console.log(color);
	}, [color]);

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
					<Navbar color={color} />
				</GridItem>
				<GridItem
					area="body"
					overflow="auto"
					scrollSnapType="y mandatory"
					scrollPadding={0}
					onScroll={scroll.onScroll}
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
