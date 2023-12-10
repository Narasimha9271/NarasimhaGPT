import React, { useEffect, useState } from "react";
import logo from "./images/gpt.png";
import openaiLogo from "./images/openai.jpeg";
export default function App() {
    const [value, setValue] = useState(null);
    const [message, setMessage] = useState(null);
    const [prevChats, setPrevChats] = useState([]);
    const [currTitle, setCurrTitle] = useState(null);

    const createNewChat = () => {
        setMessage(null);
        setCurrTitle(null);
        setValue("");
    };

    const handleClick = (uTitle) => {
        setCurrTitle(uTitle);
        setMessage(null);
        setValue("");
    };

    const getMsgs = async () => {
        const options = {
            method: "POST",

            body: JSON.stringify({
                message: value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await fetch(
                "http://localhost:8080/completions",
                options
            );
            const data = await response.json();
            setMessage(data.choices[0].message);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log(currTitle, value, message);
        if (!currTitle && value && message) {
            setCurrTitle(value);
        }
        if (currTitle && value && message) {
            setPrevChats((prevChatss) => [
                ...prevChatss,
                {
                    title: currTitle,
                    role: (
                        <img
                            src="https://i1.wp.com/cdn.auth0.com/avatars/na.png?ssl=1"
                            alt="user-icon"
                            className="user-icon"
                        />
                    ),
                    content: value,
                },
                {
                    title: currTitle,
                    role: (
                        <img src={logo} alt="gpt-logo" className="gpt-logo" />
                    ),
                    content: message.content,
                },
            ]);
        }
    }, [message, currTitle]);

    const currChat = prevChats.filter((pChat) => pChat.title === currTitle);

    const uniqueTitles = Array.from(
        new Set(prevChats.map((pChat) => pChat.title))
    );

    return (
        <div className="app">
            <section className="side-bar">
                <button className="new-chat-btn" onClick={createNewChat}>
                    + New chat
                </button>
                <ul className="history">
                    {uniqueTitles?.map((uTitle, index) => (
                        <li key={index} onClick={() => handleClick(uTitle)}>
                            {uTitle}
                        </li>
                    ))}
                </ul>
                <nav>
                    <p>Made by Narasimha</p>
                </nav>
            </section>
            <section className="main">
                {!currTitle && (
                    <div>
                        <h1>NarasimhaGPT3.5</h1>
                        <img
                            className="openai-logo"
                            src={openaiLogo}
                            alt="openai-logo"
                        />
                        <h2>How can I help you today?</h2>
                    </div>
                )}
                <ul className="feed">
                    {currChat?.map((chat, index) => (
                        <li key={index}>
                            <p className="role">{chat.role}</p>
                            <p className="content">{chat.content}</p>
                        </li>
                    ))}
                </ul>
                <div className="bottom-section">
                    <div className="input-container">
                        <input
                            placeholder="Message ChatGPT..."
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <div id="submit" onClick={getMsgs}>
                            ➢
                        </div>
                    </div>
                    <p className="info">
                        NarasimhaGPT can make mistakes. Consider checking
                        important information.
                    </p>
                </div>
            </section>
        </div>
    );
}
