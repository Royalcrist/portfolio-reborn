import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	Icon,
	IconButton,
	Spinner,
	Text,
	VStack,
} from '@chakra-ui/react';
import { apiBase, capitalizeFirstLetter } from '../../lib/helpers';
import Image from 'next/image';
import Link from 'next/link';
import useVh from '../../hooks/useVh';
import { useContext, useRef, useState } from 'react';
import { ProviderContext } from '../../providers/Provider';
import { useQuery } from '@apollo/client/react';
import queries from '../../queries/queries';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import useIsVisible from '../../hooks/useIsVisible';

interface ProjectSectionBlockProps {
	id: string;
	autoScroll?: boolean;
}

const ProjectSectionBlock = ({ id, autoScroll }: ProjectSectionBlockProps) => {
	const { vh } = useVh();

	const [index, setIndex] = useState(0);
	const [projectCount, setProjectCount] = useState(0);
	const { locale } = useRouter();
	const [isImageLoading, setIsImageLoading] = useState(true);

	const projectsLimit = 10;

	const { data, loading, error } = useQuery(
		queries(['PROJECTS_HOME', 'PROJECTS_COUNT']),
		{
			variables: {
				locale,
				// TODO: Add pagination
				projectsLimit: projectsLimit,
				projectsStart: 0,
			},
		},
	);

	useEffect(() => {
		if (data && !loading) {
			setProjectCount(data.projectsCount);
		}
	}, [data, loading]);

	const {
		name,
		description,
		homepageImage: image,
		color,
		actionText,
		commingSoon,
		commingSoonText,
		slug,
	} = data?.projects[index] || {};

	const handlePrev = () => {
		if (index > 0) {
			setIndex(index - 1);
		}
	};

	const handleNext = () => {
		if (index + 1 < projectCount) {
			setIndex(index + 1);
		}
	};

	const ref = useRef<HTMLDivElement>(null);
	const isVisible = useIsVisible(ref);
	const { setColor } = useContext(ProviderContext);

	useEffect(() => {
		if (isVisible && color && color.name) {
			setColor(color.name);
		}
	}, [color, isVisible, setColor]);

	return loading ? (
		<Flex
			height="100%"
			alignItems="center"
			justifyContent="center"
			scrollSnapAlign="start"
			scrollSnapStop="always"
		>
			<Spinner size="xl" color="primary.500" />
		</Flex>
	) : (
		<Grid
			ref={ref}
			id={id}
			templateColumns={{ base: '1fr' }}
			templateRows={{ base: '1fr 1fr' }}
			height="100%"
			scrollSnapAlign="start"
			scrollSnapStop="always"
			overflow="hidden"
			gap={12}
			paddingTop={{
				base: vh(4),
			}}
			paddingBottom={{
				base: '1px',
				sm: 0,
			}}
			position="relative"
		>
			{isImageLoading && (
				<Flex
					height="100%"
					width="100%"
					alignItems="center"
					justifyContent="center"
					scrollSnapAlign="start"
					scrollSnapStop="always"
					backgroundColor="secondary.900"
					position="absolute"
					left={0}
					top={0}
					zIndex={1}
				>
					<Spinner size="xl" color="primary.500" />
				</Flex>
			)}
			<GridItem alignSelf="center">
				<Grid
					templateColumns="auto 1fr auto"
					templateRows="1fr"
					templateAreas='"previuos info next"'
					alignItems="center"
					gap={4}
					paddingX={4}
				>
					<GridItem>
						{/* TODO: Translate the ariaLabel */}
						<IconButton
							aria-label="Previuos project"
							variant="ghost"
							marginBottom={12}
							size="lg"
							onClick={handlePrev}
							icon={
								<Box marginTop={1}>
									<Icon color="primary.500" as={HiChevronLeft} boxSize={8} />
								</Box>
							}
						/>
					</GridItem>
					<GridItem area="info">
						<VStack align="start" gap={4}>
							<Box>
								<Heading size="2xl">{name}</Heading>
								{description && <Text noOfLines={3}>{description}</Text>}
							</Box>
							{actionText && slug && (
								<Link href={commingSoon ? `/projects/${slug}` : ''} passHref>
									<Button
										variant={`solid${capitalizeFirstLetter(color.name)}`}
										disabled={commingSoon}
									>
										{commingSoon ? commingSoonText.title : actionText.title}
									</Button>
								</Link>
							)}
						</VStack>
					</GridItem>
					<IconButton
						marginBottom={12}
						aria-label="Previuos project"
						variant="ghost"
						onClick={handleNext}
						icon={
							<Box marginTop={1}>
								<Icon color="primary.500" as={HiChevronRight} boxSize={8} />
							</Box>
						}
					/>
				</Grid>
			</GridItem>
			<GridItem>
				<Flex
					direction="column"
					justifyContent="end"
					height="100%"
					width="100%"
				>
					<Box position="relative" height="100%" width="100%">
						<Image
							alt={image.alternativeText}
							src={apiBase(image.url)}
							layout="fill"
							objectFit="contain"
							objectPosition="left bottom"
							onLoadingComplete={() => setIsImageLoading(false)}
						/>
					</Box>
				</Flex>
			</GridItem>
		</Grid>
	);
};

export default ProjectSectionBlock;
