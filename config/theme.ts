import { extendTheme } from '@chakra-ui/react';
import { StyleConfig } from '@chakra-ui/theme-tools';
import { skeuomorphismBackground } from './classes';

const colors = {
	accent: {
		blue: '#009de3',
		orange: '#ff9438',
		yellow: '#ffbb00',
		red: '#ff2810',
	},
	primary: {
		10: '#f4f4f4',
		50: '#ebebeb',
		100: '#d6d6d6',
		200: '#c2c2c2',
		300: '#adadad',
		400: '#999999',
		500: '#848484',
		600: '#707070',
		700: '#5b5b5b',
		800: '#474747',
		900: '#323232',
	},
	secondary: {
		50: 'rgba(255, 255, 255, 0.1)',
		100: 'rgba(255, 255, 255, 0.2)',
		200: 'rgba(255, 255, 255, 0.3)',
		300: 'rgba(255, 255, 255, 0.4)',
		400: 'rgba(255, 255, 255, 0.5)',
		500: 'rgba(255, 255, 255, 0.6)',
		600: 'rgba(255, 255, 255, 0.7)',
		700: 'rgba(255, 255, 255, 0.8)',
		800: 'rgba(255, 255, 255, 0.9)',
		900: 'rgba(255, 255, 255, 1)',
	},
	backgrounds: {
		light: {
			default: {
				50: 'rgba(255, 255, 255, 0.1)',
				100: 'rgba(255, 255, 255, 0.2)',
				200: 'rgba(255, 255, 255, 0.3)',
				300: 'rgba(255, 255, 255, 0.4)',
				400: 'rgba(255, 255, 255, 0.5)',
				500: 'rgba(255, 255, 255, 0.6)',
				600: 'rgba(255, 255, 255, 0.7)',
				700: 'rgba(255, 255, 255, 0.8)',
				800: 'rgba(255, 255, 255, 0.9)',
				900: 'rgba(255, 255, 255, 1)',
			},
		},
	},
};

const fonts = {
	heading: 'Montserrat',
	body: 'Montserrat',
};

const solidButton = {
	color: 'secondary.900',
	background: 'linear-gradient(-135deg, #00ffcc, #1f77ff)',
	borderRadius: '3xl',
	paddingX: 8,
	paddingY: 6,
};

const Button: StyleConfig = {
	variants: {
		skeuomorphism: {
			...skeuomorphismBackground,
			borderRadius: 12,
		},
		solid: {
			...solidButton,
		},
		solidSecundary: {
			...solidButton,
			background: 'primary.10',
			color: 'primary.500',
		},
		solidBlue: {
			...solidButton,
			background: 'linear-gradient(-135deg, #00ffcc, #1f77ff)',
		},
		solidOrange: {
			...solidButton,
			background: 'linear-gradient(-135deg, #ff9438, #ff4400)',
		},
		solidYellow: {
			...solidButton,
			background: 'linear-gradient(-135deg, #ffbb00, #ff8800)',
		},
		solidRed: {
			...solidButton,
			background: 'linear-gradient(-135deg, #ff7167, #ff2810)',
		},
	},
};

const Heading: StyleConfig = {
	baseStyle: {
		color: 'primary.900',
		fontWeight: 'bold',
	},
};

const Text: StyleConfig = {
	baseStyle: {
		color: 'primary.500',
		fontWeight: 'medium',
		maxW: '45ch',
	},
};

const theme = extendTheme({
	styles: {
		global: {
			html: {
				'@media (max-width: 360px)': {
					fontSize: '14px',
				},
			},
		},
	},
	colors,
	fonts,
	components: {
		Button,
		Heading,
		Text,
	},
});

export default theme;
