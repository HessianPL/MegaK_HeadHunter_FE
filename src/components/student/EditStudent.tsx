import React, { FormEvent, useContext, useEffect, useState } from "react";
import { apiUrl } from "../../config/api";
import {
	EditStudentForm,
	ExpectedContractType,
	ExpectedWorkType,
	StudentStatus
} from "../../types-fe/student-entity";
import { UserContext } from "../../contexts/user-context";
import { Spinner } from "../common/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { StudentForm } from "../../types-fe/student-form";

export const EditStudent = () => {
	const [form, setForm] = useState<StudentForm>({
		id: '',
		email: '',
		firstName: '',
		lastName: '',
		tel: '',
		bio: '',
		canTakeApprenticeship: false,
		courses: '',
		education: '',
		expectedContractType: ExpectedContractType.Any,
		expectedSalary: 0,
		expectedTypeWork: ExpectedWorkType.Any,
		githubUsername: '',
		monthsOfCommercialExp: 0,
		portfolioUrls: '',
		projectUrls: '',
		status: StudentStatus.Available,
		targetWorkCity: '',
		workExperience: '',
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState('');
	const [workSelected, setWorkSelected] = useState<string>(form.expectedTypeWork === null ? ExpectedWorkType.Any : form.expectedTypeWork);
	const [contractSelected, setContractSelected] = useState<string>(form.expectedContractType === null ? ExpectedContractType.Any : form.expectedContractType);
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const { id } = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const res = await fetch(`${apiUrl}/user/student-profile`, {
				credentials: 'include',
			});
			const data = await res.json();
			const res2 = await fetch (`${apiUrl}/user/email/${id}`, {
				credentials: 'include',
			});
			const email = (await res2.json()).email;

			setForm({
				id: data.id,
				email: email,
				firstName: data.firstName,
				lastName: data.lastName,
				tel: data.tel,
				bio: data.bio,
				canTakeApprenticeship: data.canTakeApprenticeship,
				courses: data.courses,
				education: data.education,
				expectedContractType: data.expectedContractType,
				expectedSalary: data.expectedSalary,
				expectedTypeWork: data.expectedTypeWork,
				githubUsername: data.githubUsername,
				monthsOfCommercialExp: data.monthsOfCommercialExp,
				portfolioUrls: (data.portfolioUrls).toString(),
				projectUrls: (data.projectUrls).toString(),
				status: data.status,
				targetWorkCity: data.targetWorkCity,
				workExperience: data.workExperience,
			})
		})();
	}, []);

	const updateForm = (key: string, value: any) => {
		setForm(form => ({
			...form,
			[key]: value,
		}));
	};

	const checkHandler = () => {
		setIsChecked(!isChecked)
	}

	const handleUrls = (input: string) => {
		return input.split("\n");
	}

	const sendForm = async (e: FormEvent) => {
		e.preventDefault();

		setLoading(true);

		try {
		    const res = await fetch(`${apiUrl}/user/update-profile`, {
		        method: 'PATCH',
		        headers: {
		            'Content-Type': 'application/json',
		        },
		        body: JSON.stringify({
		            ...form,
					portfolioUrls: handleUrls(form.portfolioUrls),
					projectUrls: handleUrls(form.projectUrls),
		        } as EditStudentForm),
		    });

		    const response = await res.json();

			if (response.message === 'ok') {
				navigate('/student');
			} else {
				setMessage(response.message);
			}

		} finally {
		    setLoading(false);
		}
	}

	if (loading) {
		return <Spinner/>
	}

	return <>
		<form className="theme-text-light" onSubmit={sendForm}>
			<h1>Edycja profilu</h1>
			<div>
				<label
					htmlFor="email">Adres email:</label>
				<input type='email'
					   name='email'
					   id='email'
					   required
					   placeholder='e-mail@mail.com'
					   value={form.email}
					   onChange={e => updateForm('email', e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="tel"
				>Numer telefonu:</label>
				<input type='text'
					   name='tel'
					   id='tel'
					   placeholder='987654321'
					   value={form.tel}
					   onChange={e => updateForm('tel', e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="firstName"
				>Imię:</label>
				<input type='text'
					   name='firstName'
					   id='firstName'
					   required
					   placeholder='Imię'
					   value={form.firstName}
					   onChange={e => updateForm('firstName', e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="lastName"
				>Nazwisko:</label>
				<input type='text'
					   name='lastName'
					   id='lastName'
					   required
					   placeholder='Nazwisko'
					   value={form.lastName}
					   onChange={e => updateForm('lastName', e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="githubUsername"
				>GitHub Username:</label>
				<input type='text'
					   name='githubUsername'
					   id='githubUsername'
					   required
					   placeholder='GitHub Username'
					   value={form.githubUsername}
					   onChange={e => updateForm('githubUsername', e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="portfolioUrls"
				>Linki do portfolio:</label>
				<textarea
					name="portfolioUrls"
					id="portfolioUrls"
					placeholder="https://portfolio1.com"
					value={form.portfolioUrls}
					onChange={e => updateForm('portfolioUrls', e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="projectUrls"
				>Linki do projektu indywidualnego:</label>
				<textarea
					name="projectUrls"
					id="projectUrls"
					placeholder="https://project1.com"
					value={form.projectUrls}
					onChange={e => updateForm('projectUrls', e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="bio"
				>Bio:</label>
				<textarea
					name='bio'
					id='bio'
					placeholder='Napisz coś o sobie'
					value={form.bio}
					onChange={e => updateForm('bio', e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="expectedWorkType"
				>Oczekiwana forma zatrudnienia:</label>
				<select
					name='expectedWorkType'
					id='expectedWorkType'
					value={workSelected}
					onChange={e => {
						setWorkSelected(e.target.value as ExpectedWorkType)
						updateForm('expectedWorkType', e.target.value);
					}
					}>
					<option>{form.expectedTypeWork === null ? ExpectedWorkType.Any : form.expectedTypeWork}</option>
					<option value={ExpectedWorkType.Hybrid}>{ExpectedWorkType.Hybrid}</option>
					<option value={ExpectedWorkType.CanMoveOut}>{ExpectedWorkType.CanMoveOut}</option>
					<option value={ExpectedWorkType.Static}>{ExpectedWorkType.Static}</option>
					<option value={ExpectedWorkType.RemoteOnly}>{ExpectedWorkType.RemoteOnly}</option>
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
				<select value={contractSelected}
						onChange={(e) => {
							setContractSelected(e.target.value as ExpectedContractType);
							updateForm('expectedContractType', e.target.value);
						}
						}>
					<option>{form.expectedContractType === null ? ExpectedContractType.Any : form.expectedContractType}</option>
					<option value={ExpectedContractType.UoPOnly}>{ExpectedContractType.UoPOnly}</option>
					<option value={ExpectedContractType.B2B}>{ExpectedContractType.B2B}</option>
					<option value={ExpectedContractType.UZorUOD}>{ExpectedContractType.UZorUOD}</option>
					<option value={ExpectedContractType.Any}>{ExpectedContractType.Any}</option>
				</select>
			</div>
			<div>
				<label
					htmlFor="expectedSalary"
				>Oczekiwane wynagrodzenie:</label>
				<input
					type='number'
					name='expectedSalary'
					id='expectedSalary'
					placeholder='Podaj kwotę'
					value={form.expectedSalary}
					onChange={e => updateForm('expectedSalary', e.target.value)}
				/>
			</div>
			<div>
				<input type='checkbox'
					   name='canTakeApprenticeship'
					   id='canTakeApprenticeship'
					   checked={isChecked}
					   onChange={e => {
						   checkHandler()
						   updateForm('canTakeApprenticeship', e.target.value)
					   }}
				/>
				<label htmlFor='canTakeApprenticeship'>Mogę odbyć bezpłatne praktyki/staż.</label>
			</div>
			<div>
				<label
					htmlFor="monthsOfCommercialExp"
				>Liczba miesięcy doświadczenia komercyjnego:</label>
				<input type='number'
					   name='monthsOfCommercialExp'
					   id='monthsOfCommercialExp'
					   required
					   placeholder='Podaj liczbę'
					   value={form.monthsOfCommercialExp}
					   onChange={e => updateForm('monthsOfCommercialExp', e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="education"
				>Wykształcenie:</label>
				<textarea
					name='education'
					id='education'
					placeholder='Napisz o swoim wykształceniu'
					value={form.education}
					onChange={e => updateForm('education', e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="workExperience"
				>Doświadczenie zawodowe:</label>
				<textarea
					name='workExperience'
					id='workExperience'
					placeholder='Opisz przebieg swojej kariery zawodowej'
					value={form.workExperience}
					onChange={e => updateForm('workExperience', e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="courses"
				>Ukończone kursy:</label>
				<textarea
					name='courses'
					id='courses'
					placeholder='Pochwal się ukończonymi kursami'
					value={form.courses}
					onChange={e => updateForm('courses', e.target.value)}
				/>
			</div>
			<button type='submit'>Zapisz</button>
		</form>
		<div>
			{message}
		</div>
	</>
}