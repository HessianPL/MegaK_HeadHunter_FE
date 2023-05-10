import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import './SignupPage.css';
import { apiUrl } from "../../../config/api";
import { Spinner } from "../Spinner/Spinner";

function SignupPage() {

    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { id, registerToken } = useParams();

    useEffect(() => {
        (async () => {
            const res = await fetch (`${apiUrl}/user/email/${id}`, {
                credentials: 'include',
            });
            setEmail((await res.json()).email);
        })();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        if (password === passwordCheck) {

            try {
                const res = await fetch(`${apiUrl}/register/${id}/${registerToken}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pwd: password,
                    }),
                });
                const response = await res.json();

                if (response.message === 'ok') {
                    toast.success("Konto aktywne! Możesz się zalogować.");
                    navigate("/login");
                } else {
                    toast.error(`Nie udało się aktywować konta. ${response.message}`);
                }

            } finally {
                setLoading(false);
            }
        }
    }

    if (loading) {
        return <Spinner/>
    }

    return (
        <div className="SignupPage">
            <img src={require("../../../Assets/Images/megak_logo.webp")} alt="Logo MegaK" />
            <form onSubmit={handleSubmit}>
                <input
                    className="email"
                    type="text"
                    value={email}
                    placeholder='E-mail'
                    readOnly
                />
                <input
                    type="password"
                    value={password}
                    placeholder='Hasło'
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    value={passwordCheck}
                    placeholder='Powtórz hasło'
                    onChange={e => setPasswordCheck(e.target.value)}
                />
                <div className='Row'>
                    <button>Zarejestruj się</button>
                </div>
            </form>
        </div>
    );
}

export default SignupPage;