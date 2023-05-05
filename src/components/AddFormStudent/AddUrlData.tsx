import React, {useState} from 'react';
import {UrlsList} from "./UrlsList";

interface Props {
    labelText: string,
    urlsData: string[],
    name: string,
    updateForm: (key: string, value: any) => void,
}

export const AddUrlData = (props: Props) => {
    const [urlsArray, setUrlsArray] = useState<string[]>([]);
    const [newUrl, setNewUrl] = useState<string>('');

    const addStringToArray = () => {
        setUrlsArray([...urlsArray, newUrl]);
        setNewUrl('');
    }
    const removeItem = (i: number) => {
        const updateUrlsArray = [...props.urlsData]?.length ?? 0 > 0 ? [...props.urlsData] : undefined;
        if (Array.isArray(updateUrlsArray)) {
            updateUrlsArray.splice(i, 1);
            setUrlsArray(updateUrlsArray);
        }
    }
    return <div>
        <label>{props.labelText}</label>
        <input type='url'
               name={props.name}
               placeholder='Wstaw link'
               value={newUrl}
               onChange={(e) => {
                   setNewUrl(e.target.value)
                   props.updateForm(props.name, [...urlsArray, e.target.value])
               }}
        />
        <button onClick={addStringToArray}>+Dodaj projekt</button>
        <UrlsList data={urlsArray} removeItem={removeItem}/>
    </div>
}