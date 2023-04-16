import React from "react";
import logo from '../images/logo.svg'

export default function Heder() {
    return (
        <header className="header">
            <img className="logo" alt="логотип" src={logo}/>
        </header>
    );
}