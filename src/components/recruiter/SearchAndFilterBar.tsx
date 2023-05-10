import React, {SyntheticEvent, useState} from "react";
import {Link} from "react-router-dom";

export const SearchAndFilterBar = () => {
    const [search, setSearch] = useState('')
    const [inputVal, setInputVal] = useState<string>(search);

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
                                   type='text'
                                   name='search'
                                   placeholder='Szukaj...'
                                   value={inputVal}
                                   onChange={e => setInputVal(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <div className='col-sm-6 d-flex justify-content-sm-end justify-content-start my-2'>
                    <Link to='/recruiter/filter' className="theme-btn-dark-4 p-2">
                        <i className="bi bi-funnel-fill theme-text-medium-light p-2"/>
                        Filtrowanie
                    </Link>
                </div>
            </div>
        </div>
    )
}