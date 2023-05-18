import React, { BaseSyntheticEvent, ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { apiUrl } from "../../config/api";
import {
	EditStudentForm,
	ExpectedContractType,
	ExpectedWorkType, StudentEntity,
	StudentStatus
} from "../../types-fe/student-entity";
import { UserContext } from "../../contexts/user-context";
import { Spinner } from "../common/Spinner/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { StudentForm } from "../../types-fe/student-form";
import app from "../../App";
import { toast } from "react-toastify";

export const EditStudent = () => {
	const [form, setForm] = useState<EditStudentForm>({
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
		portfolioUrls: [],
		projectUrls: [],
		status: StudentStatus.Available,
		targetWorkCity: '',
		workExperience: '',
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [workSelected, setWorkSelected] = useState<string>(form.expectedTypeWork === null ? ExpectedWorkType.Any : form.expectedTypeWork);
	const [contractSelected, setContractSelected] = useState<string>(form.expectedContractType === null ? ExpectedContractType.Any : form.expectedContractType);

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
				portfolioUrls: data.portfolioUrls,
				projectUrls: data.projectUrls,
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

	const radioHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "true") {
			setForm({
				...form,
				canTakeApprenticeship: true,
			});
		} else {
			setForm({
				...form,
				canTakeApprenticeship: false,
			});
		}
	}

	const stringToArr = (input: string) => {
		if (input.includes('\n')) {
			return input.split("\n");
		} else if (input.includes('\r')) {
			return input.split("\r");
		}
	}

	const arrToString = (input: string[]) => {
		return input.join("\r\n");
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
				credentials: 'include',
				body: JSON.stringify({
					...form,
				}),
			});

			const response = await res.json();

			if (response.message === 'OK') {
				toast.success('Dane zmienione.')
				navigate('/student');
			} else {
				toast.error('Nie udało się zmienić danych.')
			}

		} finally {
			setLoading(false);
		}
	}

	if (loading) {
		return <Spinner/>
	}

	return <div className="mt-5 ms-5">
		<form onSubmit={sendForm}
			  className="form"
		>
			<h1 className="mt-4 mb-4">Edycja profilu</h1>
			<div className="form-group row">
				<label
					htmlFor="email"
					className="col-sm-4 col-form-label"
				>Adres email:</label>
				<div className="col-sm-8">
					<input type='email'
						   name='email'
						   id='email'
						   required
						   placeholder='e-mail@mail.com'
						   value={form.email}
						   onChange={e => updateForm('email', e.target.value)}
						   className="form-control"
					/>
				</div>

			</div>
			<div className="form-group row">
				<label
					htmlFor="tel"
					className="col-sm-4 col-form-label"
				>Numer telefonu:</label>
				<div className="col-sm-8">
					<input type='text'
						   name='tel'
						   id='tel'
						   placeholder='987654321'
						   maxLength={9}
						   minLength={9}
						   value={form.tel}
						   onChange={e => updateForm('tel', e.target.value)}
						   className="form-control"
					/>
				</div>

			</div>
			<div className="form-group row">
				<label
					htmlFor="firstName"
					className="col-sm-4 col-form-label"
				>Imię:</label>
				<div className="col-sm-8">
					<input type='text'
						   name='firstName'
						   id='firstName'
						   required
						   placeholder='Jan'
						   value={form.firstName}
						   onChange={e => updateForm('firstName', e.target.value)}
						   className="form-control"
					/>
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="lastName"
					className="col-sm-4 col-form-label"
				>Nazwisko:</label>
				<div className="col-sm-8">
					<input type='text'
						   name='lastName'
						   id='lastName'
						   required
						   placeholder='Kowalski'
						   value={form.lastName}
						   onChange={e => updateForm('lastName', e.target.value)}
						   className="form-control"
					/>
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="githubUsername"
					className="col-sm-4 col-form-label"
				>Nazwa użytkownika GitHub:</label>
				<div className="col-sm-8">
					<input type='text'
						   name='githubUsername'
						   id='githubUsername'
						   required
						   placeholder='MegaProgramista'
						   value={form.githubUsername}
						   onChange={e => updateForm('githubUsername', e.target.value)}
						   className="form-control"
					/>
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="portfolioUrls"
					className="col-sm-4 col-form-label"
				>Linki do portfolio:</label>
				<div className="col-sm-8">
               <textarea
				   name="portfolioUrls"
				   id="portfolioUrls"
				   placeholder="https://link1.com&#10;https://link2.com"
				   value={arrToString(form.portfolioUrls)}
				   onChange={e => updateForm('portfolioUrls', stringToArr(e.target.value))}
				   className="form-control"
			   />
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="projectUrls"
					className="col-sm-4 col-form-label"
				>Linki do projektu indywidualnego:</label>
				<div className="col-sm-8">
            <textarea
				name="projectUrls"
				id="projectUrls"
				placeholder="https://link3.com&#10;https://link4.com"
				value={arrToString(form.projectUrls)}
				onChange={e => updateForm('projectUrls', stringToArr(e.target.value))}
				className="form-control"
			/>
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="bio"
					className="col-sm-4 col-form-label"
				>Bio:</label>
				<div className="col-sm-8">
            <textarea
				name='bio'
				id='bio'
				placeholder='Napisz coś o sobie'
				value={form.bio}
				onChange={e => updateForm('bio', e.target.value)}
				className="form-control"
			/>
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="expectedWorkType"
					className="col-sm-4 col-form-label"
				>Oczekiwana forma zatrudnienia:</label>
				<div className="col-sm-8">
					<select
						name='expectedWorkType'
						id='expectedWorkType'
						value={workSelected}
						className="form-control"
						onChange={e => {
							setWorkSelected(e.target.value as ExpectedWorkType)
							updateForm('expectedWorkType', e.target.value);
						}}>
						<option>{form.expectedTypeWork === null ? ExpectedWorkType.Any : form.expectedTypeWork}</option>
						<option value={ExpectedWorkType.Hybrid}>{ExpectedWorkType.Hybrid}</option>
						<option value={ExpectedWorkType.CanMoveOut}>{ExpectedWorkType.CanMoveOut}</option>
						<option value={ExpectedWorkType.Static}>{ExpectedWorkType.Static}</option>
						<option value={ExpectedWorkType.RemoteOnly}>{ExpectedWorkType.RemoteOnly}</option>
					</select>
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="targetWorkCity"
					className="col-sm-4 col-form-label"
				>Preferowane miasto zatrudnienia:</label>
				<div className="col-sm-8">
					<input type='text'
						   name='targetWorkCity'
						   id='targetWorkCity'
						   placeholder='Wólka'
						   value={form.targetWorkCity}
						   onChange={e => updateForm('targetWorkCity', e.target.value)}
						   className="form-control"
					/>
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="expectedContractType"
					className="col-sm-4 col-form-label"
				>Oczekiwany typ zatrudnienia:</label>
				<div className="col-sm-8">
					<select
						name='expectedContractType'
						id='expectedContractType'
						value={contractSelected}
						className="form-control"
						onChange={(e) => {
							setContractSelected(e.target.value as ExpectedContractType);
							updateForm('expectedContractType', e.target.value);
						}}
					>
						<option>{form.expectedContractType === null ? ExpectedContractType.Any : form.expectedContractType}</option>
						<option value={ExpectedContractType.UoPOnly}>{ExpectedContractType.UoPOnly}</option>
						<option value={ExpectedContractType.B2B}>{ExpectedContractType.B2B}</option>
						<option value={ExpectedContractType.UZorUOD}>{ExpectedContractType.UZorUOD}</option>
						<option value={ExpectedContractType.Any}>{ExpectedContractType.Any}</option>
					</select>
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="expectedSalary"
					className="col-sm-4 col-form-label"
				>Oczekiwane wynagrodzenie netto:</label>
				<div className="col-sm-8">
					<input
						type='number'
						name='expectedSalary'
						id='expectedSalary'
						placeholder='100000'
						value={form.expectedSalary}
						onChange={e => updateForm('expectedSalary', Number(e.target.value))}
						className="form-control"
					/>
				</div>
			</div>
			<div className="form-group row">
				<legend
					className="col-form-label col-sm-4"
				>Mogę odbyć bezpłatne praktyki/staż:</legend>
				<div className="col-sm-8">
					<div className="form-check-inline">
						<input type='radio'
							   name='canTakeApprenticeship'
							   id='canTakeApprenticeshipTrue'
							   value="true"
							   onChange={radioHandler}
							   className="form-check-input"
							   checked={form.canTakeApprenticeship}
						/>
						<label className="form-check-label ms-2" htmlFor="canTakeApprenticeshipTrue">tak</label>
					</div>
					<div className="form-check-inline">
						<input type='radio'
							   name='canTakeApprenticeship'
							   id='canTakeApprenticeshipFalse'
							   value="false"
							   onChange={radioHandler}
							   className="form-check-input"
							   checked={!form.canTakeApprenticeship}
						/>
						<label className="form-check-label ms-2" htmlFor="canTakeApprenticeshipTrue">nie</label>
					</div>
				</div>
			</div>

			<div className="form-group row">
				<label
					htmlFor="monthsOfCommercialExp"
					className="col-sm-4 col-form-label"
				>Liczba miesięcy doświadczenia komercyjnego:</label>
				<div className="col-sm-8">
					<input type='number'
						   name='monthsOfCommercialExp'
						   id='monthsOfCommercialExp'
						   required
						   placeholder='0'
						   value={form.monthsOfCommercialExp}
						   onChange={e => updateForm('monthsOfCommercialExp', e.target.value)}
						   className="form-control"
					/>
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="education"
					className="col-sm-4 col-form-label"
				>Wykształcenie:</label>
				<div className="col-sm-8">
               <textarea
				   name='education'
				   id='education'
				   placeholder='2022 mgr inż., Wyższa Szkoła Programowania w Wólce'
				   value={form.education}
				   onChange={e => updateForm('education', e.target.value)}
				   className="form-control"
			   />
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="workExperience"
					className="col-sm-4 col-form-label"
				>Doświadczenie zawodowe:</label>
				<div className="col-sm-8">
               <textarea
				   name='workExperience'
				   id='workExperience'
				   placeholder='2018–2022 sprzedawca-kasjer, Biedronka, Wólka'
				   value={form.workExperience}
				   onChange={e => updateForm('workExperience', e.target.value)}
				   className="form-control"
			   />
				</div>
			</div>
			<div className="form-group row">
				<label
					htmlFor="courses"
					className="col-sm-4 col-form-label"
				>Ukończone kursy:</label>
				<div className="col-sm-8">
               <textarea
				   name='courses'
				   id='courses'
				   placeholder='2023 MegaKURS JavaScriptu'
				   value={form.courses}
				   onChange={e => updateForm('courses', e.target.value)}
				   className="form-control"
			   />
				</div>
			</div>
			<button
				type='submit'
				className="btn theme-btn-mainbrand btn-right px-5 my-2"
			>Zapisz</button>
			<Link to={'/student'} className="btn theme-btn-dark-4 btn-right px-5 my-2 me-3">
				Anuluj
			</Link>
		</form>
	</div>
}
