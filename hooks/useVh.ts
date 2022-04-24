import { useEffect, useState } from 'react';

// This is for the calculation of the viewport height in mobile devices.
// Taking into account the browser's status bar height.
const useVh = () => {
	const [vhPx, setVhPx] = useState(1);

	const handleVh = () => {
		const newVh = window.innerHeight * 0.01;
		setVhPx(newVh);
	};

	useEffect(() => {
		handleVh();

		window.addEventListener('resize', handleVh);
	}, []);

	const vh = (vhNmuber: number) => {
		return `calc(${vhPx}px * ${vhNmuber})`;
	};

	return {
		vhPx,
		vh,
	};
};

export default useVh;
