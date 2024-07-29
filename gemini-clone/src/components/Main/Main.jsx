import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)
  return (
        <div className="main">
            <div className="nav">
                <p>InteractGPT</p>
        </div>

        <div className="main-container">

            {!showResult
            ?<>
            <div className="greet">
            <p><span>Hello, Dev!!</span></p>
            <p>How Can I help you today?</p>
        </div>

        <div className="cards">
            <div className="card">
                <p>Suggest beautiful places in United Kingdom.</p>
                <img src={assets.compass_icon} alt="" />
            </div>

            <div className="card">
                <p>What is quantum computing?</p>
                <img src={assets.bulb_icon} alt="" />
            </div>

            <div className="card">
                <p>Suggest me some recipes for dinner.</p>
                <img src={assets.message_icon} alt="" />
            </div>

            <div className="card">
                <p>Improve the readability of Following code.</p>
                <img src={assets.code_icon} alt="" />
            </div>
        </div>
        </>
        :
        <div className="result">
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading
                ? <div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                </div>
                : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
            </div>
        </div>
        }
                    
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt'/>
                    <div>
                        {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null }
                    </div>
                </div>

                <p className="bottom-info">
                    Interact GPT may display inaacurate info, including people, Please double-check.
                </p>
            </div>
        </div>        
    </div>
  )
}

export default Main