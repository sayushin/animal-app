import { useEffect,useState,useContext } from "react"
import AnimalRecord from "./AnimalRecord"

function AnimalMemorizeItem({value}) {

  const [speakWord,setSpeakWord] = useState('abc')

  const [isCircleLoading,setIsCircleLoading] = useState(false)
  

    const {chineseAnimalName,englishAnimalName,japaneseAnimalName,animalImage,_id} = value

    const [transform,setTransform] =useState('100%')

    const languageMode = localStorage.getItem('language')

    const speakText = ()=> {
      const utterance = new SpeechSynthesisUtterance()
      utterance.rate=0.7
      if(languageMode==='chinese'){
          utterance.lang ='zh-CN'
          utterance.text=chineseAnimalName
      } else if(languageMode==='japanese'){
          utterance.lang ='ja'
          utterance.text=japaneseAnimalName
      }else{
         utterance.lang ='en-US'
          utterance.text=englishAnimalName
      } 
      setTimeout(()=>{
        speechSynthesis.speak(utterance)
      }
       ,500
      )
  }

  function hiraToKana(str) {
    return str.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    });
}

    const changeAnimalText = () =>{
      if(languageMode==='chinese'){
      return chineseAnimalName
    }else if(languageMode==='japanese'){
      return hiraToKana(japaneseAnimalName)
    }else if(languageMode==='english'){
      return englishAnimalName
  }
}

    useEffect(()=>{
      console.log(value)
        localStorage.setItem('animalId',_id)
        const setTransformFunc = () => {
          setTransform(0)
        }
        setTransformFunc()
        speakText()
    },[value])


   

  return (
    <div className='animalMemorize' >
    <div className="image-container" style={{ transform:`translateX(${transform})` }}>
      {isCircleLoading && <i className="far fa-circle circle"></i>}

      <div className="img" id="img">
    {/* <!-- Insert image --> */}
    <img src={`http://localhost:5000/uploads/${animalImage}`} alt="" />
      </div>
      <div className='card'>
      <button className='btn' id="text" onClick={speakText}>
              {changeAnimalText()}
        </button>
        <AnimalRecord setSpeakWord={setSpeakWord} setIsCircleLoading={setIsCircleLoading} answer = {changeAnimalText()}/>
      </div>
    </div>
  </div>
  )
}
export default AnimalMemorizeItem