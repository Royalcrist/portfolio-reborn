import { useState, useEffect } from 'react';
import usePrev from './usePrev';

export default function useIndicator(
	scroll: number,
	scrollParts = 3,
	tolerance = 1,
) {
	const [index, setIndex] = useState(1);
	const prev = usePrev(index);

	function handleIndicator(newScroll: number) {
		let indexValue = 1;

		if (newScroll == 0) {
			return indexValue;
		}

		// Porcentage size of scroll
		const partPercent = 100 / scrollParts;

		let partCounter = partPercent;

		while (partPercent * indexValue - tolerance < newScroll) {
			partCounter += partPercent;
			indexValue++;
		}

		return indexValue;
	}

	useEffect(() => {
		const newIndex = handleIndicator(scroll);

		if (newIndex != index) setIndex(newIndex);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scroll, index]);

	return {
		value: index,
		prev,
	};
}
