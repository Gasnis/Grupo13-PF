import React from "react";
import NavBar from "../Navbar/Navbar.jsx";
import Igna from "../../utils/AboutUs/Igna.jpg";
import Gaston from "../../utils/AboutUs/Gaston.jpg";
import Sergio from "../../utils/AboutUs/Sergio.jpg";
import Seba from "../../utils/AboutUs/Seba.jpg";
import Gio from "../../utils/AboutUs/Gio.jpg";
import Jose from "../../utils/AboutUs/jose.jpeg";
import Sol from "../../utils/AboutUs/Sol.jpg";
import Thomas from "../../utils/AboutUs/Thomas.png"
import styles from "../About Us/AboutUs.module.css";
import { useSelector } from "react-redux";


export default function AboutUs() {

    const checked = useSelector((state) => state.darkmode);

    const nosotros = [{
        name: "Sol Gomez Estevez",
        image: Sol,
        linkedin: "https://www.linkedin.com/in/sol-gomez-estevez/",
        github: "https://github.com/solgz",
    },
    {
        name: "Ignacio Luna",
        image: Igna,
        linkedin: "https://www.linkedin.com/in/ignaluna/",
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
        linkedin: "https://www.linkedin.com/in/jose-canelo-suarez-06ba71223/",
        github: "https://github.com/Josecanelo",
    },
    {
        name: "Thomas Rojas",
        image: Thomas,
        linkedin: "https://www.linkedin.com/in/thomas-rojas-719a1a258",
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
        linkedin: "https://www.linkedin.com/in/sebasfj",
        github: "https://github.com/SebasFj",
    },
    ]

    return (
        <div className={checked ? styles.mainContainer : styles.mainContainerDark}>
            <NavBar />
            <h1 className={styles.title}>Sobre el equipo wwWhere</h1>
            <p className={styles.description}>Somos un grupo de alumnos del bootcamp soyHenry, y estamos muy emocionados de presentar nuestro proyecto final: una aplicación web innovadora diseñada para conectar a las personas que buscan vivir experiencias nocturnas inolvidables con sus amigos. Con nuestra plataforma, los usuarios pueden explorar y reservar lugares nocturnos únicos, planificar eventos con sus amigos y hacer que la noche sea más emocionante y memorable. ¡Esperamos que disfruten de nuestra aplicación y vivan noches llenas de diversión!</p>
            <div className={styles.container}>
                {nosotros.map((dev) =>
                    <div className={checked ? styles.each : styles.eachDark}>
                        <div className={styles.imageContainer}><img src={dev.image} alt="img" className={styles.image} /></div>
                        <div >
                            <h3 className={checked ? styles.name : styles.nameDark}>{dev.name}</h3>
                            <h4>FullStack Developer </h4>
                            <div className={styles.linksContainer}>
                                <a href={dev.github} >
                                    <svg className={styles.gitHub} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                </a>
                                <a href={dev.linkedin}>
                                    <svg className={styles.linkedin} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}