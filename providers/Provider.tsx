import React, { createContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries/queries';
import { useRouter } from 'next/router';
import useBlockBuilderLinks from '../hooks/useBlockBuilderLinks';

export const ProviderContext = createContext<any>(undefined);

export const Provider = (props: any) => {
	const [color, setColor] = useState('blue');
	const { locale } = useRouter();

	const { state: blockBuilderState, dispatch: blockBuilderDispatch } =
		useBlockBuilderLinks();

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
			}}
		>
			{props.children}
		</ProviderContext.Provider>
	);
};
