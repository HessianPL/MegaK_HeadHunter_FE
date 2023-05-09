import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import React, {EventHandler, ReactElement, ReactNode} from "react";

interface Props {
    children: ReactNode,
    eventKey: string,
}
export const CustomToggle = ({ children, eventKey }:Props) =>{
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('coś robię...ale to za chwilę'),
    );

    return (
        <button
            type="button"
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}
