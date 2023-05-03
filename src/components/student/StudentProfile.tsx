import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpectedContractType, ExpectedWorkType, StudentEntity, StudentStatus } from "../../types-fe/student-entity";
import { UserContext } from "../../contexts/user-context";

export const StudentProfile = () => {
	const [student, setStudent] = useState<StudentEntity | null>(null);
	const [showModal, setShowModal] = useState(false);

	const {role} = useContext(UserContext);

	const navigate = useNavigate();

	// useEffect(() => {
	// 	(async () => {
	// 		const res = await fetch(``, {
	// 			credentials: 'include',
	// 			});
	// 		setStudent(await res.json());
	// 	})();
	// }, []);

	// @TODO: dane na sztywno do testów, do usunięcia po połączeniu z API
	useEffect(() => {
		setStudent({
			id: "12345",
			email: "janina@testowa.pl",
			firstName: "Janina",
			lastName: "Testowa",
			tel: "123-456-789",
			bio: "Moje życie smutne było, ale zostanę programistką i będzie świetne.",
			bonusProjectUrls: ['http://test.pl', 'http://example.com'],
			canTakeApprenticeship: true,
			courseCompletion: '3',
			courseEngagement: '4',
			courses: "MegaKurs, „Projektowanie witryn internetowych”",
			education: "Wyższa Szkoła Gotowania na Gazie w Jaktorowie",
			expectedContractType: ExpectedContractType.UoPOnly,
			expectedSalary: 20000,
			expectedTypeWork: ExpectedWorkType.Hybrid,
			githubUsername: "JankaProgramistka",
			monthsOfCommercialExp: 0,
			portfolioUrls: ['http://test.pl', 'http://example.com'],
			projectDegree: '1',
			projectUrls: ['http://test.pl', 'http://example.com'],
			status: StudentStatus.Available,
			targetWorkCity: "Warszawa",
			teamProjectDegree: '3',
			workExperience: "mnóstwo doświadczeń ciekawych"
		})
	}, []);

	if (student === null) {
		return null;
	}

	return <>
		<div className="sidebar theme-bg-dark-1">
			<img src="" alt=""/>
			<div className="text-center">
				<p>{student.firstName} {student.lastName}</p>
				<p><a href={`https://github.com/${student.githubUsername}`}><i className="bi bi-github"/> {student.githubUsername}</a></p>
			</div>
			<div>
				<div>
					<div><i className="bi bi-telephone-fill theme-text-dark-0"/></div>
					<div>{student.tel}</div>
				</div>
				<div>
					<div><i className="bi bi-envelope-fill theme-text-dark-0"/></div>
					<div>{student.email}</div>
				</div>
			</div>
			<div>
				<p className="theme-text-dark-0">O mnie</p>
				<p>{student?.bio}</p>
			</div>
			{role === 'HR'
				? <button className="btn theme-btn-mainbrand">Brak zainteresowania</button>
				: null}
			<button className="btn theme-btn-mainbrand">Zatrudniony</button>
			{role === 'Student'
				? <button className="btn theme-btn-mainbrand">Edytuj profil</button>
				: null}
		</div>
		<div className="main-section theme-bg-dark-2">
			<div>
				<div className="theme-bg-dark-1">Oceny</div>
				<div>
					<div>
						<div>Ocena przejścia kursu</div>
						<div><strong>{student?.courseCompletion}</strong> <span className="theme-text-medium-light">/ 5</span></div>
						<div>
							<i className={Number(student.courseCompletion) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.courseCompletion) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.courseCompletion) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.courseCompletion) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.courseCompletion) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
						</div>
					</div>
					<div>
						<div>Ocena aktywności i zaangażowania na kursie</div>
						<div><strong>{student?.courseEngagement}</strong> <span className="theme-text-medium-light">/ 5</span></div>
						<div>
							<i className={Number(student.courseEngagement) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.courseEngagement) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.courseEngagement) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.courseEngagement) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.courseEngagement) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
						</div>
					</div>
					<div>
						<div>Ocena kodu w projekcie własnym</div>
						<div><strong>{student?.projectDegree}</strong> <span className="theme-text-medium-light">/ 5</span></div>
						<div>
							<i className={Number(student.projectDegree) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.projectDegree) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.projectDegree) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.projectDegree) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.projectDegree) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
						</div>
					</div>
					<div>
						<div>Ocena pracy w zespole Scrum</div>
						<div><strong>{student?.teamProjectDegree}</strong> <span className="theme-text-medium-light">/ 5</span></div>
						<div>
							<i className={Number(student.teamProjectDegree) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.teamProjectDegree) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.teamProjectDegree) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.teamProjectDegree) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
							<i className={Number(student.teamProjectDegree) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="theme-bg-dark-1">Oczekiwania w stosunku do zatrudnienia</div>
				<div className="theme-bg-dark-2">
					<div>Preferowane miejsce pracy</div>
					<div>{student?.expectedTypeWork}</div>
				</div>
				<div>
					<div>Docelowe miasto, w którym chce pracować kandydat</div>
					<div>{student?.targetWorkCity}</div>
				</div>
				<div>
					<div>Oczekiwany typ umowy</div>
					<div>{student?.expectedContractType}</div>
				</div>
				<div>
					<div>Oczekiwane wynagrodzenie miesięczne netto</div>
					<div>{student?.expectedSalary ? new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN'}).format(student?.expectedSalary) : null}</div>
				</div>
				<div>
					<div>Zgoda na odbycie bezpłatnych praktyk/stażu na początek</div>
					<div>{student?.canTakeApprenticeship ? 'TAK' : 'NIE'}</div>
				</div>
				<div>
					<div>Komercyjne doświadczenie w programowaniu</div>
					<div>Liczba miesięcy: {student?.monthsOfCommercialExp}</div>
				</div>
			</div>
			<div>
				<div className="theme-bg-dark-1">Edukacja</div>
				<div className="theme-bg-dark-2">{student?.education}</div>
			</div>
			<div>
				<div className="theme-bg-dark-1">Kursy</div>
				<div className="theme-bg-dark-2">{student?.courses}</div>
			</div>
			<div>
				<div className="theme-bg-dark-1">Doświadczenie zawodowe</div>
				<div>{student?.workExperience}</div>
			</div>
			<div className="theme-bg-dark-2">
				<div className="theme-bg-dark-1">Projekt grupowy</div>
				<div>{student?.bonusProjectUrls.map(el => <p><a href={el}>{el}</a></p>)}</div>
			</div>
			<div className="theme-bg-dark-2">
				<div className="theme-bg-dark-1">Portfolio</div>
				<div>{student?.portfolioUrls?.map(el => <p><a href={el}>{el}</a></p>)}</div>
			</div>
		</div>
	</>
}