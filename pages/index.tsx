import { Grid, GridItem } from '@chakra-ui/react';
import Head from 'next/head';
import client from '../queries/apollo-client';
import queries from '../queries/queries';
import BlocksBuilder from '../components/builders/BlocksBuilder';
import useVh from '../hooks/useVh';
import Navbar from '../components/layouts/Navbar';
import useScroll from '../hooks/useScroll';
import useIndicator from '../hooks/useIndicator';
import { useContext, useEffect, useRef, useState } from 'react';
import { ProviderContext } from '../providers/Provider';

interface HomeProps {
	sections: any;
	socialMedias: any;
	projects: any;
}

const Home = ({ sections, socialMedias, projects }: HomeProps) => {
	const { vh } = useVh();
	const { color } = useContext(ProviderContext);
	const sectionsRef = useRef<HTMLElement>(null);

	const generateUuid = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			const r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	};

	const [currentSection, setCurrentSection] = useState('');
	const [currentSectionId, setCurrentSectionId] = useState('');

	const observerCallback: IntersectionObserverCallback = entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const element: HTMLElement = entry.target as HTMLElement;
				setCurrentSection(element.dataset.isElementVisibleId || '');
				setCurrentSectionId(element.id || '');
			}
		});
	};

	useEffect(() => {
		if (!sectionsRef.current) return;

		const observerOptions: IntersectionObserverInit = {
			root: sectionsRef.current,
			rootMargin: '0px',
			threshold: 0.5,
		};

		var observer = new IntersectionObserver(observerCallback, observerOptions);

		sectionsRef.current.childNodes.forEach((section: any) => {
			section.dataset.isElementVisibleId = generateUuid();
			observer.observe(section);
		});
	}, [sectionsRef]);

	useEffect(() => {
		if (currentSection) {
			console.log('Current section: ', currentSection);
		}
	}, [currentSection]);

	useEffect(() => {
		if (currentSectionId) {
			console.log('Current section id: ', currentSectionId);
		}
	}, [currentSectionId]);

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
					ref={sectionsRef as any}
					area="body"
					overflow="auto"
					scrollSnapType="y mandatory"
					scrollPadding={0}
				>
					<BlocksBuilder
						info={{ sections, socialMedias }}
						currentSection={currentSection}
					/>
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
