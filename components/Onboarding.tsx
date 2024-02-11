import React, {useEffect, useState, useCallback} from 'react';
import {Button, Animated, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
  /* Add other styles as needed */
`;

export const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  /* Add other styles as needed */
`;

export const TitleText = styled.Text`
  font-size: 18px;
  /* Add other styles as needed */
`;

export const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  /* Add other styles as needed */
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  /* Add other styles as needed */
`;

export const ListText = styled.Text`
  font-size: 16px;
  /* Add other styles as needed */
`;

const FormContainer = styled.KeyboardAvoidingView`
  width: 80%;
  margin-top: 20px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const WelcomeText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
`;

type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
};

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

const Onboarding = () => {
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [userName, setUserName] = useState('');
  const [inputError, setInputError] = useState('');

  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const logoSize = useState(new Animated.Value(1))[0];

  const animateLogo = useCallback(() => {
    Animated.timing(logoSize, {
      toValue: 0.5,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      if (isExistingUser) {
        navigation.navigate('Home');
      }
    });
  }, [logoSize, isExistingUser, navigation]);

  const checkUserStatus = useCallback(async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      if (name !== null) {
        setIsExistingUser(true);
        setUserName(name);
        animateLogo();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [animateLogo]);

  useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  const handleNewUserSubmit = async () => {
    if (userName.trim().length === 0) {
      setInputError('Name is required');
      return;
    }

    setInputError('');
    animateLogo();

    try {
      await AsyncStorage.setItem('userName', userName);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const renderUserForm = () => (
    <FormContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {isExistingUser ? (
        <WelcomeText>Welcome back, {userName}!</WelcomeText>
      ) : (
        <>
          <Input
            value={userName}
            onChangeText={setUserName}
            placeholder="Enter your name"
          />
          {inputError ? <ErrorText>{inputError}</ErrorText> : null}
          <Button title="Submit" onPress={handleNewUserSubmit} />
        </>
      )}
    </FormContainer>
  );

  return (
    <Container>
      <Icon source={require('../images/logo.png')} />
      <HeaderText>turf</HeaderText>
      <TitleText>Subscription Management </TitleText>
      <ListItem>
        <ListText>Effortlessly Manage Your Subscriptions: One dashboard for all your subscription needs.</ListText>
        <ListText>Discover Savings: Identify and cancel unused subscriptions with ease.</ListText>
        <ListText>Stay Informed: Get timely alerts on subscription renewals and charges.</ListText>
      </ListItem>
      {renderUserForm()}
    </Container>
  );
};

export default Onboarding;

// import React, {useEffect, useState, useCallback} from 'react';
// import {Button, Animated, Platform} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import styled from 'styled-components/native';
// import {useNavigation} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';

// const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;

// const Logo = styled(Animated.Image)`
//   width: 150px;
//   height: 150px;
// `;

// const FormContainer = styled.KeyboardAvoidingView`
//   width: 80%;
//   margin-top: 20px;
// `;

// const Input = styled.TextInput`
//   border-width: 1px;
//   border-color: #ccc;
//   padding: 10px;
//   margin-bottom: 10px;
// `;

// const WelcomeText = styled.Text`
//   font-size: 20px;
//   font-weight: bold;
//   margin-bottom: 10px;
// `;

// const ErrorText = styled.Text`
//   color: red;
//   margin-bottom: 10px;
// `;

// type RootStackParamList = {
//   Onboarding: undefined;
//   Home: undefined;
// };

// type OnboardingScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'Onboarding'
// >;

// const Onboarding = () => {
//   const [isExistingUser, setIsExistingUser] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [inputError, setInputError] = useState('');

//   const navigation = useNavigation<OnboardingScreenNavigationProp>();
//   const logoSize = useState(new Animated.Value(1))[0];

//   const animateLogo = useCallback(() => {
//     Animated.timing(logoSize, {
//       toValue: 0.5,
//       duration: 1000,
//       useNativeDriver: false,
//     }).start(() => {
//       if (isExistingUser) {
//         navigation.navigate('Home');
//       }
//     });
//   }, [logoSize, isExistingUser, navigation]);

//   const checkUserStatus = useCallback(async () => {
//     try {
//       const name = await AsyncStorage.getItem('userName');
//       if (name !== null) {
//         setIsExistingUser(true);
//         setUserName(name);
//         animateLogo();
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   }, [animateLogo]);

//   useEffect(() => {
//     checkUserStatus();
//   }, [checkUserStatus]);

//   const handleNewUserSubmit = async () => {
//     if (userName.trim().length === 0) {
//       setInputError('Name is required');
//       return;
//     }

//     setInputError('');
//     animateLogo();

//     try {
//       await AsyncStorage.setItem('userName', userName);
//     } catch (error) {
//       console.error('Error saving user data:', error);
//     }
//   };

//   const renderUserForm = () => (
//     <FormContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//       {isExistingUser ? (
//         <WelcomeText>Welcome back, {userName}!</WelcomeText>
//       ) : (
//         <>
//           <Input
//             value={userName}
//             onChangeText={setUserName}
//             placeholder="Enter your name"
//           />
//           {inputError ? <ErrorText>{inputError}</ErrorText> : null}
//           <Button title="Submit" onPress={handleNewUserSubmit} />
//         </>
//       )}
//     </FormContainer>
//   );

//   return (
//     <Container>
//       <Logo
//         source={require('../images/logo.png')}
//         style={{
//           transform: [{scaleX: logoSize}, {scaleY: logoSize}],
//         }}
//       />
//       {renderUserForm()}
//     </Container>
//   );
// };

// export default Onboarding;
