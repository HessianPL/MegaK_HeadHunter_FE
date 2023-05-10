import React, {SyntheticEvent, useState} from "react";
import {apiUrl} from "../../config/api";
import {Spinner} from "../common/Spinner/Spinner";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";

export const AddFormHR = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
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

        try {
            const res = await fetch(`${apiUrl}/register/form`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(form),
            });
            const resData = await res.json();

            if (resData.message === 'ok') {
                setId(resData.id);
                toast.success('Dane zostały poprawnie zaimportowane.');
                setForm({
                    email: '',
                    firstName: '',
                    lastName: '',
                    company: '',
                    maxReservedStudents: 1,
                })
            } else {
                toast.error('Wystąpił błąd podczas importu danych. Dane nie zostały zaimportowane.');
            }

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>
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
                    <label htmlFor="firstName"
                           className="form-label theme-text-light">Imię:</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        placeholder="First name"
                        maxLength={99}
                        value={form.firstName}
                        onChange={event => updateForm('firstName', event.target.value)}
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="lastName"
                           className="form-label theme-text-light">Nazwisko:</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        placeholder="Last name"
                        maxLength={99}
                        value={form.lastName}
                        onChange={event => updateForm('lastName', event.target.value)}
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