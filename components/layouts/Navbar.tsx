import { Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';

const Navbar = ({ color }: { color: any }) => {
	return (
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
					color={`accent.${color}`}
					fontSize="5xl"
					lineHeight="normal"
				>
					.
				</Text>
			</Flex>

			<IconButton
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
	);
};

export default Navbar;
