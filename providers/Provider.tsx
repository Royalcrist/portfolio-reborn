import React, { createContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries/queries';
import { useRouter } from 'next/router';
import useBlockBuilderLinks from '../hooks/useBlockBuilderLinks';
import useVh from '../hooks/useVh';

export const ProviderContext = createContext<any>(undefined);

export const Provider = (props: any) => {
	const [color, setColor] = useState('blue');
	const { locale } = useRouter();

	// Projects
	const {
		data: projectsData,
		loading: projectsLoading,
		error: projectsError,
	} = useQuery(queries('PROJECTS_HOME', locale));

	const { state: blockBuilderState, dispatch: blockBuilderDispatch } =
		useBlockBuilderLinks();

	const vh = useVh();

	return (
		<ProviderContext.Provider
			value={{
				// General
				color,
				setColor,
				locale,

				// Projects
				projectsData,
				projectsLoading,
				projectsError,

				// BlockBuilder
				blockBuilderState,
				blockBuilderDispatch,

				// General
				vh,
			}}
		>
			{props.children}
		</ProviderContext.Provider>
	);
};
