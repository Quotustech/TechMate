import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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

  const url = 'https://attendance-system-ebon.vercel.app/login'

  const login = async (email, password) => {
    console.log("login fun working")
    setIsLoading(true);
  
    // Basic input validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: 'Please enter a valid email',
      }));
      setIsLoading(false);
      return;
    }
  
    if (!password || password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: 'Password length must be at least 8 characters',
      }));
      setIsLoading(false);
      return;
    }
  
    try {
      console.log("inside the try")

      const res = await axios.post(url, {
        email,
        password,
      });
  
      if (res.data) {
        // Assuming res.data contains user information and token

        setUser(res.data);
        setUserToken(res.data.token);
  
        // Store user info and token in AsyncStorage
        await AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
        await AsyncStorage.setItem('token', res.data.token);

  

      } else {
        // Handle the case where the response doesn't contain user data
        setErrors((prevErrors) => ({
          ...prevErrors,
          axiosError: 'Invalid response data',
        }));
        setModalVisible(true); // Show modal for this error
      }
    } catch (error) {
      console.error(error); // Log the specific error
      setErrors((prevErrors) => ({
        ...prevErrors,
        axiosError: 'Something went wrong',
      }));
      setModalVisible(true); // Show modal for this error
    }
  
    setIsLoading(false);
  };
  
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const logout = (navigation) => {
    console.log("logout function working")
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
