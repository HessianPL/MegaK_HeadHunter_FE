import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExpectedContractType, ExpectedWorkType, StudentEntity, StudentStatus } from "../../types-fe/student-entity";
import { UserContext } from "../../contexts/user-context";
import { apiUrl } from "../../config/api";
import {ShowStudentProfile} from "./ShowStudentProfile";

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


	const preserveNewLine = (input: string | undefined) => {
		if (typeof input === 'string') {
			return input.replaceAll('\r', '&#10;');
		}
	}

	if (student === null) {
		return null;
	}

	return <>
		<ShowStudentProfile student={student}/>
	</>
}
