import React from 'react';
import {Modal, View, StyleSheet, Button, Text} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const SettingsModal: React.FC<Props> = ({visible, onClose, onLogout}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Settings</Text>
          <Button title="Logout" onPress={onLogout} />
          <Button title="Close Settings" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SettingsModal;
