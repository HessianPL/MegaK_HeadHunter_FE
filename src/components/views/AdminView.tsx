import { LogoutButton } from "../LogoutButton";
import ImportCSV from "../ImportCSV/ImportCSV";

export const AdminView = () => {
	return <>
		<h1>Widok admina</h1>
		<ImportCSV />
		<LogoutButton/>
	</>
}