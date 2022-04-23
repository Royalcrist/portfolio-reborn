import React, { useState } from 'react';

export default function useStatus(value = 'hide') {
	const [status, setStatus] = useState(value);

	function handleStatus(e: any) {
		e.stopPropagation();
		status === 'hide' ? setStatus('show') : setStatus('hide');
	}

	return {
		handleStatus,
		status,
	};
}
