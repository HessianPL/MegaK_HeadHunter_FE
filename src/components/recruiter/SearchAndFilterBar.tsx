import React, {SyntheticEvent, useState} from "react";
import {Link} from "react-router-dom";
import { FilterModal } from "./FilterModal";

export const SearchAndFilterBar = () => {
    const [search, setSearch] = useState('') // to trzeba przenieść do contexts
    const [inputVal, setInputVal] = useState<string>(search);
    const [showModal, setShowModal] = useState(false);
    const [filterOption, setFilterOption] = useState('') // nie wiem czy tego też nie przenieść do contexts

    // search i filterOption trzeba dodać do parametrów ścieżki w fetchu
    // Query dla BE czy jakoś tak = `SELECT * FROM 'nazwa tabeli' WHERE column_name LIKE `%${search}%` AND filter_column = `${filterOption}``

    const filter = () => {
        console.log('filtrujemy');
    }

    const setSearchFromLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputVal);
    }
    console.log(search)
    return (
        <div className="theme-bg-dark-1 p-2 mt-1 ms-2 me-2">
            <div className="row align-items-center">
                <div className='col-sm-6 d-flex justify-content-start'>
                    <form onChange={setSearchFromLocalState}>
                        <div className='input-group flex-nowrap'>
                            <span className='input-group-text'><i
                            className="bi bi-search"/></span>
                            <input className='form-control-search'
                                   type='search'
                                   name='search'
                                   placeholder='Szukaj...'
                                   value={inputVal}
                                   onChange={e => setInputVal(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <div className='col-sm-6 d-flex justify-content-sm-end justify-content-start my-2 modal-wrap'>
                    <button
                        className="theme-btn-dark-4 ps-2 pe-3 py-2"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-funnel-fill theme-text-medium-light p-2"/>
                        Filtrowanie
                    </button>
                    <FilterModal showModal={showModal} onSend={filter} onClose={() => setShowModal(false)}/>
                </div>
            </div>
        </div>
    )
}