import { Link } from "react-router-dom";
import { LogoutButton } from "../common/LogoutButton";

export const AdminMenu = () => {
	return (
		<div className="navbar navbar-expand-md sticky-top navbar-dark">
			<div className="container-fluid">
				<a href="/"
				   className="navbar-brand">
					<img
						src="/megak_logo.webp"
						alt="Logo Termino"
						height="48"
						className="d-inline-block"
					/>
				</a>
				<div className="collapse navbar-collapse mt-3 mt-lg-0 me-auto"
					 id="navigation">
					<ul className="navbar-nav">

					</ul>
					<LogoutButton/>

				</div>
			</div>
		</div>
	)
}