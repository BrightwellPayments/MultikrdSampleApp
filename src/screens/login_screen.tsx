import React from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { useAuth } from '../hooks/use_auth';
import { useTransfer } from '../hooks/use_transfer';

const LoginScreen: React.FC = () => {
  const { senderId, setSenderId, accessToken, launchModule } = useAuth();
  useTransfer(accessToken);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>MultiKrd | ReadyRemit</Text>
      <TextInput
        placeholder="sender_id"
        value={senderId}
        onChangeText={setSenderId}
        style={{ borderWidth: 1, borderColor: '#ccc', width: '100%', padding: 10, marginBottom: 20 }}
      />
      <Button
        title="Launch SDK"
        onPress={launchModule}
        disabled={!senderId}
      />
    </View>
  );
};

export default LoginScreen;
