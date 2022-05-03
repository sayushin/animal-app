import { useEffect } from 'react'
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition'
import CircleAudio from '../../components/assets/audio/circle.mp3'
import { useState } from 'react'
import pinyin from 'chinese-to-pinyin'
import converter from 'number-to-chinese-words'
import converterJp from 'jp-conversion'


const AnimalRecord = ({ setSpeakWord, setIsCircleLoading, answer }) => {
	let lang = localStorage.getItem('language')

	const [word, setWord] = useState('')

	if (lang === 'english') {
		lang = 'en-US'
	} else if (lang === 'japanese') {
		lang = 'ja-JP'
	} else {
		lang = 'zh-CN'
	}

	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition
	} = useSpeechRecognition()

SpeechRecognition.maxAlternatives=10

	useEffect(() => {
		setSpeakWord(transcript)
		setWord(transcript)
		playCircleAudio(transcript,checkChinese(transcript))
    checkChinese(transcript)
	}, [transcript])

const checkChinese = (word)=>{
  const wordArray = [...word]
  const wordArrayAdjust = wordArray.map((word) => converter.toWords(word)).join('')
  return wordArrayAdjust
}

	const playCircleAudio = async (word,chinese) => {
		console.log(word, answer)
    console.log(chinese)
    
		if (word.toLowerCase() === answer || pinyin(word) === pinyin(answer) || pinyin(chinese) === pinyin(answer)) {
			const audio = new Audio(CircleAudio)
			audio.play()
      setIsCircleLoading(true)
      setTimeout(() => {
        setIsCircleLoading(false)
      }, 5000)
		}
	}

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>
	}

	return (
		<div>
			<button id='animal-record'
				onClick={() => {
					SpeechRecognition.startListening({ language: lang })
				}}>
				<i className='fas fa-microphone-alt'></i>
        {lang=='zh-CN' ? pinyin(transcript) : lang=='ja-JP' ? transcript :transcript.toLowerCase()}
			</button>
		</div>
	)
}

export default AnimalRecord