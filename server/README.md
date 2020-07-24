# Express Server

## Install 

```bash
npm install
```

## Run the development server

```bash
npm run dev
```

## Configuration

 Copy your app's **Client ID**, **Client Secret**, **Redirect URI**, **Application ID**, and **API Key** into the `server/.env.example` file, you will also need to rename `.env.example` to `.env`

```
SERVER_PORT = 9000
FUSIONAUTH_PORT = 9011
CLIENT_ID = ''
CLIENT_SECRET = ''
REDIRECT_URI = 'http://localhost:9000/oauth-callback'
APLICATION_ID =  ''
API_KEY = ''
```
You can read how to create an API KEY [here](https://fusionauth.io/docs/v1/tech/apis/authentication).
