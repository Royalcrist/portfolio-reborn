import { useEffect, useState } from 'react';

// This is for the calculation of the viewport height in mobile devices.
// Taking into account the browser's status bar height.
const useVh = () => {
	const [vh, setVh] = useState('1vh');

	const handleVh = () => {
		const newVh = window.innerHeight * 0.01;
		setVh(`${newVh}px`);
	};

	useEffect(() => {
		handleVh();

		window.addEventListener('resize', handleVh);
	}, []);

	return vh;
};

export default useVh;
