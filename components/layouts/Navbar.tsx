import { Flex, Icon, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import MobileNavbarMenu from '../overlay/drawers/MobileNavbarMenu';

interface NavbarProps {
	colorName: string;
	sections: any;
	currentSectionId?: string;
}

const Navbar = ({ colorName, sections, currentSectionId }: NavbarProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<>
			<Flex
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				paddingTop={6}
				paddingX={4}
				paddingBottom={2}
			>
				<Flex direction="row" alignItems="baseline">
					<Text fontSize="3xl" fontWeight="bold" color="primary.900">
						Cristian
					</Text>
					<Text
						fontWeight="bold"
						color={`accent.${colorName}`}
						fontSize="5xl"
						lineHeight="normal"
					>
						.
					</Text>
				</Flex>

				<IconButton
					display={{ base: 'initial', md: 'none' }}
					onClick={onOpen}
					aria-label="Menu"
					variant="skeuomorphism"
					boxSize={12}
					icon={
						<Icon
							as={HiOutlineMenuAlt1}
							color="primary.500"
							boxSize={6}
							style={{ transform: 'scaleX(-1)' }}
						/>
					}
				/>
			</Flex>
			<MobileNavbarMenu isOpen={isOpen} onClose={onClose} sections={sections} />
		</>
	);
};

export default Navbar;
