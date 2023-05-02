import {useEffect, useState} from "react";

export const UserGreeting = () => {
    const [userName, setUserName] = useState('');

    // useEffect(() => {
    // 	(async () => {
    // 		const response = await fetch(`adres API z endpointem, z którego można pobrać user name`, {
    // 			credentials: 'include',
    // 		});
    // 		const user = await response.json();
    //         const email = user.email;
    // 		setUserName(email.substring(0, email.indexOf('@')));
    // 	})();
    // }, []);

    return (
            <div className="container-fluid">
                <h1 className="my-5 ms-5 theme-text-light theme-bg-dark-2">Witaj, {userName || "użytkowniku"}!</h1>
            </div>
    )
}