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
            className="accordion-button collapsed"
            // aria-expanded = "false"
            aria-expanded="true"
            // toggle
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}
