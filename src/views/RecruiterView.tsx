import { LogoutButton } from "../components/common/LogoutButton";
import {ListOfStudents} from "../components/recruiter/ListOfStudents";
import {HrContener} from "../components/recruiter/HrContener";

export const RecruiterView = () => {
	return <>
		<h1 className="theme-text-light">Widok rekrutera</h1>
		<HrContener/>
		<LogoutButton/>
	</>
}
