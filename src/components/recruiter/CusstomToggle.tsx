import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import React, {ReactNode, useState} from "react";

interface Props {
    children: ReactNode,
    eventKey: string,
}
export const CustomToggle = ({ children, eventKey }:Props) =>{

    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('rozwiń'),
    );

    return (
        <button
            type="button"
            className="btn collapsed border-0 theme-bg-dark-1 mt-3"
            aria-expanded="true"
            onClick={decoratedOnClick}
        >
            {children}
            <i className="bi bi-chevron-down theme-text-medium-light fs-4"/>
            {/*<i className="bi bi-chevron-up theme-text-medium-light fs-4"/>*/}
        </button>
    );
}
