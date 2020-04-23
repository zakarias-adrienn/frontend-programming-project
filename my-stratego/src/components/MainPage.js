import React, {useState} from 'react';
import classNames from 'classnames';

export function MainPage({state, onChangeState, room_number}) {
  const [errorHappened, setErrorHappened] = useState(false);

  function verifyConnection(){
    const input = document.querySelector("#csatlakozas");
    let entered_number = parseInt(input.value);
    if(entered_number===room_number){
      setErrorHappened(false);
      onChangeState(state='PREPARE_GAME');
    }
    else{
      setErrorHappened(true);
    }

  }

  return (
    <div className="ui container" style={{width: "960px", backgroundColor: "rgb(242,234,212)", height: "740px"}}>
        <img src="assets/logo3.jpg" alt="logo"></img>
        <h3>Szabályzat</h3>
        <div id="szabalyzat">
          <p>A játékban két játékos játszik egymással egy-egy hadsereg élén. Cél az ellenfél <b>zászlójának megszerzése.</b>
          A tábla 10x10 cellából áll. Eredetileg mindkét félnek 40 bábuja van: 1 zászló, 5 bomba, és katonák 1-től 10-es erővel. </p>
          <p>Egymás bábuit azonban nem látják, csak akkor, amikor két bábu csatázni kezd. Ekkor az <b>erősebb</b> bábu marad a pályán, a gyengébbik leesik a tábláról.
              Ha két azonos bábu harcol egymással, akkor <b>mindkettő</b> lekerül a tábláról. </p>
          <p>Minden bábu csak 1-et léphet előre, hátra, jobbra, balra.
          A zászló és az akna értelemszerűen nem tud lépni.
            A táblán lehetnek olyan mezők, amelyre nem lehet lépni (tó). </p>
            <div className="ui container" style={{width: "500px"}}>
            <p>Van pár speciális figura:</p>
            <ul>
              <li>a 2-es a felderítő, ő akárhány mezőt átugorva léphet vagy támadhat. Tavat ő sem tudja átugrani.</li>
              <li>a 3-as az aknász. Csak ő tudja hatástalanítani a bombát</li>
              <li>az 1-es a kém, ha ő támadja meg az ellenfél 10-esét, akkor megöli.</li>
              <li>bomba: aki rálép, az felrobban, a bomba viszont megmarad. Csak az aknász képes leszedni a tábláról.</li>
            </ul>
            </div>
        </div>
        <div id="muveletek">
        <div className="ui segment" style={{backgroundColor: "rgb(242,234,212)"}}>
          <div className="ui two column very relaxed stackable grid">
            <div className="middle aligned column">
              <button className="ui red basic button" id="uj_jatek" onClick={()=>onChangeState(state='WAITING_FOR_SECOND_PLAYER')}>Új játék indítása</button>
            </div>
            <div className="column">
                <div className={classNames({ui:true, labeled:true, input:true, error:errorHappened})}>
                  <div className="ui label">
                  Szobaszám:
                  </div>
                  <input type="number" id="csatlakozas" placeholder="123456"/>
                </div>
                <br/>
                <br/>
              {errorHappened ? <p style={{color: "red"}}>Helytelen szobakód.</p> : null}
              <button className="ui red basic button" id="csatlakozas" onClick={verifyConnection}>Csatlakozás szobához</button>
            </div>
          </div>
          <div className="ui vertical divider">
              Vagy
          </div>
        </div>
      </div>
    </div>
  );

}