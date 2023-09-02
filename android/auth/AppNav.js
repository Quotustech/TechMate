import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { useAuth } from './authContext';
import ChatView from '../components/ChatView';
import ChatScreen from '../components/ChatScreen';
import LoginScreen from '../components/Login';
import Register from '../components/Register';

const AppNav = () => {
    const stack = createNativeStackNavigator();
    const { user } = useAuth();
    console.log(user)


    return (
        <>
            <NavigationContainer>
                {
                    user ? (
                        <stack.Navigator>
                            <stack.Screen
                                name="ChatView"
                                component={ChatView}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <stack.Screen
                                name="ChatScreen"
                                component={ChatScreen}
                                options={{
                                    headerShown: false
                                }}
                            />

                        </stack.Navigator>
                    )
                        :
                        <stack.Navigator>
                            <stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{ headerShown: false }}
                            />
                            {/* Add other unauthenticated screens */}
                            <stack.Screen
                                name="Register"
                                component={Register}
                                options={{
                                    headerShown: false
                                }}
                            />
                        </stack.Navigator>
                }
            </NavigationContainer>
        </>
    )
}

export default AppNav
