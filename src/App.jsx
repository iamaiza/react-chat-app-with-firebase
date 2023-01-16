import "./App.css";
import Auth from "./components/Auth/Auth";
import { Fragment, useRef, useState } from "react";

import Cookies from "universal-cookie";
import Chat from "./components/Chat/Chat";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
const cookies = new Cookies();

function App() {
    const getAuthToken = cookies.get("auth-token");
    const [isAuth, setIsAuth] = useState(getAuthToken);
    const [room, setRoom] = useState(null);
    const roomInputRef = useRef()
    if (!isAuth) {
        return <Auth setIsAuth={setIsAuth} />;
    }

    const setRoomHandler = (e) => {
      e.preventDefault()
      const inputRefVal = roomInputRef.current.value
      setRoom(inputRefVal)
    }

    const signOutUser = (e) => {
      e.preventDefault()

      signOut(auth)
      setIsAuth(false)
      setRoom(null)
      cookies.remove('auth-token')
    }
    return (
      <Fragment>
          {room ? (
            <Chat room={room} />
          ) : (
            <form
              action=""
              className="flex flex-col justify-center items-center mt-3 room-form m-auto"
            >
              <label htmlFor="">Enter Room Name:</label>
              <div className="mt-12 w-full">
                <input
                  type="text"
                  placeholder="Enter room name"
                  className="py-1 px-2 border-2 border-sky-700 w-full outline-none"
                  ref={roomInputRef}
                />
                <button className="bg-sky-700 text-white py-2 px-9 block w-fit m-auto mt-3" onClick={setRoomHandler}>
                  Enter Chat
                </button>
              </div>
            </form>
          )}

          <div className="flex justify-center items-center mt-5">
            <button className="bg-sky-700 py-2 px-5 text-white" onClick={signOutUser}>Sign Out</button>
          </div>
      </Fragment>
    );
}

export default App;
