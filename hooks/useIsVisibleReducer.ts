import { useReducer } from 'react';
import { IsVisibleState } from '../types/common';

const isVisibleInitialState = {
	currentElement: null,
	currentElementId: null,
	currentIndex: 0,
	totalElements: 0,
	root: null,
};

const useIsVisibleReducer = () => {
	const [isVisibleState, isVisibleDispatch] = useReducer(
		isVisibleReducer,
		isVisibleInitialState,
	);

	return { isVisibleState, isVisibleDispatch };
};

const isVisibleReducer = (state: IsVisibleState, action: any) => {
	switch (action.type) {
		case 'INIT':
			return setInitIsVisibleState(action.payload);
		case 'SELECT':
			return setIsVisibleSelected(state, action.payload);
		default:
			return state;
	}
};

const setInitIsVisibleState = (payload: any): IsVisibleState => {
	const { root, totalElements } = payload;
	return {
		...isVisibleInitialState,
		root,
		totalElements,
	};
};

const setIsVisibleSelected = (
	state: IsVisibleState,
	payload: any,
): IsVisibleState => {
	const { currentElement, currentElementId, currentIndex } = payload;
	return {
		...state,
		currentElement,
		currentElementId,
		currentIndex,
	};
};

export default useIsVisibleReducer;
