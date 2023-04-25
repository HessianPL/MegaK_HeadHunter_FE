import { BaseSyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {

	const navigate = useNavigate();

	const logOut = async (e: BaseSyntheticEvent) => {
		e.preventDefault();

		navigate('/login');

		// @TODO Do poprawienia po uzupełnieniu endpointu przez BE

		/*const res = await fetch('http://localhost:3001/auth/logout', {
			credentials: "include",
		});
		const result = await res.json();
		if (result) {
			navigate('/login');
		}*/
	}

	return <>
		<button
			className="btn btn-dark"
			onClick={logOut}
		>Wyloguj
		</button>
	</>
}