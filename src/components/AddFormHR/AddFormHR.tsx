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

        //@TODO set a correct fetch path when it will be ready from BE
        try {
            const res = await fetch(`${apiUrl}/admin/addHR/save`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                }),
            });
            const resData = await res.json();

            setId(resData.id);

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>
    }

    if (id) {
        return <>
         <h2>HR <strong>{form.name}</strong> dodany do serwisu.</h2>
            <Link to="/">Dodaj kolejnego</Link>
        </>
    }

    return (<div className={AddFormsSCSS.container}>
            <form onSubmit={saveForm}>
                <h1>Dodawanie HR</h1>
                <hr/>
                <p>
                    <label>
                        Adres e-mail: <br/>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="example@email.com"
                            value={form.email}
                            onChange={event => updateForm('email', event.target.value)}/>
                    </label>
                </p>
                <p>
                    <label>
                        Imię i nazwisko: <br/>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Full name"
                            maxLength={99}
                            value={form.name}
                            onChange={event => updateForm('name', event.target.value)}/>
                    </label>
                </p>
                <p>
                    <label>
                        Nazwa firmy: <br/>
                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            required maxLength={255}
                            value={form.company}
                            onChange={event => updateForm('company', event.target.value)}/>
                    </label>
                </p>
                <p>
                    <label>
                        Maksymalna liczba osób, jakie może dodać do listy "Do rozmowy" jednocześnie: <br/>
                        <input
                            type="number"
                            name="maxReservedStudents"
                            required
                            min="1"
                            max="999"
                            value={form.maxReservedStudents}
                            onChange={event => updateForm('maxReservedStudents', Number(event.target.value))}/>
                    </label>
                </p>
                <button type="submit">SAVE</button>
            </form>
        </div>
    )
}
