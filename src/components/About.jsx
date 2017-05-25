import React from 'react';
import mySvg from '../images/drops-heart.svg';

const About = () => (
  <div className="about">
    <div className="about__text">L&rsquo;Avis è un&rsquo;associazione di volontariato con finalità di solidarietà: esclude qualsiasi fine di lucro ed è costituita tra coloro che donano volontariamente, gratuitamente, periodicamente e anonimamente il proprio sangue. È attiva a Rovigo dal 1953 e, secondo i principi della Costituzione, l&rsquo;Avis è apartitica, aconfessionale, senza discriminazione di razza, sesso, religione, lingua, nazionalità né di ideologia politica.</div>
    <div className="about__ctacontainer">
      <img className="about__image" src={mySvg} alt="" />
      <div className="about__cta">
        <p className="about__cta--red">Diventa donatore anche tu!</p>
        <p className="about__cta--blue">Scarica il modulo oppure vieni a trovarci nella nostra sede.</p>
      </div>
    </div>
  </div>
);

export default About;
