import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal'; // Import the Modal component




const Register = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to control the success modal


  const url = 'https://attendance-system-ebon.vercel.app/register'


  const handleRegister = () => {
    setIsLoading(true);
    axios.post(url,{
      name:fullName,
      email:email,
      password:password
    })
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        setFullName('')
        setEmail('')
        setPassword('')
        setRegistrationSuccess(true);
        // navigation.navigate('Login');

      }
    })
    .catch((error)=>{
      console.log(error)
    })
    .finally(()=>{
      setIsLoading(false)
    })

  };
  const closeModal = () => {
    setRegistrationSuccess(false); // Close the success modal
    navigation.navigate('Login');

  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Image source={require('./Techmate-logo.png')} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.welcomeText}>
          <Text style={styles.welcome}>Register your Account with </Text>

        </View>
        <View style={styles.welcomeTechMate}>
            <Text style={styles.welcomeTo}>Tech Mate</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        {isLoading && (
        <View style={styles.loaderContainer}>
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      )}
      <Modal isVisible={registrationSuccess}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Registration Successful!</Text>
          <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {!isLoading && (
        <TouchableOpacity style={styles.loginLink}
                onPress={() => navigation.navigate('Login')} // Replace with your chat screen name

        >
          <Text style={styles.loginLinkText}>
            Already have an account? 
          </Text>
          <Text style={styles.loginLinktoText}>
             Login
          </Text>
        </TouchableOpacity>
         )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0bc3c8',
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 28,
  },
  input: {
    padding:4,
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 10,
    paddingLeft: 16,
    fontSize: 16,
    margin: 8,
    color: 'gray'

  },
  registerButton: {
    marginTop:10,
    margin: 8,
    backgroundColor: '#0bc3c8',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLinkText: {
    marginLeft: 4,
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcomeText: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  welcome: {
    marginLeft: 4,
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcomeTechMate:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  welcomeTo: {
    marginLeft: 4,
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginLinktoText:{
    color: '#0bc3c8',
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    padding: 60, // Increase the padding for an "extra large" appearance
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'gray'
  },
  modalButton: {
    backgroundColor: '#0bc3c8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
 
});

export default Register;
