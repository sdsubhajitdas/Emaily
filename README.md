# Emaily

Emaily is a quick email survey sending application. It was built as a learning project while I was learning full stack development taught in this [Udemy course](https://www.udemy.com/share/101WWO3@wacgZOcoZ4P8sWWYtWiPsuyKPmt1oseu2OA3dkF54lapatVzCyyhN0ThmyAnpNK_/).
<br>
For now it is a very simple survey sending application which supports only yes or no kind of survey responses. There are lots of future feature scopes but not implemented yet maybe as a future project.

###### Deployment Status

- Site deployed on render.com at [emaily-dxns.onrender.com](https://emaily-dxns.onrender.com)
- SendGrid API key is disabled so survey's can't be send as of now. This is done for security concerns.

## Setting up the project

### Install all the NPM modules for backend express API and React client

```
npm run build
```

### Setting up environment variables

Create a `.env` file in project root folder & add the following env variables

```
PORT = <Backend API Port>
NODE_ENV = <Type of environment can be production/development>
GOOGLE_OAUTH_CLIENT_ID = <GCP OAuth 2.0 Client ID>
GOOGLE_OAUTH_CLIENT_SECRET = <GCP OAuth 2.0 Client Secret>
MONGODB_URI = <MongoDB URI connection string>
COOKIE_KEY = <Random text of random length>
STRIPE_PUBLISH_KEY = <Stripe API publish key>
STRIPE_SECRET_KEY = <Stripe API secret key>
SENDGRID_KEY = <Sendgrid API Key>
EMAIL_REDIRECT_DOMAIN = <URL of the website. Can be local link or deployed link>
```

Create a `.env` file inside the client folder & add the following env variables

```
REACT_APP_STRIPE_PUBLISH_KEY = <Stripe API publish key>
```

### Setting up ngrok for testing webhook

- Download ngrok according to your development environment from [ngrok download link](https://ngrok.com/download).

- Login to your ngrok dashboard and connect to your account.

  ```
  ngrok config add-authtoken <ngrok token>
  ```

- Redirect webhooks connection to localhost
  <br> Here `$PORT` is the value set in `.env` file created in the root folder.

  ```
  ngrok http $PORT
  ```

- Setup redirect link in SendGrid dashboard
