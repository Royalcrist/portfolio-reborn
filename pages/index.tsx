import { Box, Flex, Grid, GridItem, IconButton, Text } from '@chakra-ui/react';
import Head from 'next/head';
import client from '../lib/apollo-client';
import queries from '../queries/queries';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import BlocksBuilder from '../builders/BlocksBuilder';

interface HomeProps {
	sections: any;
	socialMedias: any;
}

const Home = ({ sections, socialMedias }: HomeProps) => {
	console.log(sections);

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
				height="100vh"
			>
				<GridItem area="header">
					<Flex
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						paddingTop={6}
						paddingX={4}
						paddingBottom={2}
					>
						<Flex direction="row" alignItems="baseline">
							<Text fontSize="2xl" fontWeight="bold" color="primary.900">
								Cristian
							</Text>
							<Text
								fontWeight="bold"
								color="accent.blue"
								fontSize="4xl"
								lineHeight="normal"
							>
								.
							</Text>
						</Flex>

						<IconButton
							aria-label="Menu"
							variant="skeuomorphism"
							sx={{ '.menu-icon': { color: 'primary.500' } }}
							size="lg"
							icon={
								<HiOutlineMenuAlt1
									className="menu-icon"
									size={24}
									style={{ transform: 'scaleX(-1)' }}
								/>
							}
						/>
					</Flex>
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
	const { data } = await client.query({
		query: queries('HOME', locale),
	});

	const { data: socialData } = await client.query({
		query: queries('SOCIAL_MEDIA', locale),
	});

	return {
		props: {
			...data.home,
			socialMedias: socialData.socialMedias,
		},
	};
}

export default Home;
