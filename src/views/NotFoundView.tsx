import React from 'react';
import LoginView from "./LoginView";

export const NotFoundView = () => (
    <>
        <h1 className="text-center theme-text-light">Aby mieć dostęp do tych zaspobów, powinieneś być zalogowany.</h1>
        <LoginView/>
    </>
)
