import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { AsyncStorage } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const url = 'https://attendance-system-ebon.vercel.app/login'

  const login = (email,password) => {
    setIsLoading(true);
    axios.post(url,{
      email,
      password
    })
    .then((res)=>{
      setUser(res.data);

      setUserToken(res.data.token)
      AsyncStorage.setitem('userInfo',JSON.stringify(res.data))
      AsyncStorage.setitem('token',res.data.token)

    })
    .catch((error)=>{
      console.log(error)
    })

    setIsLoading(false)
  };

  const logout = () => {
    setIsLoading(true)
    setUserToken(null)
    AsyncStorage.removeItem('userInfo')
    AsyncStorage.removeItem('token')

    setUser(null);
    setIsLoading(false)

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
