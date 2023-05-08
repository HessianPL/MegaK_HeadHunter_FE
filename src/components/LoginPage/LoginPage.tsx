import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './LoginPage.css';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../contexts/user-context";
import { apiUrl } from "../../config/api";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({
        email: '',
        pwd: '',
    });

    const {setRole, setId} = useContext(UserContext);

    const navigate = useNavigate();

    const updateForm = (key: string, value: any) => {
        setUser(user => ({
            ...user,
            [key]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        if (user.pwd && user.email) {
            const res = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(user),
            });

            const result = await res.json();

            if (result.ok) {
                setRole(result.role);
                setId(result.id);

                localStorage.setItem("cookieUser", JSON.stringify({role:result.role,email:result.email } ));

                switch(result.role) {
                    case 'Admin':
                        navigate('/admin');
                        break;
                    case 'Student':
                        navigate('/student');
                        break;
                    case 'HR':
                        navigate('/recruiter');
                        break;
                    default:
                        return <div>Nieznana rola użytkownika/czki. Proszę skontaktować się z adminem/ką aplikacji.</div>
                }
            }

        } else {
            toast.error("Niepoprawne dane!");
            navigate("/login");
        }
    }

    return (
        <div className="LoginPage">
            <img src={require("../../Assets/Images/megak_logo.webp")} alt="Logo MegaK" />
            <form onSubmit={handleSubmit}>
                <input type="text" value={user.email} placeholder='E-mail' onChange={e => updateForm('email', e.target.value)} />
                <input type="password" value={user.pwd} placeholder='Hasło' onChange={e => updateForm('pwd', e.target.value)}/>
                <div className='Row'>
                    <p>Zapomniałeś hasła?</p><button>Zaloguj się</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
