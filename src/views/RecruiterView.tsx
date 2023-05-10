import {StudentMenu} from "../components/student/StudentMenu";
import {HrView} from "../components/recruiter/HrView";
import {SearchAndFilterBar} from "../components/recruiter/SearchAndFilterBar";
export const RecruiterView = () => {
	return <>
		<StudentMenu/>
    <SearchAndFilterBar/>
		<HrView/>
		</>
}
