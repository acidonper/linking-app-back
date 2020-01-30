# Liking Back

_Liking Back_ is a NodeJS project which provides an API to allow _Liking Front_ customers access to some _Liking App_ information. Regarding technologies involved, the following list offer an application overview:

-   NodeJS
-   MongoDB
-   Javascript
-   Express
-   Passport (JWT)

## Authentication

JWT and tradicional user/password login are available in this project. It is important to bear in mind that JWT is the standard authentication method for **/api`*`** routes.

In order to understand the implementation, it is required to review the following files:

-   ./src/controller/auth/passport/index.js
-   ./src/controller/auth/passport/strategies/local.js
-   ./src/controller/auth/passport/strategies/jwt.js
-   ./src/controller/auth/index.js
-   ./src/middlewares/passport/index.js
-   ./src/routes/api/auth/loginjwt.js

Basically, the procedure of protect api routes with JWT follows the following procedure:

-   An user access to http://server/api/login sending the respective credentials
-   "local" strategy comes into play verifying user's credentials provided previously and generating a new token
-   In the following user request, for example http://server/api/users?username=test02, user has to include a Bearer header with the token provided
-   "jwt" strategy comes into play in order to verify the token when route has isLogged middleware enabled

## Required Variables

A set of variables have to be defined in **.env** file in order to run the application properly. The following list includes these required variables:

```
SERVER_PORT=5000
MONGO_PORT=27017
MONGO_HOST=<user>:<password>@mongodb
MONGO_DB=liking
JWT_SECRET="xxxxxxxxxxxxxxxxxxxxxx"
JWT_EXPIRES="30000"
APP_ADMIN_NAME=adminuser01
APP_ADMIN_PASS="xxxxxxxxxxxxxxxxxxxxxx"
```

## Models

There are some data models implemented on MongoDB in order to be able to implement the application logic.

### Users

_User_ is a MongoDB Object which has a set of fields which define ir personal information and preference about a future couple. The following list display the fields which are included in the data model:

-   Name
-   Lastname
-   Username
-   Password
-   Email
-   Role
-   Chat
-   Information
    -   age
    -   gender
    -   education
    -   city
    -   physicalCondition
    -   activity
    -   lifeStyle
-   Preferences
    -   culturalInterest
    -   sportCadence
    -   travelCadence
    -   owlOrSkyLark
    -   sexualPreferences
    -   ageRange

### Matches

### Chats

## Controllers

## Middlewares

## Routes

-   api
    -   auth
        -   login (POST) Params: Username/password
    -   users
        -   / GET Query: \*ALL
        -   / POST Query: username/password
        -   suggestions (GET) Query: ID (username)
        -   beloveds (POST) Query: ID (username) Params: suggestionID (sername suggestion loved)

There are implemented some methods in order to expose required information,

## Testing

-   `*`.spec.js -> Unity Test
-   `*`.test.js -> Integration Test
