import { useState, useEffect, useRef } from "react"
import './App.css';
import { txtDB } from "./txtConfig";
import v4 from "uuid"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function App() {
  const[project, setProject] = useState({pm:"", product: "", summary:"", customer: "", kof: "", pb: "", link: "", ti: 0})
  const pm = useRef("")
  const prod = useRef("")
  const sum = useRef("")
  const cust = useRef("")
  const kof = useRef("")
  const pb = useRef("")
  const ti = useRef(0)
  const l = useRef("")
  var emp = true

  useEffect(()=>{
    setProject({pm: "", product: "", summary: "", customer: "", kof: "", pb: "", link: "", ti: ""})
    clear()
  }, [])
  
//Handle Data Upload
const handleUpload = async () =>{
  const valRef= collection(txtDB, 'IHM')
  await setDoc(doc(txtDB, "IHM", project.product), 
  {PM: project.pm, 
    "Customer": project.customer,
    "PM": project.pm,
    "Key Objective Failures(Y/N)": project.kof,
    "Procedure Bypasses": project.pb,
    "Link": project.link,
    "Timing Impact": project.ti
  })
  alert("Data added successfully.")
}


  return (
    <>
    <input placeholder='Enter PM Name'
    className = "new-item-form" 
    type = 'text'
    ref = {pm}
    onChange={handlePMChange}
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
    <input placeholder='Enter Product Name'
    className = "new-item-form" 
    ref = {prod}
    onChange={handleProductChange}
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
    placeholder='Enter Customer'
    ref = {cust}
    onChange={handleCustomerChange}/>
    <br></br><br></br>

    <input placeholder='Enter Summary'
    ref = {sum}
    onChange={handleSummaryChange}/>
    <br></br><br></br>

    <input placeholder='Were there Key Objective Failures(Y/N)'
    ref = {kof}
    onChange={handleKOFChange}/>
    <br></br><br></br>

    <input placeholder='Were there Procedure Bypasses(Y/N)'
    ref = {pb}
    onChange={handlePBChange}/>
    <br></br><br></br>

    <input placeholder='Paste Link'
    ref = {l}
    onChange={handleLinkChange}/>
    <br></br><br></br>

    <input placeholder='Enter Timing Impact'
    type = 'number'
    ref = {ti}
    onChange={handleTimeImpactChange}/>
    <br></br><br></br>
    </>
  );
  





{//Handle Data entry functions
}
  function handlePMChange(e){
    setProject(p => ({...project, pm: e.target.value}))
  }
  function handleProductChange(e){
    setProject(p => ({...project, product: e.target.value}))
  }
  function handleSummaryChange(e){
    setProject(p => ({...project, summary: e.target.value}))
  }
  function handleCustomerChange(e){
    setProject(p=> ({...project, customer: e.target.value}))
  }
  function handleKOFChange(e){
    setProject(p=> ({...project, kof: e.target.value}))
  }
  function handlePBChange(e){
    setProject(p=> ({...project, pb: e.target.value}))  
  }
  function handleLinkChange(e){
    setProject(p=> ({...project, link: e.target.value}))  
  }
  function handleTimeImpactChange(e){
    setProject(p=> ({...project, ti: e.target.value}))  
  }

{//Checks to see if all fields are filled then calls handle upload
}
  function filled(){
    emp = false
    for (let key in project){
      if(project[key] === ''){
        emp = true
        break
      }
    }
    if(emp === false ){
      handleUpload()
      console.log({project}); setProject({pm: "", product: "", summary: "", customer: "", link: ""})
      clear()
    }
  }

{//Sets everything empty
}
  function clear(){
    pm.current.value = ''
    prod.current.value = ''
    sum.current.value = ''
    cust.current.value = ''
    kof.current.value = ''
    pb.current.value = ''
    l.current.value = ''
    ti.current.value = ''
    setProject({pm: "", product: "", summary: "", customer: "", kof: "", pb: "", link: "", ti: ''})
  }


}

export default App;
