import React, { useRef, useEffect } from "react";

export default function usePrev(value) {
    const ref = useRef();

    useEffect(() => {
        if (
            ref.current + 1 !== value &&
            ref.current - 1 !== value &&
            ref.current !== value
        ) {
            ref.current = value;
        }
    });

    return ref.current;
}
