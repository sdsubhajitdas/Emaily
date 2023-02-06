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
  ![image](https://user-images.githubusercontent.com/20211573/217049587-3a124dbd-6bbb-449d-a390-2ac565c14f62.png)

## Screenshots

- Homepage
  ![image](https://user-images.githubusercontent.com/20211573/217049989-684f8d19-67e2-4e9f-ae1a-fed24408b937.png)
  
- Dashboard
  ![image](https://user-images.githubusercontent.com/20211573/217051339-d70b5504-5ce1-41c0-9f11-3b3cab98b2eb.png)
  
- Creating a new survey
  ![image](https://user-images.githubusercontent.com/20211573/217050266-59478f4a-72ed-4bc7-92b9-8225476c3db1.png)

- Reviewing a survey
  ![image](https://user-images.githubusercontent.com/20211573/217050514-c04ca69d-d964-419f-b2e2-12bb3b14d958.png)

- Successfully sending out survey 
  ![image](https://user-images.githubusercontent.com/20211573/217050890-1d016d1d-57ef-477b-aef6-1ee68e18bce7.png)

- Email that is being sent out
  ![image](https://user-images.githubusercontent.com/20211573/217051129-ea198588-a27f-4c8b-a639-827c4ba30b38.png)

- Toggling theme
  ![image](https://user-images.githubusercontent.com/20211573/217051523-5b0d3025-ce3b-40fd-ba6d-6b6555e7fe57.png)

- Adding credits to send out survey
  ![image](https://user-images.githubusercontent.com/20211573/217051626-ca2381ef-aaba-4bc3-a861-bdbda3b54d58.png)
  The Stripe API is in testing mode since so you can use any of the [Stripe testing cards](https://stripe.com/docs/testing?testing-method=card-numbers#visa) to do a successfull transaction.
