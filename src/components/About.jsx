import React from 'react';

const About = () => (
  <div className="about">
    <div className="about__text">L&rsquo;Avis è un&rsquo;associazione di volontariato con finalità di solidarietà: esclude qualsiasi fine di lucro ed è costituita tra coloro che donano volontariamente, gratuitamente, periodicamente e anonimamente il proprio sangue. È attiva a Rovigo dal 1953 e, secondo i principi della Costituzione, l&rsquo;Avis è apartitica, aconfessionale, senza discriminazione di razza, sesso, religione, lingua, nazionalità né di ideologia politica.</div>
    <div className="about__ctacontainer">
      <img className="about__image" src="https://firebasestorage.googleapis.com/v0/b/avis-website-dac6e.appspot.com/o/images%2Fstatic%20images%2Fdrops-heart.svg?alt=media&token=fc67946a-d800-448a-93db-f74ecca89fa8" alt="" />
      <div className="about__cta">
        <p className="about__cta--red">Diventa donatore anche tu!</p>
        <p className="about__cta--blue">Scarica il modulo oppure vieni a trovarci nella nostra sede.</p>
      </div>
    </div>
  </div>
);

export default About;
