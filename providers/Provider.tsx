import React, { createContext, useReducer, useState } from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries/queries';
import { useRouter } from 'next/router';
import useBlockBuilderLinks from '../hooks/useBlockBuilderLinks';
import { IsVisibleState } from '../types/common';

export const ProviderContext = createContext<any>(undefined);

const isVisibleInitialState = {
	currentElement: null,
	currentElementId: null,
	currentIndex: 0,
	totalElements: 0,
	root: null,
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

export const Provider = (props: any) => {
	const [color, setColor] = useState('blue');
	const { locale } = useRouter();

	const { state: blockBuilderState, dispatch: blockBuilderDispatch } =
		useBlockBuilderLinks();

	const [isVisibleState, isVisibleDispatch] = useReducer(
		isVisibleReducer,
		isVisibleInitialState,
	);

	return (
		<ProviderContext.Provider
			value={{
				// General
				color,
				setColor,
				locale,

				// BlockBuilder
				blockBuilderState,
				blockBuilderDispatch,

				// IsVisible
				isVisibleState,
				isVisibleDispatch,
			}}
		>
			{props.children}
		</ProviderContext.Provider>
	);
};
