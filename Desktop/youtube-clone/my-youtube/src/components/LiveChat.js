import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";

const LiveChat = () => {
  const [liveMsg, setLiveMsg] = useState("");

  //For API polling -> use useEffect and inside it setInterval and poll data every 2 sec
  //and we have to do it once(empty array)
  // and don't forget to clean up i,e,, clearInterval

  //And To update Chat Build Redux Store
  //" When the Live Data will be polled action will be dispatched that will call the reducer function which will update the slice of our store and our LiveChat container will subscribe to the redux store AND It Just tada means it keeps on Updating"
  // SO As soon as we put data in redux store our live data will automagically update

  const dispatch = useDispatch();

  //Imp Step
  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      //API Polling

      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(20) + "🚀",
        })
      );
    }, 1500);

    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className="w-full h-[500px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {/* <ChatMessage name="Narasimha" message="Hello" /> */}
          {
            //DISCLAIMER: Don't Use indexes as key
            chatMessages.map((c, i) => (
              <ChatMessage key={i} name={c.name} message={c.message} />
            ))
          }
        </div>
      </div>
      <form
        className="w-full p-2 ml-2  border border-black "
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(
            addMessage({
              name: "Narasimha",
              message: liveMsg,
            })
          );
          setLiveMsg("");
        }}
      >
        <input
          className=" px-2 w-94 border border-black"
          type="text"
          value={liveMsg}
          onChange={(e) => {
            setLiveMsg(e.target.value);
          }}
        />
        <button className="px-2 mx-2 bg-green-100">Send</button>
      </form>
    </>
  );
};

export default LiveChat;
