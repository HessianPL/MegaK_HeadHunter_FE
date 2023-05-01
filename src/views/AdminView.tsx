import { AdminMenu } from "../components/admin/AdminMenu";
import ImportCSV from "../components/admin/ImportCSV";
import { AddFormHR } from "../components/admin/AddFormHR";
import {UserGreeting} from "../components/common/UserGreeting/UserGreeting";

export const AdminView = () => {
	return <>
		<AdminMenu/>
		<UserGreeting/>
		<ImportCSV/>
		<AddFormHR/>
	</>
}