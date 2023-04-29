import { Link } from "react-router-dom";
import { LogoutButton } from "../common/LogoutButton";

export const AdminMenu = () => {
	return (
		<div className="navbar navbar-expand-md sticky-top theme-bg-dark-3">
			<div className="container-fluid">
				<a href="/"
				   className="navbar-brand">
					<img
						src="/megak_logo.webp"
						alt="Logo MegaK"
						height="48"
						className="d-inline-block"
					/>
				</a>
				<LogoutButton/>
			</div>
		</div>
	)
}