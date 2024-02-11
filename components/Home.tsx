import React, {useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {Subscription} from './Subscription';
import {StackNavigationProp} from '@react-navigation/stack';
//import {RouteProp} from '@react-navigation/native';

type HomeStackParamList = {
  Home: undefined;
  SubscriptionForm: {addSubscription: (subscription: Subscription) => void};
};

//type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;
// type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'Home'>;

// interface Props {
//   navigation: HomeScreenNavigationProp;
//   route: HomeScreenRouteProp;
// }

type HomeScreenProps = {
  navigation: StackNavigationProp<HomeStackParamList, 'Home'>;
};

const Home: React.FC<HomeScreenProps> = ({navigation}) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const addSubscription = (newSubscription: Subscription) => {
    setSubscriptions(prevSubscriptions => [
      ...prevSubscriptions,
      newSubscription,
    ]);
  };

  const navigateToAddSubscription = () => {
    navigation.navigate('SubscriptionForm', {addSubscription});
  };

  return (
    <View style={styles.container}>
      {subscriptions.length > 0 ? (
        <FlatList
          data={subscriptions}
          renderItem={({item}) => (
            <Text style={styles.item}>
              {item.name} - {item.type} - ${item.cost}
            </Text>
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.message}>No subscriptions yet.</Text>
      )}
      <Button title="Add Subscription" onPress={navigateToAddSubscription} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Home;
