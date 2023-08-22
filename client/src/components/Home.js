import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Responce from './Responce';



function Home() {
  const [inputValue, setInputValue] = useState('')
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListenung] = useState(false)
  const [responceData, setResponceData] = useState(null)

  // console.log("isListening", isListening)
  console.log("inputValue1", inputValue)


  const handleStartListening = async () => {
    SpeechRecognition.startListening();
    setIsListenung(true)


  };


  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    console.log("inputValue inside stop listen", inputValue)
    setIsListenung(false)
  };


  useEffect(() => {
    setInputValue(transcript);
  }, [transcript])


  const url = 'http://localhost:5000/chat'

  const onSubmit = () => {
    console.log("inputValue in side function", inputValue)

    console.log("submit fun call")
    if (!inputValue) {
      console.log("please enter something")
    }
    else {
      setIsListenung(false)
      axios.post(url, { message: inputValue, userId:'64e4504fbaccdd7f23bb7d29' })
        .then((res) => {
          setResponceData(res.data)
          console.log("the responce data------", res.data.question)
          setInputValue('')
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  useEffect(() => {
    if (!listening && transcript !== '') {
      // Call the submit function when listening ends and there's a transcript
      onSubmit();
      resetTranscript(); // Optional: Clear the transcript if needed
    }
  }, [listening, transcript, onSubmit, resetTranscript]);

  return (
    <>
      <div className="relative w-500 sm:w-500">
        <img
          src="https://www.eweek.com/wp-content/uploads/2023/06/ew-what-is-ai-as-a-service.png"
          alt="Background"
          className="w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-90">
          <div className='flex justify-center mt-8'>
            <div className="max-w-5xl text-center">
              <h2 className="text-5xl  font-bold font-serif text-white p-4 m-5 mt-5 ">
                A I F T
              </h2>
              {
                responceData === null ? <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-16">
                    <div className="p-4 bg-white rounded-lg">
                      <h2 className="text-2xl text-gray-800">Examples 1</h2>
                      <p className="mt-2 text-gray-600">Explain quantum computing in simple terms.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h2 className="text-2xl text-gray-800">Capabilities</h2>
                      <p className="mt-2 text-gray-600">Remembers what user said earlier in the conversation.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h2 className="text-2xl text-gray-800">Limitations</h2>
                      <p className="mt-2 text-gray-600">May occasionally generate incorrect information.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <p className="mt-2 text-gray-600">How do I make an HTTP request in Javascript?.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <p className="mt-2 text-gray-600">This is a sample card description. You can replace this with your content.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <p className="mt-2 text-gray-600">This is a sample card description. You can replace this with your content.</p>
                    </div>
                  </div>
                  <h2 className="text-2xl font-serif text-white p-4 m-5 mt-8 md:mt-16">
                    Whether you're on the verge of launching your practical AI application or exploring groundbreaking AI technologies, our logo maker will help supercharge your brand. Find inspiration and craft the perfect, professional logo to represent your AI business—in just a few clicks.
                  </h2>

                </>
                  :
                  <Responce data={responceData} />
              }
              <div
                className="flex items-center p-5 mt-10">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                    </svg>
                  </div>

                  <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Mockups, Logos, Design Templates..."
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {
                    isListening === false ?
                      <button
                        onClick={handleStartListening} disabled={listening}
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                        </svg>
                      </button>
                      :
                      <button
                        onClick={handleStopListening} disabled={!listening}
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="w-4 h-4 text-red-500 dark:text-red-400 hover:text-red-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                        </svg>
                      </button>
                  }
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-4 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={onSubmit}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;