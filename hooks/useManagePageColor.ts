import { useContext, useEffect, useRef } from 'react';
import { ProviderContext } from '../providers/Provider';
import useIsVisible from './useIsVisible';

const useManagePageColor = (color: string) => {
	const ref = useRef<HTMLDivElement>(null);
	const isVisible = useIsVisible(ref);
	const { setColor } = useContext(ProviderContext);

	useEffect(() => {
		if (isVisible) {
			setColor(color);
		}
	}, [ref, color, isVisible, setColor]);

	return ref;
};

export default useManagePageColor;
