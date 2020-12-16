import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import DispensariesSignupScreen from '../screens/DispensariesSignupScreen';
import DriverSignupScreen from '../screens/DriverSignupScreen';

import TabBarScreen from './TabBarNavigation'

const AuthStack = createStackNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        SignUpScreen: {
            screen: SignUpScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        ForgotPasswordScreen: {
            screen: ForgotPasswordScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        DispensariesSignupScreen: {
            screen: DispensariesSignupScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        DriverSignupScreen: {
            screen: DriverSignupScreen,
            navigationOptions: {
                headerShown: false
            }
        },
    },
    {
        initialRouteName: 'LoginScreen'
    }
)

const AppStack = createStackNavigator({
    Tabbar: {
        screen: TabBarScreen,
        navigationOptions: {
            headerShown: false
        }
    },
})

// const App = createAppContainer(RootNavigation);
// export default App;


export default createAppContainer(
    createSwitchNavigator(
        {
            Splash: SplashScreen,
            Auth: AuthStack,
            App: AppStack
        },
        {
            initialRouteName: 'Splash'
        }
    )
);