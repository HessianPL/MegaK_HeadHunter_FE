import React from "react";

interface Props {
    data: string[],
    removeItem: (index:number)=> void
}
export const UrlsList = (props: Props) => {
    return (
        <ul>
            {props.data.map((url, index) => (
                <div key={index}><li>{url}</li><button onClick={() => props.removeItem(index)}>-</button></div>
            ))}

        </ul>
    );
}