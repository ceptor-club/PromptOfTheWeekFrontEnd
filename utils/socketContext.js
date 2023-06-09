import React, { useEffect } from "react"
import { useState, useContext } from "react"
import { io } from "socket.io-client"

// const socket = socketio.connect(process.env.NEXT_PUBLIC_API_BASE_URL);
export const SocketContext = React.createContext()
// export function useSocketContext() {
//   return useContext(socket)
// }

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
      auth: {
        token: process.env.NEXT_PUBLIC_API_KEY,
      },
    })

    /*Hackathon addition*/
    newSocket.on('like', ({accountId, ownerId, tokenId}) => {
      console.log(`User ${accountId} liked NFT ${tokenId} owned by ${ownerId}`);
      // Do something when the 'like' event is received
      // For example, you could update a state variable or call a function
    });

    setSocket(newSocket)

    return () => {
      newSocket.off('like'); // Stop listening to the 'like' event
      newSocket.close()
    }
  }, [])
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
