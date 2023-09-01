import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { AsyncStorage } from 'react-native';
const [isModalVisible, setModalVisible] = useState(false);


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false);



  const [errors,setErrors] = useState({
    emilError:null,
    passwordError:null,
    error:null
  })

  console.log(errors.emilError)

  const url = 'https://attendance-system-ebon.vercel.app/login'

  const login = (email,password) => {
    setIsLoading(true);
    setErrors({
      emailError: null,
      passwordError: null,
      error: null,
      axiosError:null
  });

   

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('Please enter a validInvalid email');
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: 'Please enter a valid email',
    }));
    setModalVisible(!isModalVisible);

      setIsLoading(false);
      return;
  }

  // Validate password
  if (!password || password.length < 8) {
      console.log('Invalid password');
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: 'Please enter a valid Password',
    }));
    setModalVisible(!isModalVisible);

      setIsLoading(false);
      return;
  }

  if(!email || !password){
    setErrors((prevErrors) => ({
      ...prevErrors,
      error: 'Email and Password must not be empty',
  }));
  setModalVisible(!isModalVisible);

    setIsLoading(false);
    return;

  }

    axios.post(url,{
      email,
      password
    })
    .then((res)=>{
      setUser(res.data);

      setUserToken(res.data.token)
      AsyncStorage.setitem('userInfo',JSON.stringify(res.data))
      AsyncStorage.setitem('token',res.data.token)
      setModalVisible(!isModalVisible);


    })
    .catch((error)=>{
      console.log(error)
      setErrors((prevErrors) => ({
        ...prevErrors,
        axiosError: 'Something went wrong',
    }));
    setModalVisible(!isModalVisible);

      setIsLoading(false);

    })

    setIsLoading(false)
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
    <AuthContext.Provider value={{ user, login, errors,isModalVisible,toggleModal, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
