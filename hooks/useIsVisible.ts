import { RefObject, useContext, useEffect, useState } from 'react';
import { ProviderContext } from '../providers/Provider';

const useIsVisible = (ref: RefObject<HTMLElement>) => {
	const [isVisible, setIsVisible] = useState(false);
	const { isVisibleState } = useContext(ProviderContext);

	useEffect(() => {
		if (ref.current && isVisibleState.currentElement) {
			setIsVisible(
				ref.current.dataset.isElementVisibleId ==
					isVisibleState.currentElement.dataset.isElementVisibleId,
			);
		}
	}, [isVisibleState, ref]);

	return isVisible;
};

export default useIsVisible;
