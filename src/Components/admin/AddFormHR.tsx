import React, {SyntheticEvent, useState} from "react";
import {apiUrl} from "../../config/api";
import AddFormsSCSS from "./AddFormHR.module.scss";
import {Spinner} from "../Spinner/Spinner";
import {Link} from "react-router-dom";

export const AddFormHR = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        name: '',
        company: '',
        maxReservedStudents: 1,
    });
    const [id, setId] = useState('');

    const updateForm = (key: string, value: any) => {

        setForm(form => ({
            ...form,
            [key]: value,
        }))
    };

    const saveForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        setLoading(true);

        /** temporary console.log for data tests */
        console.log({...form});

        //@TODO set a correct fetch path when it will be ready from BE
    //     try {
    //         const res = await fetch(`${apiUrl}/admin/addHR/save`, {
    //             method: 'POST',
    //             headers: {
    //                 "content-type": "application/json",
    //             },
    //             credentials: 'include',
    //             body: JSON.stringify({
    //                 ...form,
    //             }),
    //         });
    //         const resData = await res.json();
    //
    //         setId(resData.id);
    //
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    //
    // if (loading) {
    //     return <Spinner/>
    // }
    //
    // if (id) {
    //     return <>
    //      <h2>HR <strong>{form.name}</strong> dodany do serwisu.</h2>
    //         <Link to="/">Dodaj kolejnego</Link>
    //     </>
    }

    return (
        <div className="mt-5 ms-5">
            <form onSubmit={saveForm}
                  className="form"
            >
                <h2 className="theme-text-light mb-2">Dodawanie rekrutera/ki</h2>
                <div>
                    <label htmlFor="email"
                           className="form-label theme-text-light">Adres e-mail:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="example@email.com"
                            value={form.email}
                            onChange={event => updateForm('email', event.target.value)}
                            className="form-control"
                        />
                </div>
                <div>
                    <label htmlFor="name"
                           className="form-label theme-text-light">Imię i nazwisko:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder="Full name"
                            maxLength={99}
                            value={form.name}
                            onChange={event => updateForm('name', event.target.value)}
                            className="form-control"
                        />
                </div>
                <div>
                    <label htmlFor="company"
                           className="form-label theme-text-light">Nazwa firmy:</label>
                        <input
                            type="text"
                            name="company"
                            id="company"
                            placeholder="Company"
                            required maxLength={255}
                            value={form.company}
                            onChange={event => updateForm('company', event.target.value)}
                            className="form-control"
                        />
                </div>
                <div>
                    <label htmlFor="maxReservedStudents"
                           className="form-label theme-text-light">Maksymalna liczba osób na liście <em>Do rozmowy</em>:</label>
                        <input
                            type="number"
                            name="maxReservedStudents"
                            id="maxReservedStudents"
                            required
                            min="1"
                            max="999"
                            value={form.maxReservedStudents}
                            onChange={event => updateForm('maxReservedStudents', Number(event.target.value))}
                            className="form-control"
                        />
                </div>
                    <button type="submit" className="btn btn-right mt-3 mb-5 theme-btn-mainbrand px-4">Zapisz</button>
            </form>
        </div>
    )
}