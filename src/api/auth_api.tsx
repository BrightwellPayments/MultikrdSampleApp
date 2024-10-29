import { AuthResponse } from "../model/auth_response";
import { ReadyRemitError } from "../model/ready_remit_error";

export const authenticate = async (senderId: string): Promise<AuthResponse | ReadyRemitError> => {

  // Update with your credentials here
  const client_id = 'YOUR_CLIENT_ID';
  const client_secret = 'YOUR_CLIENT_SECRET';


  const url = 'https://sandbox-api.readyremit.com/v1/oauth/token';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      sender_id: senderId,
      audience: 'https://sandbox-api.readyremit.com',
      client_id: client_id,
      client_secret: client_secret
    })
  });

  const data = await response.json();

  if (response.ok) {
    return {
      access_token: data.access_token
    };
  } else {
    return {
      code: data.code || 'unknown_error',
      description: data.description || 'Unknown error occurred',
    };
  }
};
