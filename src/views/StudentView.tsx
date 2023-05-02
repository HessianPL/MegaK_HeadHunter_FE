import { LogoutButton } from "../components/common/LogoutButton";
import { StudentProfile } from "../components/student/StudentProfile";

export const StudentView = () => {
	return <>
		<h1 className="theme-text-light">Widok kursanta</h1>
		<LogoutButton/>
		<StudentProfile/>
	</>
}