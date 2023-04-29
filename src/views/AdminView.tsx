import { AdminMenu } from "../Components/admin/AdminMenu";
import ImportCSV from "../Components/admin/ImportCSV";

export const AdminView = () => {
	return <>
		<AdminMenu/>
		<h1 className="my-5 ms-5 theme-text-light theme-bg-dark-2">Witaj, Admin!</h1>
		<ImportCSV />
	</>
}