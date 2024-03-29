import React, {useState} from 'react';
import {
  View,
  TextInput,
  Switch,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Subscription} from './Subscription';
import {useNavigation} from '@react-navigation/native';
//import * as Notifications from 'expo-notifications';
import {Input, Button, Text} from '@rneui/base';
import SelectDropdown from 'react-native-select-dropdown';

interface Props {
  addSubscription: (subscription: Subscription) => void;
}

const SubscriptionForm: React.FC<Props> = ({addSubscription}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'monthly' | 'annual'>('monthly');
  const [cost, setCost] = useState('');
  const [lastPaymentDate, setLastPaymentDate] = useState(new Date());
  const [reminder, setReminder] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (reminder) {
      const permission = await requestNotificationPermission();
      if (!permission) {
        Alert.alert(
          'Permission denied',
          'You need to enable notifications to use this feature.',
        );
        return;
      }
    }
    const newSubscription: Subscription = {
      id: Math.random().toString(36).substr(2, 9), // simple unique ID
      name,
      type,
      cost: parseFloat(cost),
      lastPaymentDate,
      reminder,
    };
    try {
      const response = await fetch(
        'https://your-backend-api.com/api/subscriptions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSubscription),
        });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      addSubscription(data);
      console.log('Subscription added:', data);

      // Optionally, clear the form fields here
      setName('');
      setType('monthly');
      setCost('');
    } catch (error) {
      console.error('Error adding subscription:', error);
    }
  };

  // const requestNotificationPermission = async () => {
  //   if (Platform.OS === 'ios') {
  //     await Notifications.requestPermissionsAsync();
  //   }
  //   const settings = await Notifications.getPermissionsAsync();
  //   return (
  //     settings.granted ||
  //     settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  //   );
  // };
  const today = new Date();
  const countries = ['Monthly', 'Yearly'];
  return (
    <View style={styles.container}>
      <Input
        value={name}
        onChangeText={setName}
        placeholder="Subscription Name"
      />
      <Input
        value={cost}
        onChangeText={setCost}
        placeholder="Cost"
        keyboardType="numeric"
      />
      <View style={styles.inlineContainer}>
        <Text style={styles.label}>Next Payment Due</Text>
        <DateTimePicker
          value={lastPaymentDate}
          mode="date"
          display="default"
          onChange={(event, date) => date && setLastPaymentDate(date)}
          minimumDate={today}
        />
      </View>
      <View style={styles.inlineContainer}>
        <Text style={styles.label}>Billing Cycle</Text>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Set Reminder to Cancel Subscription</Text>
        <Switch value={reminder} onValueChange={setReminder} />
      </View>

      <Button title="Add Subscription" onPress={handleSubmit} />

      <Button title="Cancel" onPress={() => navigation.goBack()} type="clear" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  picker: {
    width: '100%',
    marginVertical: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    flexShrink: 1,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdownButton: {
    flexGrow: 1,
  },
  dropdownButtonText: {
    textAlign: 'left',
  },
  dateTimePicker: {
    flexGrow: 1,
  },
});

export default SubscriptionForm;
