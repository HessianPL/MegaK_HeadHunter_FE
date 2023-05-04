import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './ForgottenPasswordPage.css';
import 'react-toastify/dist/ReactToastify.css';

function ForgottenPasswordPage() {

  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: FormEvent) => {

    // DO DODANIA INTERAKCJA Z BACKENDEM ORAZ WERYFIKACJA PRZESYLANYCH DANYCH 

     e.preventDefault();
     if(email){
      toast.success("Wiadomość wysłana na email!");
      navigate("/login");
     }else{
      toast.error("Niepoprawny email!");
      navigate("/forgotten");
     }

  }

  const navigate = useNavigate();

  return (
    <div className="ForgottenPasswordPage">
            <img src={require("../../Assets/Images/megak_logo.webp")} alt="Logo MegaK" />
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} placeholder='E-mail' onChange={e=>setEmail(e.target.value)} />
                <button>Resetuj hasło</button>
            </form>
    </div>
  );
}

export default ForgottenPasswordPage;
