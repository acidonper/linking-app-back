# Match Algorithm

Linking app will probably a different dating application because its matching algorithm. This algorithm tries to pair people with similar life's goals, objectives or hobbies.

Firstly, there were defined four categories of person profiles in order to classify similar people. Theses categories are included in the following list:

- **Learned Person** -> People who have a special interest in cultural activities. Normally, they have a set of preferences or qualities which involve:

  - High level of education
  - Home-based activities
  - Low or medium sport training regularity
  - High interest in traveling

- **Sport Person** -> People who have a special interest in sport activities. Normally, they have a set of preferences or qualities which involve:

  - Good or exceptional physical conditions
  - Preference to high intensity activities

- **Active Person** -> People who have a special interest in doing all kinds of activities, from cultural to sporting activities. Normally, they have a set of preferences or qualities which involve:

  - High level of education
  - Good physical conditions
  - Medium or high sport training regularity
  - High interest in traveling

- **Lazy Person** -> People who have a minimal interest in doing all kinds of activities. Normally, they have a set of preferences or qualities which involve:
  - Low level of education
  - Home-based activities
  - Low interest in traveling or playing sport

In the event of categorization process is not able to categorize the users based on their information and preferences, They are saved as _uncategorized_.

## Categoritation process

Categorization process is triggered when a new user is added to Linking App database or when a user modifies its profile's personal information and/or preferences. In both cases, the categorization and matching process workflow are similar. The following list includes the logic behind every workflow step:

- User categorization -> A New or modified user is categorized based on the information and preferences which have been defined during signup or profile modification process.

- User's profile update -> Previous categorization is saved in Linking App database (_Users_ collection).

- Suggestions search -> People who match with the user modified or added are looked based on category and the following parameters:

  - Age Range preference
  - Sexual Preferences
  - Physical location (city)
  - Pets and Kids tolerance
  - Night or daylight preference

- User's suggestions update -> New or modified user's suggestions are saved in Linking App database (_Matches_ collection).

## License

BSD

## Author Information

Asier Cidon
