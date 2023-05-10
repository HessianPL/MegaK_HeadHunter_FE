import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './SignupPage.css';

function SignupPage() {

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

    // DO DODANIA INTERAKCJA Z BACKENDEM ORAZ WERYFIKACJA PRZESYLANYCH DANYCH

  const handleSubmit = (e:any) => {

     e.preventDefault();
     if(password === passwordCheck){
      toast.success("Zarejestrowano poprawnie!");
      navigate("/login");

     }else{
      toast.error("Nie udało się zarejestrować!");
     }
  }

  const navigate = useNavigate();

  return (
    <div className="SignupPage">
            <img src={require("../../../Assets/Images/megak_logo.webp")} alt="Logo MegaK" />
            <form onSubmit={handleSubmit}>
                <input className="email"type="text" value={"uzytkownik@pietnascie.com"} placeholder='E-mail' readOnly/>
                <input type="password" value={password} placeholder='Hasło' onChange={e=>setPassword(e.target.value)}/>
                <input type="password" value={passwordCheck} placeholder='Powtórz hasło' onChange={e=>setPasswordCheck(e.target.value)}/>
                <div className='Row'>
                    <button>Zarejestruj się</button>
                </div>
            </form>
    </div>
  );
}

export default SignupPage;
