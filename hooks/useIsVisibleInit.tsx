import { RefObject, useCallback, useContext, useEffect, useState } from 'react';
import { generateUuid } from '../lib/helpers';
import { ProviderContext } from '../providers/Provider';

const useIsVisibleInit = (ref: RefObject<HTMLDivElement>) => {
	const { isVisibleDispatch } = useContext(ProviderContext);
	const [isRefUpdating, setIsRefUpdating] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		const observerCallback: MutationCallback = (mutations, observer) => {
			mutations.forEach(mutation => {
				if (mutation.type === 'childList' && !isRefUpdating) {
					setIsRefUpdating(true);
				}
			});
		};

		const observer = new MutationObserver(observerCallback);

		observer.observe(ref.current as Node, {
			attributes: true,
			childList: true,
			subtree: true,
		});
	}, [isRefUpdating, ref]);

	const observerCallback: IntersectionObserverCallback = useCallback(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const element: HTMLElement = entry.target as HTMLElement;
					isVisibleDispatch({
						type: 'SELECT',
						payload: {
							currentElement: element,
							currentElementId: element.dataset.isElementVisibleId || '',
							currentIndex: Number(element.dataset.isElementVisibleIndex) || 0,
						},
					});
				}
			});
		},
		[isVisibleDispatch],
	);

	useEffect(() => {
		if (!ref.current) return;

		const observerOptions: IntersectionObserverInit = {
			root: ref.current,
			rootMargin: '0px',
			threshold: 0.5,
		};

		var observer = new IntersectionObserver(observerCallback, observerOptions);

		ref.current.childNodes.forEach((section: any, index: number) => {
			section.dataset.isElementVisibleId = generateUuid();
			section.dataset.isElementVisibleIndex = index;
			observer.observe(section);
		});

		isVisibleDispatch({
			type: 'INIT',
			payload: {
				root: ref.current,
				totalElements: ref.current.childNodes.length,
			},
		});

		if (isRefUpdating) setIsRefUpdating(false);
	}, [isRefUpdating, isVisibleDispatch, observerCallback, ref]);
};

export default useIsVisibleInit;
