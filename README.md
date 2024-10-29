# MultiKrd ReadyRemit HostApp

This project is a host application created to demonstrate the implementation of the ReadyRemit SDK. 
The project is developed in React Native and imports our SDK, which is built in Kotlin and Swift.

## Setup

### Prerequisites

- Node.js
- Yarn or npm
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Setup Steps

1. Clone the repository:

    ```sh
    git clone <REPOSITORY_URL>
    cd <REPOSITORY_NAME>
    ```

2. Install the dependencies:

    ```sh
    yarn install
    # or
    npm install
    ```

3. Add your `client_id` and `client_secret` in [`src/api/auth_api.ts`](src/api/auth_api.ts):

    ```ts
    export const authenticate = async (senderId: string) => {
      // Add your client_id and client_secret here
      const client_id = 'YOUR_CLIENT_ID';
      const client_secret = 'YOUR_CLIENT_SECRET';
      // Rest of the code...
    };
    ```

4. Run the project using `npx react-native run-ios` or `npx react-native run-android`