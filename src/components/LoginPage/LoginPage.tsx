import React, {FormEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './LoginPage.css';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: FormEvent) => {

    // DO DODANIA INTERAKCJA Z BACKENDEM ORAZ WERYFIKACJA PRZESYLANYCH DANYCH 

     e.preventDefault();
     if(password && email){
      toast.success("Zalogowano poprawnie!");
      navigate("/main");
     }else{
      toast.error("Niepoprawne dane!");
      navigate("/login");
     }

  }

  const navigate = useNavigate();

  return (
    <div className="LoginPage">
            <img src={require("../../Assets/Images/megak_logo.webp")} alt="Logo MegaK" />
            <form onSubmit={handleSubmit}>
                <input type="text" value={email} placeholder='E-mail' onChange={e=>setEmail(e.target.value)} />
                <input type="password" value={password} placeholder='Hasło' onChange={e=>setPassword(e.target.value)}/>
                <div className='Row'>
                <p>Zapomniałeś hasła?</p><button>Zaloguj się</button>
                </div>
            </form>
    </div>
  );
}
export default LoginPage;
