import { AdminMenu } from "../components/admin/AdminMenu";
import ImportCSV from "../components/admin/ImportCSV";
import { AddFormHR } from "../components/admin/AddFormHR";
import {UserGreeting} from "../components/common/UserGreeting/UserGreeting";
import {useEffect, useState} from "react";

export const AdminView = () => {
	const [userName, setUserName] = useState('');

	// useEffect(() => {
	// 	(async () => {
	// 		const response = await fetch(`adres API z endpointem, z którego można pobrać user name`, {
	// 			credentials: 'include',
	// 		});
	// 		const user = await response.json;
	// 		setUserName(user.name);
	// 	})();
	// }, []);

	return <>
		<AdminMenu/>
		<UserGreeting userName={userName}/>
		<ImportCSV/>
		<AddFormHR/>
	</>
}