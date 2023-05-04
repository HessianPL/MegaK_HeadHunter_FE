import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './LoginPage.css';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../contexts/user-context";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const [user, setUser] = useState({
        email: '',
        pwd: '',
    });

    const {setRole, setId} = useContext(UserContext);

    const updateForm = (key: string, value: any) => {
        setUser(user => ({
            ...user,
            [key]: value,
        }));
    };

  const handleSubmit = async (e: FormEvent) => {

    // DO DODANIA INTERAKCJA Z BACKENDEM ORAZ WERYFIKACJA PRZESYLANYCH DANYCH 

     e.preventDefault();

     if (user.pwd && user.email) {
         const res = await fetch('http://localhost:3000/auth/login', {
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

             if (result.role === 'Admin') {
                 navigate('/admin');
             } else if (result.role === 'Student') {
                 navigate('/student');
             } else if (result.role === 'HR') {
                 navigate('/recruiter');
             }
         }
         // console.log(result);
      // toast.success("Zalogowano poprawnie!");
      // navigate("/main");
     } else {
      toast.error("Niepoprawne dane!");
      navigate("/login");
     }
  }

  const navigate = useNavigate();

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
