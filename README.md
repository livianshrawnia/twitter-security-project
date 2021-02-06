# TWITTER SECURITY PROJECT

## Description

An Twitter Security System built with NodeJs, ExpressJs, Mongoose and MongoDB. This application enable six main different flows or implementations:

1. Signup for the application.
2. Signin in the application.
3. User can create, delete and list own post.
4. Admin can initiate CRUD of tweets on users behalf.
5. Admin can edit user details.
6. Super-admin can approve actions initiated by admin.
7. Super-admin can view access/action/audit logs.
8. Super-admin can write custom queries to generate insights
    - Post frequency of user X within a timeframe
    - Number of changes requested by Admin Y


## Features:
  * NodeJs provides the backend environment for this application.
  * ExpressJs middleware is used to handle requests, routes.
  * Mongoose schemas to model the application data.
  * MongoDB for Database
  * JSON Web Token (JWT) for authentication.


## Demo

This application is deployed on Heroku.
`NOTE : Please use the latest desktop application for Postman (reason : Older version of postman lacks 'Bearer Token' authorization header )`

1. Please import api collection in Postman App from this link : (https://www.getpostman.com/collections/fbe8f5f9576c21f519dd).
2. Create Environment in Postman App and name it PRODUCTION (you can name it anything as you like).
3. Create Environment variables :
  * host : https://twitter-security-project.herokuapp.com
  * authBearerToken : (when you signup or signin, you will get token put that token as variable value)
4. Please set header `Content-Type : application/json` for all the api request.
5. I have created 3 users with roles.

     Email                  |        Password
  user@gmail.com            |     user@123     
  admin@gmail.com           |     admin@123
  superadmin@gmail.com      |     superadmin@gmail.com  

6. Sign in with above details u will receive token, put that token in variable called `authBearerToken` that you already created.


## Api's endpoints

1. https://twitter-security-project.herokuapp.com/api/web/account/signup
2. https://twitter-security-project.herokuapp.com/api/web/account/signin
3. https://twitter-security-project.herokuapp.com/api/web/post/add         (Authentication Required)
4. https://twitter-security-project.herokuapp.com/api/web/post/delete/         (Authentication Required)
5. https://twitter-security-project.herokuapp.com/api/web/post/list         (Authentication Required)

6. https://twitter-security-project.herokuapp.com/api/admin/user/edit/         (Authentication Required)
7. https://twitter-security-project.herokuapp.com/api/admin/post/add         (Authentication Required)
8. https://twitter-security-project.herokuapp.com/api/admin/post/edit/         (Authentication Required)
9. https://twitter-security-project.herokuapp.com/api/admin/post/delete/         (Authentication Required)
10. https://twitter-security-project.herokuapp.com/api/admin/post/get/         (Authentication Required)

11. https://twitter-security-project.herokuapp.com/api/super-admin/log/list         (Authentication Required)
12. https://twitter-security-project.herokuapp.com/api/super-admin/insight/generate         (Authentication Required)
13. https://twitter-security-project.herokuapp.com/api/super-admin/request/approve/         (Authentication Required)
  * `NOTE` : Please go through all api's in sequential order for best result. 


## Install

Some basic Git commands are:

```
$ git clone https://github.com/livianshrawnia/twitter-security-project.git
$ cd project
$ npm install
```

## Setup

```
 Create .env file that include:

  * MONGODB_APP_URL
  * BASE_SERVER_URL
  * PORT
  * BASE_API_URL
  * JWT_SECRET
```

## Run the application

```
$ npm start
```

## Languages & tools

1. NodeJs
2. ExpressJs
3. Mongoose
4. MongoDB