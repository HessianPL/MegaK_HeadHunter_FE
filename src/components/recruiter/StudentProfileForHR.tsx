import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExpectedContractType, ExpectedWorkType, StudentEntity, StudentStatus } from "../../types-fe/student-entity";
import { UserContext } from "../../contexts/user-context";
import { apiUrl } from "../../config/api";
import {StudentMenu} from "../student/StudentMenu";
import {ShowStudentProfile} from "../student/ShowStudentProfile";


export const StudentProfileForHR = () => {
	const {idStudent} = useParams();
	const [student, setStudent] = useState<StudentEntity | null>(null);

	const {role, id} = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`${apiUrl}/user/student-cv/${idStudent}`, {
					credentials: 'include',
				});
				const data = await res.json();
				setStudent(data)
			}catch (error) {
				console.log(error)
			}
		})();
	}, []);


	if (student === null) {
		return null;
	}

	return <>
		<StudentMenu/>
		<div >
			<button className="btn btn-dark btn-lg theme-bg-dark-2 btn-block btn-color" onClick={() => navigate(-1)}>&#60; Wróć</button>
			<div className="col-lg-10 col-12 px-4 theme-bg-dark-1 mx-auto ">
				<ShowStudentProfile student={student}/>
			</div>
		</div>
	</>
}
