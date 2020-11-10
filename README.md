# FusionAuth Example Vue
 Vue.js and Express example application that uses the OAuth 2 Authorization Code grant. 

<img src="https://i.imgur.com/ZlHi4x3.gif" alt="finished_application" width="400px" height="400px" align="right">

# Blog post

You can read full instructions with additional info and context on the blog post: https://fusionauth.io/blog/2020/08/06/securely-implement-oauth-vuejs

This application will use an OAuth Authorization Code workflow and the PKCE extension to log users in and an express backend server to store your access token securely. PKCE stands for Proof Key for Code Exchange, and is often pronounced “pixie”.

# Setup
Following setup is required before running the application.

## FusionAuth
If you haven't already have an instance of FusionAuth running on local machine, follow this [5-Minute Setup Guide](https://fusionauth.io/docs/v1/tech/5-minute-setup-guide) which will get you started in no time. For quick installation and configuration, [Docker](https://fusionauth.io/docs/v1/tech/installation-guide/docker) is the perfect choice.

## Node/NPM
Make sure you have [Node](https://nodejs.org/en/) installed on your local development machine.


## Configuration
- Clone this repository.

`git clone https://github.com/FusionAuth/fusionauth-example-vue.git`
- Create a new Application in your FusionAuth dashboard.
- In your application **OAuth** tab: 
   - Set `Authorized redirect URLs` to `http://localhost:9000/oauth-callback`
   - Set `Logout URL` to `http://localhost:8081` or the port your Vue App is running.
 - Select Users on the dashboard, select **Manage** and go to the **Registration** tab. Then click `Add Registration`, and add yourself to the application you just created.
 
- Copy your app's **Client ID**, **Client Secret**, **Redirect URI**, **Application ID**, and **API Key** into the `server/.env.example` file, you will also need to rename `.env.example` to `.env`

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

- Make sure FusionAuth is running, then install dependencies and start the app. The Vue app should automatically open in your browser at http://localhost:8081.
```bash
cd server
npm install
npm run dev
```
```bash
cd client
npm install
npm run serve
```
_Your application is now running and you will be prompted to `Sign In`._

### Happy Coding

