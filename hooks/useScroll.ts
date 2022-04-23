import React, { useState, useEffect } from 'react';

export default function useScroll(initialValue: number = 0) {
	const [value, setValue] = useState(initialValue);
	const [index, setIndex] = useState(initialValue);

	function handleScroll(e: any) {
		setIndex(Math.round((e.target.scrollTop / e.target.scrollHeight) * 100));
	}

	useEffect(() => {
		if (index !== value) {
			setValue(index);
		}
	}, [index, value]);

	return {
		value,
		onScroll: handleScroll,
	};
}
