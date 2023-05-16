import ReactDOM from "react-dom";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FilterForm } from "../../types-fe/filter-form";
import { ExpectedContractType, ExpectedWorkType } from "../../types-fe/student-entity";
import { Spinner } from "../common/Spinner/Spinner";
import { toast } from "react-toastify";
import { apiUrl } from "../../config/api";
import { AvailableStudentData } from "../../types-fe/student-lists";

interface Props {
	showModal: boolean;
	list: string;
	onFilter: (data: AvailableStudentData[]) => void;
	onClose: () => void;
}

export const FilterModal = (props: Props) => {
	const [form, setForm] = useState<FilterForm>({
		canTakeApprenticeship: false,
		courseCompletion: "",
		courseEngagement: "",
		expectedContractType: ExpectedContractType.Any,
		minExpectedSalary: 0,
		maxExpectedSalary: 0,
		expectedTypeWork: ExpectedWorkType.Any,
		monthsOfCommercialExp: 0,
		projectDegree: "",
		teamProjectDegree: ""
	});

	const [loading, setLoading] = useState<boolean>(false);
	const [list, setList] = useState('');

	useEffect(() => {
		if (props.list === 'ALL') {
			setList('available')
		} else {
			setList('reserved-students');
		}
	}, []);

	const updateForm = (key: string, value: any) => {
		setForm(form => ({
			...form,
			[key]: value,
		}));
		if (form.minExpectedSalary > form.maxExpectedSalary) {
			toast.error('Kwota minimalnego wynagrodzenia nie może być niższa od kwoty wynagrodzenia maksymalnego.');
		}
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

	const sendQuery = async (e: FormEvent) => {
		e.preventDefault();

		setLoading(true);

		let queryData: Object;

		for (const key in form) {
			if (form[key]) {
				queryData = {
					...queryData,
					[key]: form[key],
				}
			}
		}

		let prelimQueryString = '';

		for (const key in queryData) {
			console.log(key, queryData[key]);
			prelimQueryString += `?${key}=${queryData[key]}`
		}

		const queryString = prelimQueryString.replaceAll(' ', '%20').replaceAll('true', '1').replaceAll('false', '0');

		try {
			const res = await fetch(`${apiUrl}/user/${list}${queryString}`, {
				credentials: 'include',
			});

			const data = await res.json();
			props.onFilter(data);

		} finally {
			setLoading(false);
		}
	}

	if (!props.showModal) return null;

	if (loading) {
		props.onClose();
		return <Spinner/>
	}

	return ReactDOM.createPortal(
		<>
			<div className="overlay"></div>
			<div className="modal-div theme-bg-dark-4 p-3">
				<div className="m-2">
					<div className="row mb-3">
						<div className="col-6 pe-5">
							<h2 className="fs-4">Filtrowanie</h2>
						</div>
						<div className="col-6">
							<button
								className="btn btn-sm theme-btn-accent btn-right"
								onClick={() => setForm({
									canTakeApprenticeship: false,
									courseCompletion: "",
									courseEngagement: "",
									expectedContractType: ExpectedContractType.Any,
									minExpectedSalary: 0,
									maxExpectedSalary: 0,
									expectedTypeWork: ExpectedWorkType.Any,
									monthsOfCommercialExp: 0,
									projectDegree: "",
									teamProjectDegree: ""
								})}
							>
								Wyczyść wszystkie
							</button>
						</div>
					</div>
					<form>
						<div className="form-group mb-1">
							<label
								htmlFor="courseCompletion"
								className="form-label"
							>Minimalna ocena przejścia kursu:</label>
								<input type='number'
									   name='courseCompletion'
									   id='courseCompletion'
									   max={5}
									   min={1}
									   value={form.courseCompletion}
									   onChange={e => updateForm('courseCompletion', e.target.value)}
									   className="form-control w-25"
								/>
						</div>
						<div className="form-group mb-1">
							<label
								htmlFor="courseEngagement"
								className="form-label"
							>Minimalna ocena aktywności i zaangażowania na kursie:</label>
								<input type='number'
									   name='courseEngagement'
									   id='courseEngagement'
									   max={5}
									   min={1}
									   value={form.courseEngagement}
									   onChange={e => updateForm('courseEngagement', e.target.value)}
									   className="form-control w-25"
								/>
						</div>
						<div className="form-group mb-1">
							<label
								htmlFor="projectDegree"
								className="form-label"
							>Minimalna ocena kodu w projekcie własnym:</label>
								<input type='number'
									   name='projectDegree'
									   id='projectDegree'
									   max={5}
									   min={1}
									   value={form.projectDegree}
									   onChange={e => updateForm('projectDegree', e.target.value)}
									   className="form-control w-25"
								/>
						</div>
						<div className="form-group mb-1">
							<label
								htmlFor="teamProjectDegree"
								className="form-label"
							>Minimalna ocena pracy w zespole Scrum:</label>
								<input type='number'
									   name='teamProjectDegree'
									   id='teamProjectDegree'
									   max={5}
									   min={1}
									   value={form.teamProjectDegree}
									   onChange={e => updateForm('teamProjectDegree', e.target.value)}
									   className="form-control w-25"
								/>
						</div>
						<div className="form-group mb-1">
							<label
								htmlFor="expectedTypeWork"
								className="form-label"
							>Preferowane miejsce pracy:</label>
							<div>
								<div className="btn-group" data-toggle="buttons">
										<div className="btn-group-toggle btn btn-sm">
											<input
												type="radio"
												name="expectedTypeWork"
												id="Static"
												value={ExpectedWorkType.Static}
												onChange={e => updateForm('expectedTypeWork', e.target.value)}
											/>
											<label
												htmlFor="Static"
												className="btn btn-sm theme-btn-dark-2 me-2">{ExpectedWorkType.Static}
											</label>
										</div>
										<div className="btn-group-toggle btn btn-sm">
											<input
												type="radio"
												name="expectedTypeWork"
												id="Hybrid"
												value={ExpectedWorkType.Hybrid}
												onChange={e => updateForm('expectedTypeWork', e.target.value)}
											/>
											<label
												htmlFor="Hybrid"
												className="btn btn-sm theme-btn-dark-2 me-2">{ExpectedWorkType.Hybrid}
											</label>
										</div>
										<div className="btn-group-toggle btn btn-sm">
											<input
												type="radio"
												name="expectedTypeWork"
												id="RemoteOnly"
												value={ExpectedWorkType.RemoteOnly}
												onChange={e => updateForm('expectedTypeWork', e.target.value)}
											/>
											<label
												htmlFor="RemoteOnly"
												className="btn btn-sm theme-btn-dark-2 me-2">{ExpectedWorkType.RemoteOnly}
											</label>
										</div>
										<div className="btn-group-toggle btn btn-sm">
											<input
												type="radio"
												name="expectedTypeWork"
												id="CanMoveOut"
												value={ExpectedWorkType.CanMoveOut}
												onChange={e => updateForm('expectedTypeWork', e.target.value)}
											/>
											<label
												htmlFor="CanMoveOut"
												className="btn btn-sm theme-btn-dark-2 me-2">{ExpectedWorkType.CanMoveOut}
											</label>
										</div>
								</div>
							</div>
						</div>
						<div className="form-group mb-1">
							<label
								htmlFor="expectedContractType"
								className="form-label"
							>Oczekiwany typ kontraktu:</label>
							<div>
								<div className="btn-group " data-toggle="buttons">
									<div className="btn-group-toggle btn btn-sm">
										<input
											type="radio"
											name="expectedContractType"
											id="UoP"
											value={ExpectedContractType.UoPOnly}
											onChange={e => updateForm('expectedContractType', e.target.value)}
										/>
										<label
											htmlFor="UoP"
											className="btn btn-sm theme-btn-dark-2 me-2">{ExpectedContractType.UoPOnly}
										</label>
									</div>
									<div className="btn-group-toggle btn btn-sm">
										<input
											type="radio"
											name="expectedContractType"
											id="B2B"
											value={ExpectedContractType.B2B}
											onChange={e => updateForm('expectedContractType', e.target.value)}
										/>
										<label
											htmlFor="B2B"
											className="btn btn-sm theme-btn-dark-2 me-2">{ExpectedContractType.B2B}
										</label>
									</div>
									<div className="btn-group-toggle btn btn-sm">
										<input
											type="radio"
											name="expectedContractType"
											id="UZorUOD"
											value={ExpectedContractType.UZorUOD}
											onChange={e => updateForm('expectedContractType', e.target.value)}
										/>
										<label
											htmlFor="UZorUOD"
											className="btn btn-sm theme-btn-dark-2 me-2">{ExpectedContractType.UZorUOD}
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group mb-1">
							<label className="form-label"
							>Oczekiwane wynagrodzenie miesięczne netto:</label>
							<div id="expectedSalary" className="form-group row">
								<div className="col-1">
									<label htmlFor="" className="col-form-label">
										Od
									</label>
								</div>
								<div className="col-4 me-4">
									<input
										type="number"
										placeholder="np. 1000 zł"
										name="minExpectedSalary"
										id="minExpectedSalary"
										className="form-control"
										onChange={e => updateForm('minExpectedSalary', Number(e.target.value))}
									/>
								</div>
								<div className="col-1">
									<label htmlFor="maxExpectedSalary" className="col-form-label">
										Do
									</label>
								</div>
								<div className="col-4">
									<input
										type="number"
										name="maxExpectedSalary"
										id="maxExpectedSalary"
										placeholder="np. 10 000 zł"
										className="form-control"
										onChange={e => updateForm('maxExpectedSalary', Number(e.target.value))}
									/>
								</div>
							</div>
						</div>
						<div className="form-group mb-1">
							<label
								className="form-label"
							>Zgoda na odbycie bezpłatnych praktyk/stażu na początek:</label>
							<div className="col-sm-8">
								<div className="form-check">
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
								<div className="form-check">
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
						<div className="form-group mb-1">
							<label className="form-label"
							>Liczba miesięcy doświadczenia komercyjnego w programowaniu:</label>
							<div id="monthsOfCommercialExp" className="form--group row">
								<input
										type="number"
										name="monthsOfCommercialExp"
										id="monthsOfCommercialExp"
										placeholder="0 miesięcy"
										value={form.monthsOfCommercialExp}
										className="form-control w-25"
										onChange={e => updateForm('monthsOfCommercialExp', Number(e.target.value))}
									/>
							</div>
						</div>
						<div className="mt-3">
							<button
								type='submit'
								className="btn theme-btn-mainbrand btn-right px-3 my-2"
								// onClick={props.onSend}
								onClick={sendQuery}
							>Pokaż wyniki</button>
							<button
								className="btn theme-btn-dark-4 btn-right px-3 my-2 me-3"
								onClick={props.onClose}
							>
								Anuluj
							</button>
						</div>

					</form>
				</div>
			</div>
		</>,
		document.getElementById('portal') as Element,
	)
}