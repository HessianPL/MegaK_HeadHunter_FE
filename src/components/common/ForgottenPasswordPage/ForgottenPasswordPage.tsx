import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './ForgottenPasswordPage.css';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from "../../../config/api";
import { Spinner } from "../Spinner/Spinner";

function ForgottenPasswordPage() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {

      e.preventDefault();

      if (email) {

          try {
              setLoading(true);

              const res = await fetch(`${apiUrl}/register/resend-email`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({email: email}),
              });

              const response = await res.json();

              if (response.message === 'wysłano') {
                  toast.success("Wiadomość wysłana na podany adres email!");
              } else {
                  toast.error("Niepoprawny adres email!");
                  console.log(response.message);
              }

          } finally {
              setLoading(false);
          }
      } else {
          toast.error("Podaj adres email!");
      }
  }

  if (loading) {
      return <Spinner/>;
  }

  return (
    <div className="ForgottenPasswordPage">
            <img src={require("../../../Assets/Images/megak_logo.webp")} alt="Logo MegaK" />
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} placeholder='E-mail' onChange={e=>setEmail(e.target.value)} />
                <button className="btn theme-btn-mainbrand px-4">Resetuj hasło</button>
            </form>
    </div>
  );
}

export default ForgottenPasswordPage;
