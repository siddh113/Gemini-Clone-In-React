import { createContext, useState } from "react";
import run from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");  // to save input data
    const [recentPrompt, setRecentPrompt] = useState(""); // Clicking on send data the input prompt will be saved in this variable
    const [prevPrompt, setPrevPrompt] = useState([]); // To store all input history and to display in recent tabs
    const [showResult, setShowResult] = useState(false); // Once true it will hide the greet texts to display result
    const [loading, setLoading] = useState(false); // once true it will display loading animation
    const [resultData, setResultData] = useState(""); // this will display result on webpage

    const delay = (index, nextWord) => {
        setTimeout(function (){
            setResultData(prev=>prev+nextWord)
        }, 75*index)
    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        setPrevPrompt(prev=>[...prev, input])
        
        const response = await run(input)

        let responseArray = response.split("**");
        let newResponse;
        for(let i=0; i<responseArray.length; i++){
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }else{
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")

        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delay(i, nextWord + " ");
        }
        setLoading(false)
        setInput("")

    }


    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider