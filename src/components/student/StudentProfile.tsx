import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpectedContractType, ExpectedWorkType, StudentEntity, StudentStatus } from "../../types-fe/student-entity";
import { UserContext } from "../../contexts/user-context";
import { apiUrl } from "../../config/api";

export const StudentProfile = () => {
	const [student, setStudent] = useState<StudentEntity | null>(null);
	const [showModal, setShowModal] = useState(false);

	const {role, id} = useContext(UserContext);

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

			setStudent({
				id: data.id,
				email: email,
				firstName: data.firstName,
				lastName: data.lastName,
				tel: data.tel,
				bio: data.bio,
				bonusProjectUrls: data.bonusProjectUrls,
				canTakeApprenticeship: data.canTakeApprenticeship,
				courseCompletion: data.courseCompletion,
				courseEngagement: data.courseEngagement,
				courses: data.courses,
				education: data.education,
				expectedContractType: data.expectedContractType,
				expectedSalary: data.expectedSalary,
				expectedTypeWork: data.expectedTypeWork,
				githubUsername: data.githubUsername,
				monthsOfCommercialExp: data.monthsOfCommercialExp,
				portfolioUrls: data.portfolioUrls,
				projectDegree: data.projectDegree,
				projectUrls: data.projectUrls,
				status: data.status,
				targetWorkCity: data.targetWorkCity,
				teamProjectDegree: data.teamProjectDegree,
				workExperience: data.workExperience,
			})
		})();
	}, []);

	// @TODO: dodać logikę przycisku, kiedy będzie gotowy popup


	if (student === null) {
		return null;
	}

	return <>
		<div className="row m-3">
			<div className="col-lg-3 col-12 px-4 theme-bg-dark-1">
				<div className="theme-bg-dark-1 border-0">
					<img
						src={student.githubUsername ? `https://github.com/${student.githubUsername}.png` : "/defaultAvatar.jpg"}
						alt="awatar kursanta/ki"
						className="img-fluid rounded-circle mx-auto d-block my-5 w-50"
					/>
					<div className="text-center mb-4">
						<h1 className="fs-3">{student.firstName} {student.lastName}</h1>
						<p><a href={`https://github.com/${student.githubUsername}`} target="_blank"><i className="bi bi-github"/> {student.githubUsername}</a></p>
					</div>
				</div>

				<div className="mb-4">
					<div className="row">
						<div className="col-1 mb-2"><i className="bi bi-telephone-fill theme-text-dark-0"/></div>
						<div className="col-10 mb-2">{`+48 ${student.tel?.slice(0, 3)} ${student.tel?.slice(3, 6)} ${student.tel?.slice(6)}`}</div>
					</div>
					<div className="row">
						<div className="col-1"><i className="bi bi-envelope-fill theme-text-dark-0"/></div>
						<div className="col-10">{student.email}</div>
					</div>
				</div>
				<div className="mb-5">
					<h2 className="theme-text-dark-0 fs-6">O mnie</h2>
					<p className="lh-lg">{student?.bio}</p>
				</div>
				<div>
					{role === 'HR'
						? <button className="btn theme-btn-mainbrand w-100 py-2 mb-2">Brak zainteresowania</button>
						: null}
					<button className="btn theme-btn-mainbrand w-100 py-2 mb-2">Zatrudniony</button>
					{role === 'Student'
						? <button className="btn theme-btn-mainbrand w-100 py-2 mb-2">Edytuj profil</button>
						: null}
				</div>
			</div>

			<div className="col-lg-9 col-12 theme-bg-dark-2">

				{/*oceny*/}
				<section>
					<h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Oceny</h2>
					<div className="pt-3 px-4 pb-4">

						<div className="row theme-text-medium-light">
							<div className="col-3">
								<div>Ocena przejścia kursu</div>
							</div>
							<div className="col-3">
								<div>Ocena aktywności i zaangażowania na kursie</div>
							</div>
							<div className="col-3">
								<div>Ocena kodu w projekcie własnym</div>
							</div>
							<div className="col-3">
								<div>Ocena pracy w zespole Scrum</div>
							</div>
						</div>

						<div className="row mt-4">
							<div className="col-3">
								<div className="row">
									<div className="col-3">
										<strong>{student?.courseCompletion}</strong> <span className="theme-text-medium-light">/ 5</span>
									</div>
									<div className="col-9">
										<i className={Number(student.courseCompletion) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.courseCompletion) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.courseCompletion) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.courseCompletion) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.courseCompletion) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
									</div>
								</div>
							</div>
							<div className="col-3">
								<div className="row">
									<div className="col-3">
										<strong>{student?.courseEngagement}</strong> <span className="theme-text-medium-light">/ 5</span>
									</div>
									<div className="col-9">
										<i className={Number(student.courseEngagement) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.courseEngagement) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.courseEngagement) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.courseEngagement) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.courseEngagement) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
									</div>
								</div>
							</div>
							<div className="col-3">
								<div className="row">
									<div className="col-3">
										<strong>{student?.projectDegree}</strong> <span className="theme-text-medium-light">/ 5</span>
									</div>
									<div className="col-9">
										<i className={Number(student.projectDegree) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.projectDegree) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.projectDegree) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.projectDegree) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.projectDegree) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
									</div>
								</div>
							</div>
							<div className="col-3">
								<div className="row">
									<div className="col-3">
										<strong>{student?.teamProjectDegree}</strong> <span className="theme-text-medium-light">/ 5</span>
									</div>
									<div className="col-9">
										<i className={Number(student.teamProjectDegree) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.teamProjectDegree) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.teamProjectDegree) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.teamProjectDegree) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
										<i className={Number(student.teamProjectDegree) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/*oczekiwania*/}
				<section className="mb-4">
					<h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Oczekiwania w stosunku do zatrudnienia</h2>
					<div className="pt-3 px-4 pb-4">
						<div className="row theme-text-medium-light">
							<div className="col-2 theme-border-dark-2">
								Preferowane miejsce pracy
							</div>
							<div className="col-2 theme-border-dark-2">
								Docelowe miasto, w którym chce pracować kandydat
							</div>
							<div className="col-2 theme-border-dark-2">
								Oczekiwany typ umowy
							</div>
							<div className="col-2 theme-border-dark-2">
								Oczekiwane wynagrodzenie miesięczne netto
							</div>
							<div className="col-2 theme-border-dark-2">
								Zgoda na odbycie bezpłatnych praktyk/stażu na początek
							</div>
							<div className="col-2">
								Komercyjne doświadczenie w programowaniu
							</div>
						</div>
						<div className="row fw-bold">
							<div className="col-2 theme-border-dark-2 pt-3">
								{student?.expectedTypeWork}
							</div>
							<div className="col-2 theme-border-dark-2 pt-3">
								{student?.targetWorkCity}
							</div>
							<div className="col-2 theme-border-dark-2 pt-3">
								{student?.expectedContractType}
							</div>
							<div className="col-2 theme-border-dark-2 pt-3">
								{student?.expectedSalary ? new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN'}).format(student?.expectedSalary) : null}
							</div>
							<div className="col-2 theme-border-dark-2 pt-3">
								{student?.canTakeApprenticeship ? 'TAK' : 'NIE'}
							</div>
							<div className="col-2 pt-3">
								Liczba miesięcy: {student?.monthsOfCommercialExp}
							</div>
						</div>
					</div>

				</section>
				{/*edu*/}
				<section className="mb-4">
					<h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Edukacja</h2>
					<div className="pt-3 px-4 pb-4">{student?.education}</div>
				</section>
				{/*kursy*/}
				<section className="mb-4">
					<h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Kursy</h2>
					<div className="pt-3 px-4 pb-4">{student?.courses}</div>
				</section>
				{/*doświadczenie*/}
				<section className="mb-4">
					<h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Doświadczenie zawodowe</h2>
					<div className="pt-3 px-4 pb-4">{student?.workExperience}</div>
				</section>
				{/*portfolio*/}
				<section className="mb-4">
					<h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Portfolio</h2>
					<div className="pt-3 px-4 pb-4">
						{student?.portfolioUrls?.map((el, i) => <p key={i} className="mb-1 align-middle"><a href={el} target="_blank"><i className="bi bi-paperclip fs-3 align-middle"/> {el}</a></p>)}
					</div>
				</section>
				{/*projekt w zespole Scrumowym*/}
				<section className="mb-4">
					<h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Projekt w zespole Scrumowym</h2>
					<div className="pt-3 px-4 pb-4">
						{student?.bonusProjectUrls.map((el, i) => <p key={i} className="mb-1 align-middle"><a href={el} target="_blank"><i className="bi bi-paperclip fs-3 align-middle"/> {el}</a></p>)}
					</div>
				</section>
				{/*projekt indywidualny*/}
				<section className="mb-4">
					<h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Projekt na zaliczenie</h2>
					<div className="pt-3 px-4 pb-4">
						{student?.projectUrls?.map((el, i) => <p key={i} className="mb-1 align-middle"><a href={el} target="_blank"><i className="bi bi-paperclip fs-3 align-middle"/> {el}</a></p>)}
					</div>
				</section>
			</div>
		</div>
	</>
}