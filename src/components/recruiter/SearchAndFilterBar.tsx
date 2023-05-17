import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { FilterModal } from "./FilterModal";
import { AvailableStudentData } from "../../types-fe/student-lists";
import { apiUrl } from "../../config/api";

interface Props {
    list: string;
    onFilter: (data: AvailableStudentData[]) => void;
}

export const SearchAndFilterBar = (props: Props) => {
    const [list, setList] = useState('');
    const [inputVal, setInputVal] = useState<string | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (props.list === 'ALL') {
            setList('available')
        } else {
            setList('reserved-students');
        }
    }, []);

    const setSearchFromLocalState = async (e: FormEvent) => {
        e.preventDefault();

        if (inputVal) {
            const res = await fetch(`${apiUrl}/user/${list}?searchPhrase=${inputVal}`, {
                credentials: 'include',
            });
            const data = await res.json();
            props.onFilter(data);
        }
    }

    return (
        <div className="theme-bg-dark-1 p-2 mt-1 ms-2 me-2">
            <div className="row align-items-center">
                <div className='col-sm-6 d-flex justify-content-start'>
                    <div className='input-group flex-nowrap'>
                        <span className='input-group-text'><i className="bi bi-search"/></span>
                        <form
                            onSubmit={setSearchFromLocalState}
                        >
                            <input className='form-control-search p-2'
                                   type='search'
                                   name='search'
                                   placeholder='Szukaj...'
                                   value={inputVal}
                                   onChange={e => setInputVal(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
                <div className='col-sm-6 d-flex justify-content-sm-end justify-content-start my-2 modal-wrap'>
                    <button
                        className="theme-btn-dark-4 ps-2 pe-3 py-2"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-funnel-fill theme-text-medium-light p-2"/>
                        Filtrowanie
                    </button>
                    <FilterModal showModal={showModal} onFilter={props.onFilter} onClose={() => setShowModal(false)} list={props.list}/>
                </div>
            </div>
        </div>
    )
}