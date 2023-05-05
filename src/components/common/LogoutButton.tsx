import { BaseSyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export const LogoutButton = () => {

	const navigate = useNavigate();

	const logOut = async (e: BaseSyntheticEvent) => {
		e.preventDefault();

		const res = await fetch('http://localhost:3000/auth/logout', {
			credentials: "include",
		});
		const result = await res.json();
		if (result.ok) {
			navigate('/login');
		}
	}

	return <>
		<button
			className="ms-auto btn border-2 my-4 my-lg-0 theme-btn-mainbrand"
			onClick={logOut}
		>Wyloguj
		</button>
	</>
}