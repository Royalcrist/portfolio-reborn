import {
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Grid,
	GridItem,
	Icon,
	IconButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { HiX } from 'react-icons/hi';
import { skeuomorphismBackground } from '../../../config/classes';
import { getSectionId, stringToSlug } from '../../../lib/helpers';

interface MobileNavbarMenuProps {
	isOpen: boolean;
	onClose: () => void;
	sections: any;
	currentSection: any;
}

const MobileNavbarMenu = ({
	isOpen,
	onClose,
	sections,
	currentSection,
}: MobileNavbarMenuProps) => {
	return (
		<Drawer isOpen={isOpen} onClose={onClose} size="full">
			<DrawerOverlay />
			<DrawerContent padding={8}>
				<DrawerHeader>
					<Flex direction="row" justifyContent="end">
						<IconButton
							onClick={onClose}
							aria-label="Close Button"
							icon={<Icon as={HiX} />}
						/>
					</Flex>
				</DrawerHeader>
				<DrawerBody>
					<Grid
						templateColumns="1fr"
						templateRows="1fr auto"
						height="100%"
						alignItems="center"
					>
						<GridItem>
							<Flex
								direction="column"
								padding={4}
								borderRadius={40}
								gap={4}
								marginBottom={16}
								{...skeuomorphismBackground}
							>
								{sections.map((section: any) => {
									const isSelected = section.id === currentSection?.id;

									return (
										<Link
											key={'mobile-navbar-btn' + section.id}
											href={`#${getSectionId(section)}`}
											passHref
										>
											<Button
												variant={isSelected ? 'solidWhite' : 'ghost'}
												onClick={onClose}
											>
												{section.linkTitle || section.title}
											</Button>
										</Link>
									);
								})}
							</Flex>
						</GridItem>
						<GridItem justifySelf="center">
							<Button>Languages</Button>
						</GridItem>
					</Grid>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default MobileNavbarMenu;
