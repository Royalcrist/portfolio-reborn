import React, { createContext, useState } from 'react';
import { useRouter } from 'next/router';
import useBlockBuilderLinks from '../hooks/useBlockBuilderLinks';
import useIsVisibleReducer from '../hooks/useIsVisibleReducer';

export const ProviderContext = createContext<any>(undefined);

export const Provider = (props: any) => {
	const [color, setColor] = useState('blue');
	const { locale } = useRouter();

	const { state: blockBuilderState, dispatch: blockBuilderDispatch } =
		useBlockBuilderLinks();

	const { isVisibleState, isVisibleDispatch } = useIsVisibleReducer();

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
