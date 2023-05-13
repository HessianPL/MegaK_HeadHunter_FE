import ReactDOM from "react-dom";
import React, { useState } from "react";
import { FilterForm } from "../../types-fe/filter-form";
import { ExpectedContractType, ExpectedWorkType } from "../../types-fe/student-entity";

interface Props {
	showModal: boolean;
	onSend: () => void;
	onClose: () => void;
}

export const FilterModal = (props: Props) => {
	const [form, setForm] = useState<FilterForm>({
		canTakeApprenticeship: false,
		courseCompletion: "",
		courseEngagement: "",
		expectedContractType: ExpectedContractType.Any,
		expectedSalary: 0,
		expectedTypeWork: ExpectedWorkType.Any,
		monthsOfCommercialExp: 0,
		projectDegree: "",
		teamProjectDegree: ""

	});

	const updateForm = (key: string, value: any) => {
		setForm(form => ({
			...form,
			[key]: value,
		}));
	};

	if (!props.showModal) return null;

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
							<button className="btn btn-sm theme-btn-accent">
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
									   value={form.courseCompletion}
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
									   value={form.courseCompletion}
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
									   value={form.courseCompletion}
									   onChange={e => updateForm('teamProjectDegree', e.target.value)}
									   className="form-control w-25"
								/>
						</div>
						<div className="form-group mb-1">
							<label
								htmlFor="expectedTypeWork"
								className="form-label"
							>Preferowane miejsce pracy:</label>
							<input type='number'
								   name='expectedTypeWork'
								   id='expectedTypeWork'
								   max={5}
								   min={1}
								   value={form.courseCompletion}
								   onChange={e => updateForm('expectedTypeWork', e.target.value)}
								   className="form-control w-25"
							/>
						</div>
						<div className="form-group mb-1">
							<label
								htmlFor="expectedContractType"
								className="form-label"
							>Oczekiwany typ kontraktu:</label>
							<div id="expectedContractType">
								<input
									type="button"
									value={ExpectedContractType.UoPOnly}
									className="btn btn-sm theme-btn-dark-2 me-2"
								/>
								<input
									type="button"
									value={ExpectedContractType.B2B}
									className="btn btn-sm theme-btn-dark-2 me-2"
								/>
								<input
									type="button"
									value={ExpectedContractType.UZorUOD}
									className="btn btn-sm theme-btn-dark-2 me-2"
								/>
								<input
									type="button"
									value={ExpectedContractType.B2B}
									className="btn btn-sm theme-btn-dark-2 me-2"
								/>
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
										className="form-control"
									/>
								</div>
								<div className="col-1">
									<label htmlFor="" className="col-form-label">
										Do
									</label>
								</div>
								<div className="col-4">
									<input
										type="number"
										placeholder="np. 10 000 zł"
										className="form-control"
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
										   // onChange={radioHandler}
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
										   // onChange={radioHandler}
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
									/>
							</div>
						</div>
						<div className="mt-3">
							<button
								type='submit'
								className="btn theme-btn-mainbrand btn-right px-3 my-2"
								onClick={props.onSend}
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