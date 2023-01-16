import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase-config";

const Chat = ({ room }) => {
    const [newMsg, setNewMsg] = useState("");
    const [chatMessages, setChatMessages] = useState([])

    const dbCollection = collection(db, "messages");
    

    useEffect(() => {
        const q = query(dbCollection, where('room', '==', room), orderBy('createdAt'))
        const unsubscribe = onSnapshot(q, snapShot => {
            let messages = []
            snapShot.forEach(doc => {
                messages.push({ ...doc.data(), id: doc.id })
            })
            setChatMessages(messages)
        })

        return () => unsubscribe()
    }, [])

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const msgDetail = {
            message: newMsg,
            createdAt: serverTimestamp(),
            user: auth.currentUser?.displayName,
            room,
        };
        if (newMsg !== "") {
            addDoc(dbCollection, msgDetail);
        }

        setNewMsg('')
    };

    const getMessages = chatMessages.map(message => (
        <h1>{message.message}</h1>
    ))

    return (
        <div>
            <div>
                {getMessages}
            </div>
            <form action="" onSubmit={formSubmitHandler} className='border-2 border-sky-700 mt-5 py-2 px-2 sm:px-3 w-11/12 m-auto rounded'>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Enter message"
                        value={newMsg}
                        className='text-sm sm:text-base outline-none'
                        onChange={(e) => {
                            setNewMsg(e.target.value);
                        }}
                    />
                    <button type="submit" className="bg-sky-700 text-white py-2 px-5 text-sm sm:text-base">Send</button>
                </div>
            </form>
        </div>
    );
};

export default Chat;
