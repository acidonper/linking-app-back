# Liking Back

_Liking Back_ is a NodeJS project which provides an API to allow _Liking Front_ customers access to some _Liking App_ information. Regarding technologies involved, the following list offer an application overview:

-   NodeJS
-   MongoDB
-   Javascript
-   Express
-   Passport (JWT)
-

## Authentication

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
-   Preferences
    -   culturalInterest
    -   sportCadence
    -   travelCadence
    -   owlOrSkyLark
    -   sexualPreferences

## Controllers

## Middlewares

## Routes

There are implemented some methods in order to expose required information,
