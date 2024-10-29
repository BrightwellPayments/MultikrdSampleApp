import { ReadyRemitError } from "../model/ready_remit_error";
import { TransferResponse } from "../model/transfer_response";

export const submitTransfer = async (
  accessToken: string,
  payload: object
): Promise<TransferResponse | ReadyRemitError> => {
  const url = 'https://sandbox-api.readyremit.com/v1/transfers';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (response.ok) {
    return {
      transfer_id: data.transferId,
    };
  } else {
    return {
      code: data.code || 'unknown_error',
      description: data.description || 'Unknown error occurred',
    };
  }
};
