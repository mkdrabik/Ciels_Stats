import { useState, useEffect, useRef } from "react"
import './App.css';
import { txtDB } from "./txtConfig";
import v4 from "uuid"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function App() {
  const[game, setGame] = useState({date: "", opponent: "", points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fouls: 0, win: ""})
  const d = useRef("")
  const o = useRef("")
  const p = useRef(0)
  const r = useRef(0)
  const a = useRef(0)
  const s = useRef(0)
  const b = useRef(0)
  const f = useRef(0)
  const w = useRef("")
  var emp = true

  useEffect(()=>{
    setGame({points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fouls: 0, win: "", opponent:"", date: ''})
    clear()
  }, [])
  
//Handle Data Upload
const handleUpload = async () =>{
  const valRef= collection(txtDB, 'AAU')
  try{
    game.date.toString()
    await setDoc(doc(txtDB, "AAU", game.date.toString()), 
  {
    "Points": Number(game.points),
    "Assists": Number(game.assists),
    "Rebounds": Number(game.rebounds),
    "Opponent": game.opponent,
    "Steals": Number(game.steals),
    "Blocks": Number(game.blocks),
    "Win": game.win,
    "Fouls": Number(game.fouls)
  })
  alert("Data added successfully.")
} catch(err){
  emp = true
}
}


  return (
    <>
    <input placeholder='How many points'
    className = "new-item-form" 
    type = 'number'
    ref = {p}
    onChange={handlePointChange}
    />
    <button
    class='btn' 
    onClick={e=>{
      filled()
    }}
      >
      Submit
    </button>

    <br></br><br></br>
    <input placeholder='How many rebounds'
    className = "new-item-form"
    type = 'number' 
    ref = {r}
    onChange={handleReboundChange}
    />
    <button
    class='btn-clear' 
    onClick={e=>{
      clear()
    }}
      >
      Clear All
    </button>

    <br></br><br></br>
    <input
    className = "new-item-form" 
    placeholder= 'How many assists'
    type = 'number'
    ref = {a}
    onChange={handleAssistChange}/>
    <br></br><br></br>

    <input placeholder= 'How many steals'
    ref = {s}
    type = 'number'
    onChange={handleStealChange}/>
    <br></br><br></br>

    <input placeholder='How many blocks'
    ref = {b}
    type = 'number'
    onChange={handleBlockChange}/>
    <br></br><br></br>

    <input placeholder='How many fouls'
    ref = {f}
    type = 'number'
    onChange={handleFoulChange}/>
    <br></br><br></br>

    <input placeholder='Win?'
    ref = {w}
    type = 'text'
    onChange={handleWinChange}/>
    <br></br><br></br>

    <input placeholder='Opponent?'
    ref = {o}
    type = 'text'
    onChange={handleOpponentChange}/>
    <br></br><br></br>

    <input placeholder='Enter Timing Impact'
    type = 'date'
    ref = {d}
    onChange={handleDateChange}/>
    <br></br><br></br>
    </>
  );
  


//Handle Data entry functions
  function handlePointChange(e){
    setGame(g => ({...game, points: e.target.value}))
  }
  function handleReboundChange(e){
    setGame(g => ({...game, rebounds: e.target.value}))
  }
  function handleStealChange(e){
    setGame(g => ({...game, steals: e.target.value}))
  }
  function handleAssistChange(e){
    setGame(g=> ({...game, assists: e.target.value}))
  }
  function handleBlockChange(e){
    setGame(g=> ({...game, blocks: e.target.value}))
  }
  function handleFoulChange(e){
    setGame(g=> ({...game, fouls: e.target.value}))  
  }
  function handleWinChange(e){
    setGame(g=> ({...game, win: e.target.value}))  
  }
  function handleDateChange(e){
    setGame(g=> ({...game, date: e.target.value}))  
  }
  function handleOpponentChange(e){
    setGame(g=> ({...game, opponent: e.target.value}))  
  }
  

//Checks to see if all fields are filled then calls handle upload
  function filled(){
    emp = false
    for (let key in game){
      if(game[key] === '' || game[key]=== null){
        emp = true
        break
      }
    }
    if(emp === false ){
      handleUpload()
      if(emp===false){
      clear()
      } else {
        alert("Enter a valid date")
      }
    }
  }

//Sets everything empty
  function clear(){
    p.current.value = ''
    r.current.value = ''
    a.current.value = ''
    f.current.value = ''
    s.current.value = ''
    b.current.value = ''
    d.current.value = ''
    w.current.value = ''
    o.current.value = ''
    setGame({points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fouls: 0, win: '', opponent: ''})
  }


}

export default App;
