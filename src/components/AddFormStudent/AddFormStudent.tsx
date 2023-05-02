import React, {FormEvent, useEffect, useState} from 'react';
import {StudentCVData} from "../../types-fe/StudentCVData";
import {useParams} from "react-router-dom";
import {apiUrl} from "../../config/api";
import {Spinner} from "../Spinner/Spinner";

export const AddFormStudent = () => {
    const [form, setForm] = useState<StudentCVData>({
        id: '',
        email: '',
        tel: 0,
        firstName: '',
        lastName: '',
        githubUsername: '',
        portfolioUrls: [''],
        projectUrls: [''],
        bio: '',
        expectedTypeWork: '',
        targetWorkCity: '',
        expectedContractTpe: '',
        expectedSalary: '',
        canTakeApprenticeship: false,
        monthsOfCommercialExp: 0,
        education: '',
        workExperience: '',
        courses: '',
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const [selected, setSelected] = useState<string>('');
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const {idOfStudent} = useParams();

    //@TODO set a correct fetch path when it will be ready from BE
    // useEffect( () => {
    //     (async () => {
    //         const res = await fetch (`${apiUrl}/student/${idOfStudent}`);
    //         const data = await res.json();
    //         setForm(data);
    //         })();
    // }, []);

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const checkHandler = () => {
        setIsChecked(!isChecked)
    }

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        /** temporary console.log for data tests */
        console.log({...form});

        //@TODO set a correct fetch path when it will be ready from BE
        // try {
        //     const res = await fetch(`${apiUrl}/student/update/${idOfStudent}`, {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             ...form
        //         }),
        //     });
        //     const data: StudentCVData = await res.json();
        //     setResultInfo(`Dane kursanta/-ki ${data.firstName} ${data.lastName} zostały zmienione`)
        // } finally {
        //     setLoading(false);
        // }
        // if (loading) {
        //     return <Spinner/>
        // }
    }

    return <form className="theme-text-light" onSubmit={sendForm}>
        <h1>Formularz studenta</h1>
        <div>
            <label>Adres email:</label>
            <input type='email'
                   name='email'
                   required
                   placeholder='e-mail'
                   value={form.email}
                   onChange={e => updateForm('email', e.target.value)}
            />
        </div>
        <div>
            <label>Numer telefonu:</label>
            <input type='number'
                   name='tel'
                   placeholder='Numer telefonu'
                   value={form.tel}
                   onChange={e => updateForm('tel', e.target.value)}
            />
        </div>
        <div>
            <label>Imie:</label>
            <input type='text'
                   name='firstName'
                   required
                   placeholder='Imię'
                   value={form.firstName}
                   onChange={e => updateForm('firstName', e.target.value)}
            />
        </div>
        <div>
            <label>Nazwisko:</label>
            <input type='text'
                   name='lastName'
                   required
                   placeholder='Nazwisko'
                   value={form.lastName}
                   onChange={e => updateForm('lastName', e.target.value)}
            />
        </div>
        <div>
            <label>GitHub Username:</label>
            <input type='text'
                   name='githubUsername'
                   required
                   placeholder='GitHub Username'
                   value={form.githubUsername}
                   onChange={e => updateForm('githubUsername', e.target.value)}
            />
        </div>
        <div>
            <label>Portfolio:</label>
            <input type='url'
                   name='portfolioUrls'
                   placeholder='Wstaw link do projektu'
                   value={form.portfolioUrls}
                   onChange={e => updateForm('portfolioUrls', e.target.value)}
            />
        </div>
        <div>
            <label>Projekt zaliczeniowy:</label>
            <input type='url'
                   name='projectUrls'
                // required
                   placeholder='Wstaw link'
                   value={form.projectUrls}
                   onChange={e => updateForm('projectUrls', e.target.value)}
            />
        </div>
        <div>
            <label>Bio:</label>
            <textarea name='bio'
                      placeholder='Napisz coś o sobie'
                      value={form.bio}
                      onChange={e => updateForm('bio', e.target.value)}
            />
        </div>
        <div>
            <label>Oczekiwany miejsce zatrudnienia:</label>
            <select value={selected}
                    onChange={e => {
                        setSelected(e.target.value)
                    }
                    }>
                <option>Bez znaczenia</option>
                <option>Na miejscu</option>
                <option>Gotowość do przeprowadzki</option>
                <option>Wyłacznie zdalnie</option>
                <option>Hybrydowo</option>
            </select>
        </div>
        <div>
            <label>Preferowane miasto zatrudnienia:</label>
            <input type='text'
                   name='targetWorkCity'
                   placeholder='Miasto'
                   value={form.targetWorkCity}
                   onChange={e => updateForm('targetWorkCity', e.target.value)}
            />
        </div>
        <div>
            <label>Oczekiwany typ zatrudnienia:</label>
            <select value={selected}
                    onChange={e => {
                        setSelected(e.target.value)
                    }
                    }>
                <option>Brak preferencji</option>
                <option>Tylko UoP</option>
                <option>Możliwe B2B</option>
                <option>Możliwe UZ/UoP</option>
            </select>
        </div>
        <div>
            <label>Oczekiwane wynagrodzenie:</label>
            <input type='text'
                   name='expectedSalary'
                   placeholder='Podaj kwotę'
                   value={form.expectedSalary}
                   onChange={e => updateForm('expectedSalary', e.target.value)}
            />
        </div>
        <div>
            <label htmlFor='canTakeApprenticeship'>Wyrażam zgode na odbycie bezpłatnych praktyk/stażu:</label>
            <input type='checkbox'
                   name='canTakeApprenticeship'
                   checked={isChecked}
                   onChange={e => {
                       checkHandler()
                       updateForm('canTakeApprenticeship', e.target.value)
                   }}
            />
        </div>
        <div>
            <label>Ilość miesięcy doświadczenia komercyjnego:</label>
            <input type='number'
                   name='monthsOfCommercialExp'
                   required
                   placeholder='Podaj liczbę'
                   value={form.monthsOfCommercialExp}
                   onChange={e => updateForm('monthsOfCommercialExp', e.target.value)}
            />
        </div>
        <div>
            <label>Wykształcenie:</label>
            <textarea name='education'
                   placeholder='Napisz o swoim wykształceniu'
                   value={form.education}
                   onChange={e => updateForm('education', e.target.value)}
            />
        </div>
        <div>
            <label>Doświadczenie zawodowe:</label>
            <textarea name='workExperience'
                      placeholder='Opisz przebieg swojej kariery zawodowej'
                      value={form.workExperience}
                      onChange={e => updateForm('workExperience', e.target.value)}
            />
        </div>
        <div>
            <label>Ukończone kursy:</label>
            <textarea name='courses'
                      placeholder='Pochwal się ukończonymi kursami'
                      value={form.courses}
                      onChange={e => updateForm('courses', e.target.value)}
            />
        </div>


        <button type='submit'>Zapisz</button>

    </form>
}