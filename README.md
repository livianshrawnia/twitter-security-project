# BOOKS LIBRARY PROJECT

## Description

An Books Library System built with NodeJs, ExpressJs, Mongoose and MongoDB. This application enable six main different flows or implementations:

1. Add books to the library.
2. View books in the library.
3. Signup for the application.
4. Signin in the application.
5. User can buy upto 2 books from library.
6. User can view books that he/she brought from the library.


## Features:
  * NodeJs provides the backend environment for this application.
  * ExpressJs middleware is used to handle requests, routes.
  * Mongoose schemas to model the application data.
  * MongoDB for Database
  * JSON Web Token (JWT) for authentication.


## Api's endpoints

1. https://books-library-project.herokuapp.com/api/web/book/list 
2. https://books-library-project.herokuapp.com/api/web/book/add
3. https://books-library-project.herokuapp.com/api/web/account/signup
4. https://books-library-project.herokuapp.com/api/web/account/signin
5. https://books-library-project.herokuapp.com/api/web/book/buy         (Authentication Required)
6. https://books-library-project.herokuapp.com/api/web/book/buy/list    (Authentication Required)


## Demo

This application is deployed on Heroku. 

1. Please import api collection in Postman App from this link : (https://www.getpostman.com/collections/b01ede33d5c3d93720bb).

2. Create Environment in Postman App and name it PRODUCTION (you can name it anything as you like).

3. Create Environment variables :
  * host : https://books-library-project.herokuapp.com
  * authBearerToken : (when you signup or signin, you will get token put that token as variable value)

4. First Scenario (No Authentication Required) :
  * https://books-library-project.herokuapp.com/api/web/book/list (you will see empty library).
  * https://books-library-project.herokuapp.com/api/web/book/add (to add books to library, add atleast 4 - 5 books)
  * https://books-library-project.herokuapp.com/api/web/book/list (to see added books in library)

5. Second Scenario (Authentication Required) : 
  * https://books-library-project.herokuapp.com/api/web/account/signup (to signup for application, you will receive token here, put that token in `authBearerToken` environment variable)
  * https://books-library-project.herokuapp.com/api/web/account/signin (to signin to the application, you will receive token here, put that token in `authBearerToken` environment variable)
  * https://books-library-project.herokuapp.com/api/web/book/buy (to buy books from library, you can buy upto two books)
  * https://books-library-project.herokuapp.com/api/web/book/buy/list (to view the books brought by user, as well as check https://books-library-project.herokuapp.com/api/web/book/list api to confirm, books that user brought are removed from the library)
  * `NOTE` : Please go through sll steps in sequential order for best result. 


## Install

Some basic Git commands are:

```
$ git clone https://github.com/livianshrawnia/books-library-project.git
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