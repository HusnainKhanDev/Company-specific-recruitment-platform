import React, { createContext, useContext, useEffect, useState } from 'react'

export interface IUserContext {
  User: any;
  setUser: (user: any) => void;
}

export const UserDataContext = createContext<IUserContext>({
    User: null,
    setUser: () => {},

});

const UsercontextProvider = ({children}: any) => {

    const [User, setUser] = useState({});
    console.log(User)

    useEffect(() => {
        const data = localStorage.getItem("User")

        if(data){
            setUser(JSON.parse(data))
        }
    }, [])


  return (
    <UserDataContext.Provider value={{User, setUser}}>
        {children}
    </UserDataContext.Provider>
  )
}

export default UsercontextProvider