import { useReducer } from 'react';

const initialState = {
	links: {},
};

export default function useBlockBuilderLinks() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return { state, dispatch };
}

function reducer(state: any, action: any) {
	switch (action.type) {
		case 'ADD':
			return {
				...state,
				links: { ...state.links, [action.payload.id]: action.payload },
			};
		case 'RESET':
			return { ...initialState };
		default:
			return state;
	}
}
