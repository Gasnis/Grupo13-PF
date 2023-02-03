import React from "react";
import NavBar from "../Navbar/Navbar.jsx";
import Igna from "../../utils/AboutUs/Igna.jpg";
import Gaston from "../../utils/AboutUs/Gaston.jpg";
import Sergio from "../../utils/AboutUs/Sergio.jpg";
import Seba from "../../utils/AboutUs/Seba.jpg";
import Gio from "../../utils/AboutUs/Gio.jpg";
import Jose from "../../utils/AboutUs/jose.jpeg";
import GitHubLogo from "../../utils/AboutUs/GitHubLogo.png";
import LinkedinLogo from "../../utils/AboutUs/LinkedinLogo.png"
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
        image: Jose,
        linkedin: "",
        github: "https://github.com/Josecanelo",
    },
    {
        name: "Thomas Rojas",
        image: Gaston,
        linkedin: "https://www.linkedin.com/in/jose-canelo-suarez-06ba71223/",
        github: "https://github.com/ThomRojas",
    },
    {
        name: "Giovany Vazquez ",
        image: Gio,
        linkedin: "https://www.linkedin.com/in/giovanny-vasquez/",
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
            <p>Somos un grupo de alumnos del bootcamp soyHenry, y estamos muy emocionados de presentar nuestro proyecto final: una aplicación web innovadora diseñada para conectar a las personas que buscan vivir experiencias nocturnas inolvidables con sus amigos. Con nuestra plataforma, los usuarios pueden explorar y reservar lugares nocturnos únicos, planificar eventos con sus amigos y hacer que la noche sea más emocionante y memorable. ¡Esperamos que disfruten de nuestra aplicación y vivan noches llenas de diversión!</p>
            <div className={styles.container}>
                {nosotros.map((dev) =>
                    <div className={styles.each}>
                        <img src={dev.image} alt="img" className={styles.image} />
                        <div >
                            <h3>{dev.name}</h3>
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