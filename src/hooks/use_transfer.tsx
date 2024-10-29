import { useEffect } from 'react';
import { NativeEventEmitter, NativeModules, Alert } from 'react-native';
import { submitTransfer } from '../api/transfer_api';
import { TransferResponse } from '../model/transfer_response';
import { ReadyRemitError } from '../model/ready_remit_error';

const { ReadyRemitModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(ReadyRemitModule);

export const useTransfer = (accessToken: string | null) => {
  useEffect(() => {
    if (!accessToken) return;

    const transferSubmittedListener = eventEmitter.addListener('READYREMIT_TRANSFER_SUBMITTED', handleTransferSubmitted);

    return () => transferSubmittedListener.remove();
  }, [accessToken]);

  const handleTransferSubmitted = async (payload: object) => {
    if (!accessToken) return;

    try {
      const response = await submitTransfer(accessToken, payload);

      if ('transfer_id' in response) {
        const successResponse = response as TransferResponse;
        ReadyRemitModule.setTransferId(successResponse.transfer_id, null, null);
      } else {
        const errorResponse = response as ReadyRemitError;
        ReadyRemitModule.setTransferId(null, errorResponse.code, errorResponse.description);
      }
    } catch (error) {
      console.error('Failed to submit transfer:', error);
    }
  };
};
