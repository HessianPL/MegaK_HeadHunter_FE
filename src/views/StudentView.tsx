import { LogoutButton } from "../components/common/LogoutButton";
import {AddFormStudent} from "../components/AddFormStudent/AddFormStudent";

export const StudentView = () => {
	return <>
		<h1 className="theme-text-light">Widok kursanta</h1>
		<LogoutButton/>
		<AddFormStudent/>
	</>
}