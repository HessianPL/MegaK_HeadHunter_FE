import { AdminMenu } from "../components/admin/AdminMenu";
import ImportCSV from "../components/admin/ImportCSV";
import { AddFormHR } from "../components/admin/AddFormHR";

export const AdminView = () => {
	return <>
		<AdminMenu/>
		<h1 className="my-5 ms-5 theme-text-light theme-bg-dark-2">Witaj, Admin!</h1>
		<ImportCSV/>
		<AddFormHR/>
	</>
}