# Linking App Back

_Linking App Back_ is a NodeJS project which provides an API to allow _Linking Front_ customers access to some _Linking App_ information. Regarding technologies involved, the following list offer an application overview:

-   NodeJS
-   MongoDB
-   Javascript
-   Express
-   Passport (JWT)

## Authentication

JWT and traditional user/password login are available in this project. It is important to bear in mind that JWT is the standard authentication method for **/api`*`** routes.

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

| Variable                | Objective                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| APP_SERVICE_PORT        | Express Server Listen Port                                                                     |
| APP_SERVICE_CORS        | CORS App Domain                                                                                |
| MONGODB_PORT            | MongoDB Server Listen Port                                                                     |
| MONGODB_HOST            | MongoDB Server Hostname                                                                        |
| MONGODB_DATABASE        | MongoDB Database Name                                                                          |
| MONGODB_USER            | MongoDB Database Admin Username (EMPTY to unsecured login)                                     |
| MONGODB_PASSWORD        | MongoDB Database Admin User password (EMPTY to unsecured login)                                |
| IMAGE_SERVICE           | Linking App Images service                                                                     |
| IMAGE_USER              | Linking App Images Admin Username                                                              |
| IMAGES_PASSWORD         | Linking App Images Admin User Password                                                         |
| JWT_SECRET              | JSON Web Token Secret                                                                          |
| JWT_EXPIRES             | JSON Web Tokens expiration time                                                                |
| APP_ADMIN_NAME          | User Admin Name                                                                                |
| APP_ADMIN_PASS          | User Admin Password                                                                            |
| CLOUDINARY_URL          | Cloudinary service URL with credential (Example: "cloudinary://`<key>:<secret>@<cloud_name>`") |
| USER_NODEMAILER         | Email address which sends user activation codes                                                |
| PASSWORD_NODEMAILER     | Email account password                                                                         |
| URL_CONFIRM_NODEMAILER  | HTTP or HTTPS url sent to user in registration process                                         |
| CONFIRMATION_NODEMAILER | Enable/Disable confirmation service                                                            |

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
-   Status
-   ConfimationCode
-   Chat
-   Photos
-   Information
    -   age
    -   gender
    -   education
    -   physicalCondition
    -   physicalCondition
    -   activity
    -   lifeStyle
    -   kidsLover
    -   PetsLover
    -   city
-   Preferences
    -   culturalInterest
    -   sportCadence
    -   travelCadence
    -   owlOrSkyLark
    -   sexualPreferences
    -   ageRangeL

### Matches

_Matches_ is a model to save each user suggestions which have to be generated by match algorithm. On the other hand, this model hosts users app selections when they are surfing in the application.

It is important to bear in ming that this models contains references to _User_ model through MongoDB Object IDs.

-   User
-   Suggestions
-   Beloved
-   Lovers
-   Matches

For more information about match algorithm, please visit [Match Algorithm](./doc/matchAlgorithm.md)

## Controllers

_Controller_ folder is dedicated to implement app logic required for it to function properly.

| Folder      | Objective                                                                                |
| ----------- | ---------------------------------------------------------------------------------------- |
| auth        | Authentication functions (Password generation, JWT implementation, login functions, etc) |
| clouddinary | Photo management related functions                                                       |
| storage     | Linking App Image Repository management related functions                                |
| mail        | Confirmation mail service functions                                                      |
| mongodb     | MongoDB models implementation and management functions (User and Matches administration) |

## Routes

There are implemented some express routes in order to expose required information:

-   api
    -   auth
        -   login (POST) Params: Username/password
    -   users
        -   / GET Query: \*ALL
        -   / POST Query: username/password
        -   suggestions (GET) Query: ID (username)
        -   beloveds (POST) Query: ID (username) Params: suggestionID (username suggestion loved)

| Path | a     | s            | Method | Req                    | Res                      | Objective                                                         |
| ---- | ----- | ------------ | ------ | ---------------------- | ------------------------ | ----------------------------------------------------------------- |
| api  | auth  | login        | POST   | User Credential        | JWT Token                | Generate JWT Token in order to authenticate and allow user access |
| api  | users | /            | GET    | User Query             | List of Users            | Get application user through mongodb query                        |
|      |       | /            | POST   | User Object            | Confirmation message     | Create a new app user                                             |
|      |       | /register    | POST   | User Object            | Confirmation message     | Register a new app user                                           |
|      |       | /suggestions | GET    | User Query             | List of User suggestions | Get a list of suggestion belonging to an user                     |
|      |       | /beloved     | GET    | User suggestion ID     | Confirmation message     | Get a list of beloveds selecting by an user                       |
|      |       | /beloved     | POST   | User Query             | List of User beloveds    | Add a new beloveds in an user profile                             |
|      |       | /matches     | GET    | User Query             | List of User Matches     | Get a list of user matches                                        |
|      |       | /matches     | DELETE | User suggestion ID     | Confirmation message     | Delete an user match                                              |
|      |       | /photos      | GET    | User Query             | List of User Photos      | Get a list of user photos                                         |
|      |       | /photos      | POST   | User photo URL         | List of User Photos      | Add a new photo in an user profile                                |
|      |       | /photos      | DELETE | User photo URL         | List of User Photos      | Delete a photo in an user profile                                 |
|      |       | /confirm     | GET    | User Confirmation Code | Confirmation message     | Get an user confirmation code in order to confirm a new user      |
|      |       | /profile     | GET    | User Query             | User Profile settings    | Get user profile information                                      |
|      |       | /profile     | POST   | User Query             | Confirmation message     | Update user profile information                                   |

## Middlewares

In this sections, every routes' authentication or authorization function are included.

## Available Scripts

In the project directory, it is possible to execute the following scripts:

### `npm start`

Runs the app.js file in order to run the application in both development adn production mode. It is important to bear in mind that nodeJS is execution engine:

```
"start": "node src/app.js"
```

### `npm test`

Runs the test files, included below, in order to run the application test.

-   `*`.spec.js -> Unity Test
-   `*`.test.js -> Integration Test

It is important to bear in mind that testing in this repository is implemented by Mocha, Jest and mongo-mock.

```
"test": "mocha --timeout 10000 --recursive --exit"
```

## License

BSD

## Author Information

Asier Cidon
