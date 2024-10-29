import { useState, useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { authenticate } from '../api/auth_api';
import { AuthResponse } from '../model/auth_response';
import { ReadyRemitError } from '../model/ready_remit_error';

const { ReadyRemitModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(ReadyRemitModule);

export const useAuth = () => {
  const [senderId, setSenderId] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const authTokenRequestedListener = eventEmitter.addListener('READYREMIT_AUTH_TOKEN_REQUESTED', handleAuthTokenRequested);
    return () => authTokenRequestedListener.remove();
  }, [senderId]);

  const handleAuthTokenRequested = async () => {
    if (!senderId) return;
    try {
      const response = await authenticate(senderId);

      if ('access_token' in response) {
        const successResponse = response as AuthResponse;
        setAccessToken(successResponse.access_token);
        ReadyRemitModule.setAuthToken(successResponse.access_token, null);
      } else {
        const errorResponse = response as ReadyRemitError;
        ReadyRemitModule.setAuthToken(null, errorResponse.description);
      }
    } catch (error) {
      console.error('Failed to auth:', error);
    }
  };

  const launchModule = () => {
    ReadyRemitModule.launch("SANDBOX", "en-US", null);
  };

  return {
    senderId,
    setSenderId,
    accessToken,
    launchModule
  };
};
