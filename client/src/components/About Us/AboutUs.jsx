import React from "react";
import NavBar from "../Navbar/Navbar.jsx";
import Igna from "../../utils/AboutUs/Igna.jpg";
import Gaston from "../../utils/AboutUs/Gaston.jpg";
import Sergio from "../../utils/AboutUs/Sergio.jpg";
import Seba from "../../utils/AboutUs/Seba.jpg";
import Gio from "../../utils/AboutUs/Gio.jpg";
import GitHubLogo from "../../utils/AboutUs/GitHubLogo.png";
import LinkedinLogo from "../../utils/AboutUs/LinkedinLogo.png";
import styles from "../About Us/AboutUs.module.css";


export default function AboutUs() {

    const nosotros = [{
        name: "Sol Gomez Estevez",
        image: Igna,
        linkedin: "https://www.linkedin.com/in/sol-gomez-estevez/",
        github: "https://github.com/solgz",
    },
    {
        name: "Ignacio Luna",
        image: Igna,
        linkedin: "",
        github: "https://github.com/ignaluna",
    },
    {
        name: "Gaston Saravia",
        image: Gaston,
        linkedin: "https://www.linkedin.com/in/gast%C3%B3n-saravia-1b4452182/",
        github: "https://github.com/Gasnis",
    },
    {
        name: "Sergio Zampieri",
        image: Sergio,
        linkedin: "https://www.linkedin.com/in/sergio-zampieri-bb9b42264/",
        github: "https://github.com/SergioZampieri",
    },
    {
        name: "Jose Canelo",
        image: Gaston,
        linkedin: "",
        github: "https://github.com/Josecanelo",
    },
    {
        name: "Thomas Rojas",
        image: Gaston,
        linkedin: "",
        github: "https://github.com/ThomRojas",
    },
    {
        name: "Giovany Vazquez ",
        image: Gio,
        linkedin: "",
        github: "https://github.com/gioh2020",
    },
    {
        name: "Sebastian Florez ",
        image: Seba,
        linkedin: "",
        github: "https://github.com/SebasFj",
    },
    ]

    return (
        <div>
            <NavBar />
            <h1>Sobre el equipo</h1>
            <p>Somos un grupo de alumnos del bootcamp soyHenry, presentando como proyecto final una aplicación web para aquellas personas que buscan conectar con experiencias nocturnas entre amigos.</p>
            <div className={styles.container}>
                {nosotros.map((dev) =>
                    <div className={styles.each}>
                        <img src={dev.image} alt="img" className={styles.image} />
                        <div >
                            <h3>{dev.name}</h3>
                            <h4>FullStack Developer </h4>
                            <a href={dev.github}>
                                <img src={GitHubLogo} alt="" height="30px" width="30px" />
                            </a>
                            <a href={dev.linkedin}>
                                <img src={LinkedinLogo} alt="" height="30px" width="30px" />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}