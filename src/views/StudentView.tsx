import { StudentProfile } from "../components/student/StudentProfile";
import { StudentMenu } from "../components/student/StudentMenu";

export const StudentView = () => {
	return <>
		<StudentMenu/>
		<StudentProfile/>
	</>
}