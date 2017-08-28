import React from 'react';
import Scrollchor from 'react-scrollchor';

const Donazione = () => (
  <div className="sp__container jumptarget" id="top">
    <h2 className="newBlog__banner">Donazione</h2><br />
    <div className="sp__in-page-nav">
      <Scrollchor
        to="#idoneita"
        className="sp__ipn-link sp__torna-su"
      >
          Idoneit&agrave;
      </Scrollchor>&nbsp;
      <Scrollchor
        to="#sangue"
        className="sp__ipn-link sp__torna-su"
      >
        Il sangue
      </Scrollchor>&nbsp;
      <Scrollchor
        to="#sospensione"
        className="sp__ipn-link sp__torna-su"
      >
        Sospensione
      </Scrollchor>
    </div>
    <h3 className="sp__title jumptarget" id="idoneita">Idoneit&agrave;</h3>
    <div className="sp__body">
      <p><em>Requisiti fisici del donatore per l&rsquo;accettazione del
       donatore di sangue e di emocomponenti mediante aferesi.</em></p>
      <h4><strong>Donazione di sangue intero</strong></h4>
      <ul>
        <li>Età compresa fra 18 e 65 anni.</li>
        <li>Peso non inferiore a 50 kg.</li>
        <li>Pressione Arteriosa sistolica(&ldquo;massima&rdquo;) inferiore o uguale a 180
         mmHg.</li>
        <li>Pressione Arteriosa diastolica(&ldquo;minima&rdquo;) inferiore o uguale a 100
         mmHg.</li>
        <li>Frequenza cardiaca regolare, compresa fra 50 e 100 battiti/minuto.
        </li>
        <li>Emoglobina di almeno 13,5 grammi per decilitro nell&rsquo;uomo.
        </li>
        <li>Emoglobina di almeno 12,5 grammi per decilitro nella donna.</li>
        <li>Il numero di donazioni di sangue intero non deve essere superiore
         a 4/anno per l&rsquo;uomo e 2/anno per la donna in et&agrave; fertile.
         </li>
      </ul>
      <p>Dopo la donazione il donatore deve osservare adeguato riposo sulla
      poltrona o lettino da prelievo e ricevere congruo ristoro comprendente
      l&rsquo;assunzione di liquidi in quantità adeguata.</p>
      <h4><strong>Donazione di plasma</strong></h4>
      <p>Valgono gli stessi requisiti previsti per il sangue intero, tranne i
       valori di emoglobina , che non devono essere inferiori a:</p>
      <ul>
        <li>12,5 grammi per decilitro nell&rsquo;uomo.</li>
        <li>11,5 grammi per decilitro nella donna.</li>
        <li>12 grammi per decilitro e 11 nei portatori di trait talassemico.
        </li>
      </ul>
      <h4><strong>Donazione multicomponente</strong></h4>
      <p>Valgono gli stessi requisiti gi&agrave; previsti per la donazione
      di sangue intero, ma il peso deve essere superiore a 60 kg se la
       donazione prevede la raccolta di un componente eritrocitario.</p>
      <p>Il volume complessivo degli emocomponenti raccolti non deve essere
       superiore a 700 millilitri, al netto del volume dell&rsquo;
        anticoagulante impiegato.</p>
      <Scrollchor
        to="#top"
        className="sp__torna-su"
      >
      Torna su
    </Scrollchor>
      <h3 className="sp__title jumptarget" id="sangue">Il sangue</h3>
      <p>Il sangue &egrave;l&rsquo;intermedio indispensabile tra il nostro
       corpo e l&rsquo;ambiente che ci circonda: sospinto dal cuore,
        attraverso un sistema di canali o vasi, distinti in arterie, vene e
         capillari d&agrave; alle cellule le sostanze alimentari e l&rsquo;
         ossigeno, ed elimina le sostanze di rifiuto che si producono nell
         &rsquo;organismo.</p>
      <h4><strong>La composizione</strong></h4>
      <p>Il sangue &egrave; un tessuto, per circa il 55% liquido (plasma) e
       per il restante 45% composto principalmente da tre specie di elementi
        cellulari:</p>
      <ul>
        <li>globuli rossi</li>
        <li>globuli bianchi</li>
        <li>piastrine</li>
      </ul>
      <p>Il sangue si distingue in arterioso e venoso: l&rsquo;arterioso
       &egrave; di colore rosso vivo e ricco di ossigeno, il venoso &egrave;
        di colore rosso cupo e carico di anidride carbonica.</p>
      <h4><strong>Il plasma</strong></h4>
      <p>&Egrave; formato prevalentemente da acqua, che mantiene in
      sospensione proteine, sostanze minerali e sostanze ottenute dalla
      digestione degli alimenti: raccoglie le sostanze di rifiuto, mantiene
       costante il volume del sangue attraverso i fattori di coagulazione e il
        fibrinogeno (sostanza di natura proteica che per effetto di reazioni
          enzimatiche si trasforma in fibrina determinando la coagulazione e
          l&rsquo;arresto della fuoriuscita di sangue).</p>
      <h4><strong>Globuli rossi</strong></h4>
      <p>Ogni persona ne può contare da 4 a 5,8 milioni per millimetro cubo di
       sangue: trasportano l&rsquo;ossigeno prelevato negli alveoli polmonari
        e sono prodotti (come i globuli bianchi e le piastrine) a partire da
         cellule indifferenziate presenti nel midollo osseo, dette cellule
         staminali.</p>
      <h4><strong>Globuli bianchi</strong></h4>
      <p>In ogni millimetro cubo di sangue possono variare da 4.500 a 10.500
       per millimetro cubo. Al microscopio appaiono incolori e trasparenti:
        hanno il compito di assimilare e distruggere i batteri o altri
        corpuscoli estranei e dannosi all&rsquo;organismo. Sono fabbricati
        nella milza, nelle ghiandole linfatiche e nel midollo osseo.</p>
      <h4><strong>Piastrine</strong></h4>
      <p>Sono frammenti di cellule prodotte dal midollo osseo e hanno parte
      attiva nella coagulazione del sangue in caso di ferite o emorragie: ogni
       millimetro cubo di sangue ne può contenere da 150 a 400 mila.</p>
      <h4><strong>I gruppi sanguigni</strong></h4>
      <p>Il sangue si differenzia in 4 tipi fondamentali:</p>
      <ul>
        <li>A</li>
        <li>B</li>
        <li>AB</li>
        <li>0 (zero)</li>
      </ul>
      <p>Ogni gruppo si differenzia per le particolari sostanze presenti sulla
      superficie dei globuli rossi, ed &egrave; definito positivo o negativo
      dalla presenza o meno del fattore RH. La presenza dei gruppi sanguigni
      &egrave; cos&igrave; suddivisa sul territorio italiano: 40% gruppo 0
      (zero); 36% gruppo A; 17% gruppo B; 7% gruppo AB; l&rsquo;85% della
      popolazione italiana &egrave; definita RH+ e il 15% RH-.</p>
      <Scrollchor
        to="#top"
        className="sp__torna-su"
      >
      Torna su
    </Scrollchor>
      <h3 className="sp__title jumptarget" id="sospensione">Sospensione</h3>
      <p>Il decreto ministeriale 2 novembre 2015 del Ministero della Salute
      &ldquo;Disposizioni relative ai requisiti di qualit&agrave; e sicurezza
       del sangue e degli emocomponenti&rdquo; elenca le cause di sospensione
        dalla donazione con i relativi periodi di fermo.</p>
      <h4><strong>Principali motivi di sospensione</strong></h4>
      <ul>
        <li>Trasfusione di emocomponenti o somministrazione di emoderivati
        (sieroterapia): 4 mesi.</li>
        <li>Spruzzo delle mucose con sangue, lesioni da ago, tagli con
        strumenti contaminati: 4 mesi.</li>
        <li>Esame endoscopico con strumenti flessibili (gastroscopia,
          colonscopia, artroscopia, laringoscopia, isteroscopia): 4 mesi.</li>
        <li>Tatuaggi, body piercing, foratura delle orecchie: 4 mesi.</li>
        <li>Agopuntura se non eseguita da professionisti qualificati con ago
        usa e getta: 4 mesi.</li>
        <li>Comportamenti sessuali a rischio di malattie infettive: 4 mesi.
        </li>
        <li>Intervento chirurgico maggiore (anestesia generale): 4 mesi.</li>
        <li>Intervento chirurgico minore (es. cisti, lipomi...): 1 mese.</li>
        <li>Cure odontoiatriche:
    <ul><li>Detartrasi: 48 ore.</li><li>Estrazione dentaria, devitalizzazione,
     implantologia: 1 settimana dalla completa guarigione.</li></ul></li>
        <li>Gravidanza:<ul><li>6 mesi dopo il parto.</li><li>6 mesi dopo
        aborto.</li></ul></li>
        <li>Trapianti di tessuti o cellule di origine umana: 4 mesi.</li>
        <li>Trapianti di cornea, sclera dura madre: non idoneo.</li>
        <li>Vaccinazioni:
    <ul><li>Bcg, antivaiolo, antipolio (orale), antimorbillo, antiparotite,
          antirosalia, antifebbre gialla: 4 settimane.</li>
      <li>Epatite B, rabbia
          (profilassi), tetano, difterite, febbre tifoide e paratifoide,
          colera, febbre delle montagne rocciose, influenza, poliomelite,
          peste: 48 ore se asintomatico.</li></ul></li>
        <li>Mononuscleosi: 6 mesi dalla completa guarigione.</li>
        <li>Toxoplasmosi: 6 mesi dalla completa guarigione.</li>
        <li>Brucellosi, osteomielite, febbre Q, tubercolosi: 2 anni dalla
        completa guarigione.</li>
        <li>Febbre reumatica: 2 anni dalla la cessazione dei sintomi in
        assenza di cardiopatia cronica.</li>
        <li>Febbre superiore 38°: 2 settimane dalla la cessazione dei sintomi.
        </li>
        <li>Affezioni di tipo influenzale: 2 settimane dalla la cessazione dei
        sintomi.</li>
        <li>Herpes zoster (fuoco di S. Antonio): 3 mesi dalla guarigione.</li>
        <li>Fratture in atto: riammissione dopo completa guarigione.</li></ul>
      <h4><strong>Malaria</strong></h4>
      <ol>
        <li>Soggetti che hanno vissuto per un periodo di 6 mesi o più
        (continuativi) in zona endemica in qualsiasi momento della loro vita
<ul>
  <li>Questi soggetti non possono donare fino a quando non venga effettuato
  uno specifico test immunologico, con esito negativo, in quanto a rischio di
  essere diventati portatori asintomatici del parassita malarico.</li>
  <li>Devono essere sospesi dalle donazioni per almeno 6 mesi dall&rsquo;ultimo
  soggiorno di qualsiasi durata in zona ad endemia malarica.</li>
  <li>Possono essere accettati come donatori se risulta negativo un test
  immunologico per la ricerca di anticorpi antimalarici eseguito almeno 6 mesi
  dopo l&rsquo;ultima visita in area endemica malarica.</li>
  <li>Se il test risulta ripetutamente reattivo, il donatore è sospeso per 3
  anni; successivamente può essere rivalutato e accettato per la donazione se
  il test risulta negativo.</li></ul></li>
        <li>Soggetti che hanno sofferto di malaria, soggetti che hanno
        sofferto di episodi febbrili non diagnosticati compatibili con la
        diagnosi di malaria durante un soggiorno in area ad endemia malarica o
         nei 6 mesi successivi al rientro
    <ul><li>Devono essere sospesi dalla donazione per almeno 6 mesi dalla
    cessazione dei sintomi e dalla sospensione della terapia.</li>
      <li>Possono essere accettati come donatori se risulta negativo un test
      immunologico per la ricerca di anticorpi antimalarici eseguito almeno 6
      mesi dopo la cessazione dei sintomi e la sospensione della terapia; se
      il test risulta ripetutamente reattivo, il donatore è sospeso per 3
      anni; successivamente può essere rivalutato e accettato per la donazione
      se il test risulta negativo.</li></ul></li>
        <li>Tutti gli altri soggetti che hanno visitato un&rsquo;area ad endemia
        malarica e che non hanno sofferto di episodi febbrili o di altra
        sintomatologia compatibile con la diagnosi di malaria durante il
        soggiorno o nei 6 mesi successivi al rientro
    <ul><li>Possono essere accettati come donatori se sono passati almeno 6
    mesi dall&rsquo;ultima visita in un&rsquo;area ad endemia malarica e se risultano
    negativi ad un test immunologico per la ricerca di anticorpi anti-malarici.
    </li>
      <li>Se il test risulta ripetutamente reattivo, il donatore è sospeso per
      3 anni; successivamente può essere rivalutato e accettato per la
      donazione se il test risulta negativo.</li>
      <li>Se il test non viene effettuato il soggetto può donare se sono
      passati almeno 12 mesi dall&rsquo;ultima visita in un&rsquo;area ad endemia malarica.
      </li></ul></li></ol>
      <p>I test e i periodi di sospensione possono essere evitati in caso di
      donazione di solo plasma da avviare alla produzione industriale di
      farmaci emoderivati.</p>
      <h4><strong>Malattie tropicali</strong></h4>
      <ul>
        <li>6 mesi dal rientro da un viaggio in aree tropicali; valutare lo
        stato di salute del donatore con particolare attenzione a episodi
        febbrili dopo il rientro e le condizioni igienico-sanitarie ed
        epidemiologiche della zona in causa.</li>
        <li>Viaggi in paesi al di fuori delle aree tropicali dove è segnalata
        la presenza di malattie tropicali: si applica un periodo di
        sospensione stabilito sulla base della specifica malattia infettiva
        presente (vedi elenco Paesi nel mondo anno 2012).</li></ul>
      <h4><strong>Farmaci</strong></h4>
      <ul>
        <li>Antiacidi, omeprazolo e derivati, antispastici (es. Buscopan),
        procinetici (es. Levopraid), acidi biliari (es. Deursil), lassativi,
        carbone vegetale, fermenti lattivi: idoneo.</li>
        <li>Eradicazione Helicobacter P. : sospensione 15 giorni dal termine
        della terapia.</li>
        <li>Antibiotico topico intestinale (es. Normix): sospensione 15 giorni
        dal termine della terapia.</li>
        <li>Vitamine, integratori, sali minerali, Aa (es. carnitina): idoneo.
        </li>
        <li>Statine, fibrati per dislipidemie: idoneo.</li>
        <li>Ferro, vitamina B12, folati: idoneo.</li>
        <li>Eritropoietina: non idoneo.</li>
        <li>Calcieparina: 15 giorni, valutazione secondo patologia.</li>
        <li>ASA (aspirinetta): 5 giorni.</li>
        <li>Fans (Oki, Aulin, Brufen): 5 giorni.</li>
        <li>Antiemorragici (es. Tranex): se occasionale, idoneo.</li>
        <li>Vasoprotettori (es. Venoruton): idoneo.</li>
        <li>Antiaritmici: non idoneo.</li>
        <li>Immunoterapia per allergie: 72 ore.</li></ul>
      <Scrollchor
        to="#top"
        className="sp__torna-su"
      >
      Torna su
  </Scrollchor>
    </div>
  </div>
);

export default Donazione;
