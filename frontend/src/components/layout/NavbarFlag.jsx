import { useState } from "react"

function NavbarFlag() {
   const setLanguage = (e) => {
     localStorage.setItem('language',e.target.name)
     setLang(e.target.name)
     window.location.reload(false)
   }

   const [lang,setLang] = useState(localStorage.getItem('language'))

  return (
    <ul className="languages">
        <li className = {`${lang === 'english' && 'under-line'}` } ><img className="flag-img" src={require("../assets/flag/uk.png")} alt="En"  name="english" onClick={setLanguage} /></li>
        <li className = {`${lang === 'chinese' && 'under-line'}` }><img className="flag-img" src={require("../assets/flag//china.png")} alt="CH"  name="chinese" onClick={setLanguage} /></li>
        <li className = {`${lang === 'japanese' && 'under-line'}` }><img className="flag-img"  name="japanese" src={require("../assets/flag//japan.png")} alt="JA" onClick={setLanguage} /></li>
    </ul>
  )
}
export default NavbarFlag