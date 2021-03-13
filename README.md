# Authentication example

This is an authenticatione example based on MERN stack.

## Features

- The registration requires a username, an email and a password.
- The password must be confirmed.
- There is a checkbox to set the user as an admin.
- The signup process includes a verification email with a confirmation link.
- The login works through the email and the password.
- There is a "Forgot Password?" feature that includes an email with a reset link.
- Hovering on the username on the top right corner shows a drop-down with the "My Profile" section and the logout functionality.
- In "My Profile" the name of the user can be added, and the password can be changed.
- In "My Profile" the account can be also deleted.
- If the user is an admin, the "Users" tab will show up, providing all the users created.
- The users can be deleted by an admin.

## Description

### Backend

The server is an express app with public, private and admin routes. The users are stored in a Mongo database. The authentication is based on jwt and cookies. The server can send emails for the registration process and the forgot password feature (through nodemailer and ethermail as test purpose). In the .env file there are all the configurations for the jwt, the cookies and the email info. The app provides a global error controller.

### Frontend

The client side is a react app. The authentication state is managed with the Context API. With a structure similar to Redux, actions are dispatched and a reducer is called to update the state. There are routing components to manage public, private and admin routes. The style is organized with the 7-1 Sass pattern, which maybe is a bit overkill but can give a good example on how the style can be structured.

## Future updates

A couple of features will be added in the future: the possibility to upload a profile photo and to change the username and email.
