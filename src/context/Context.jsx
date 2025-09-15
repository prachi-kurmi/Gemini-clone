import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResutData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResutData(prev => prev + nextWord)
        }, 75*index)
    }

    const newChat = () => {
        setLoading(false)
        setshowResult(false)
    }

    const onSent = async(prompt) => {
       
        setResutData("")
        setLoading(true)
        setshowResult(true)
        let response;
        if(prompt !== undefined)
        {
            response = await main(prompt);
            setRecentPrompt(prompt)
        }
        else
        {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await main(input)
        }
 
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i = 0; i < responseArray.length; i++)
        {
            if(i % 2 === 0)
            {
                newResponse += responseArray[i]
            }
            else
            {
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        const newResponseArray = newResponse2.split(" ")
        for(let i = 0; i < newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i]
            delayPara(i, nextWord + " ")
        }
        setLoading(false)
        setInput("")
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput, 
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;