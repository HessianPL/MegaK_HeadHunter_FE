import { LogoutButton } from "../components/common/LogoutButton";
import ImportCSV from "../components/admin/ImportCSV";
import { AdminMenu } from "../components/admin/AdminMenu";

export const AdminView = () => {
	return <>
		<AdminMenu/>
		<h1 className="my-5 ms-5 theme-text-light theme-bg-dark-2">Witaj, Admin!</h1>
		<ImportCSV />
	</>
}