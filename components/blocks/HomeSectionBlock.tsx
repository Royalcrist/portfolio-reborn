import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	Text,
	VStack,
} from '@chakra-ui/react';
import { apiBase, capitalizeFirstLetter } from '../../lib/helpers';
import Image from 'next/image';
import Link from 'next/link';
import useVh from '../../hooks/useVh';
import { useContext, useEffect, useRef, useState } from 'react';
import { ProviderContext } from '../../providers/Provider';
import useIsVisible from '../../hooks/useIsVisible';

interface HomeSectionBlockProps {
	id: string;
	title: string;
	image: any;
	linkId: string;
	color: any;
	actionText?: any;
	description?: string;
	upperTitle?: string;
	url?: string;
	contactLinks?: any[];
}

const HomeSectionBlock = ({
	id,
	title,
	upperTitle,
	description,
	image,
	actionText,
	color,
	contactLinks,
	url,
}: HomeSectionBlockProps) => {
	const { vh } = useVh();

	const ref = useRef<HTMLDivElement>(null);
	const isVisible = useIsVisible(ref);
	const { setColor } = useContext(ProviderContext);

	useEffect(() => {
		if (isVisible) {
			setColor(color.name);
		}
	}, [color.name, isVisible, setColor]);

	return (
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
		>
			<GridItem alignSelf="center">
				<VStack align="start" gap={4} paddingX={4}>
					<Box>
						{upperTitle && <Heading size="lg">{upperTitle}</Heading>}
						<Heading size="2xl">{title}</Heading>
						{description && <Text>{description}</Text>}
					</Box>
					{actionText && url && (
						<Link href={url} passHref>
							<Button variant={`solid${capitalizeFirstLetter(color.name)}`}>
								{actionText.title}
							</Button>
						</Link>
					)}
					<VStack gap={1} width="100%">
						{contactLinks &&
							contactLinks.map((link: any) => (
								<Link key={link.id} href={link.url} passHref>
									<Button
										variant="solidSecundary"
										width="100%"
										textAlign="start"
									>
										<Flex
											direction="row"
											alignItems="center"
											justifyContent="start"
											width="100%"
											gap={3}
										>
											<Box boxSize={6} opacity={0.5}>
												<Image
													alt={link.text}
													src={apiBase(link.icon.url)}
													layout="responsive"
													height={link.icon.height}
													width={link.icon.width}
												/>
											</Box>
											<Text maxW={{ base: '24ch', sm: 'initial' }} isTruncated>
												{link.title}
											</Text>
										</Flex>
									</Button>
								</Link>
							))}
					</VStack>
				</VStack>
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
						/>
					</Box>
				</Flex>
			</GridItem>
		</Grid>
	);
};

export default HomeSectionBlock;
