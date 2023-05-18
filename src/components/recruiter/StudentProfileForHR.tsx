import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExpectedContractType, ExpectedWorkType, StudentEntity, StudentStatus } from "../../types-fe/student-entity";
import { UserContext } from "../../contexts/user-context";
import { apiUrl } from "../../config/api";


// @TODO należy przerobić to na wspólny komponent ze Student Profile, żeby kożystali z jednego ale to w następnym kroku

export const StudentProfileForHR = () => {

	const {idStudent} = useParams();
	const [student, setStudent] = useState<StudentEntity | null>(null);
	const [showModal, setShowModal] = useState(false);

	const {role, id} = useContext(UserContext);

	const navigate = useNavigate();

	console.log("idStudent",idStudent)
	useEffect(() => {
		(async () => {
			const res = await fetch(`${apiUrl}/user/student-cv/:${idStudent}`, {
				credentials: 'include',
			});

			const data = await res.json();
			console.log(id)
			console.log(data)
			// const res2 = await fetch (`${apiUrl}/user/email/${id}`, {
			// 	credentials: 'include',
			// });
			// const email = (await res2.json()).email;

			// setStudent({
			// 	id: data.id,
			// 	email: email,
			// 	firstName: data.firstName,
			// 	lastName: data.lastName,
			// 	tel: data.tel,
			// 	bio: data.bio,
			// 	bonusProjectUrls: data.bonusProjectUrls,
			// 	canTakeApprenticeship: data.canTakeApprenticeship,
			// 	courseCompletion: data.courseCompletion,
			// 	courseEngagement: data.courseEngagement,
			// 	courses: data.courses,
			// 	education: data.education,
			// 	expectedContractType: data.expectedContractType,
			// 	expectedSalary: data.expectedSalary,
			// 	expectedTypeWork: data.expectedTypeWork,
			// 	githubUsername: data.githubUsername,
			// 	monthsOfCommercialExp: data.monthsOfCommercialExp,
			// 	portfolioUrls: data.portfolioUrls,
			// 	projectDegree: data.projectDegree,
			// 	projectUrls: data.projectUrls,
			// 	status: data.status,
			// 	targetWorkCity: data.targetWorkCity,
			// 	teamProjectDegree: data.teamProjectDegree,
			// 	workExperience: data.workExperience,
			// })
		})();
	}, []);

	// @TODO: dodać logikę przycisku, kiedy będzie gotowy popup


	if (student === null) {
		return null;
	}

	return <>
		<StudentProfileForHR/>
	</>
}
