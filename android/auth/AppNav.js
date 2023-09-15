import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useAuth } from './authContext';
import ChatView from '../components/ChatView';
import ChatScreen from '../components/ChatScreen';
import LoginScreen from '../components/Login';
import Register from '../components/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';




const AppNav = () => {
    const stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const { logout } = useAuth();

    const home = "ChatScreen"
    const profile = "profile"
    const logOut = "logout"

    const [logToken, setLogToken] = useState(null)
    const getLoggedUser = async () => {
        try {
            const loggedUser = await AsyncStorage.getItem('token');
            setLogToken(loggedUser)
            console.log('Logged user:', loggedUser);
            // You can use the loggedUser value here or return it as needed.
        } catch (error) {
            console.error('Error while getting logged user:', error);
        }
    };

    useEffect(() => {
        getLoggedUser()
    }, [])



    return (
        <>
            <NavigationContainer>
                {
                    logToken ? (
                        <Tab.Navigator
                            initialRouteName={home}
                            screenOptions={({ route }) => ({
                                tabBarShowLabel: false,
                                headerShown: false,
                                tabBarStyle: {
                                    backgroundColor: '#fff',

                                },
                                tabBarIcon: ({ focused, color, size }) => {
                                    let iconName;
                                    let routeName = route.name;


                                    if (routeName === home) {
                                        iconName = focused ? 'home' : 'home'
                                    }
                                    else if (routeName === profile) {
                                        iconName = focused ? 'user' : 'user'
                                    }
                                    else if (routeName === logOut) {
                                        iconName = focused ? 'sign-out' : 'sign-out'
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    logout()

                                                }}
                                            >
                                                <Icon name={iconName} size={size} color={color} />
                                            </TouchableOpacity>
                                        );
                                    }

                                    return <Icon name={iconName} size={size} color={color} />
                                }
                            })}


                        >
                            <Tab.Screen name={home} component={ChatScreen} />
                            <Tab.Screen name={profile} component={ChatView} />

                        </Tab.Navigator>


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
