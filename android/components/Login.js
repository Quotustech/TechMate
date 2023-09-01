import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';

import {useAuth} from '../auth/authContext'


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const animatedValue = new Animated.Value(0);

  const {login} = useAuth();


  const startAnimation = () => {
    animatedValue.setValue(0);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Animated.Image
          source={require('./Techmate-logo.png')} // Replace with your own logo
          style={[
            styles.logo,
            {
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
     
      <View style={styles.formContainer}>
      <View style={styles.welcomeText}>

        <Text style={styles.welcome}>Login to Tech Mate</Text>

      </View>
      
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
          style={styles.loginButton}
          onPress={() => {
            login(email,password);
            startAnimation();
          }}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Logging In...' : 'Login'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton}
        onPress={() => navigation.navigate('Register')} // Replace with your chat screen name

        >
          <Text style={styles.signupButtonText}>Don't have an account?</Text>
          <Text style={[styles.signupButtonText,styles.signupButtonHighlight]}>Sign Up</Text>

        </TouchableOpacity>
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
    marginTop:10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
    margin:8,
    color: 'gray'

  },
  loginButton: {
    margin:8,
    backgroundColor: '#0bc3c8',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    color: '#8a0003',
    fontSize: 16,
    textAlign: 'center',
    fontWeight:'bold'
  },
  signupButton: {
    marginTop: 20,
    flexDirection:'row',
    justifyContent: 'center',
  },
  signupButtonText: {
    marginLeft:4,
    color: 'gray',
    fontSize: 16,
    fontWeight:'bold',
    textAlign:'center'
  },
  signupButtonHighlight:{
    fontWeight: 'bold', // Make the "Sign Up" text bold
    marginLeft: 5,
    color:'#0bc3c8'
  },
  welcomeText: {
    marginTop: 40,
    flexDirection:'row',
    justifyContent: 'center',
    marginBottom:16
  },
  welcome: {
    marginLeft:4,
    color: 'gray',
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center'
  },
 
});

export default LoginScreen;
