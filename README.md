
# Border Pass v2.0
Register your business trip's border crossings with ease.

This web app allows to register border crossings to anyone who needs to calculate his subsistence allowance for cross-border business trips.
Since version 2.0 all user data is stored in MongoDB database. JSON web tokens are used for user authentication and authorization.  
Sensitive data like users' passwords are hashed before stored in database.  
It is still possible to use this app as guest user, without signing in/up, as all functionalities from version 1 are still available to the user.  
This app is PWA compliant which makes it installable on mobile devices. Using this app in guest mode makes it 100% functional offline.

### Tech stack:

#### Backend 
built with **Node/Express**  
**jsonwebtoken** used for user auth  
all data stored in **MongoDB**  
**Mongoose** ODM for MongoDB  
**bcrypt** used to encrypt sensitive data  
**dotenv** used to manage environment variables

#### Frontend 
built with **React**  
**Context API** used to manage app state  
**React Hooks**  
**Parcel** used to bundle all the assets  
**Workbox** used to generate service worker  
**RWD** and **mobile-first** approach  
**SASS** preprocessor  

Deployed live with **Heroku**.

Visit https://border-pass.herokuapp.com to start using this app and to install it on your smartphone/tablet.    

## EARLIER VERSIONS 

### Border Pass v.1  
Register your business trip's border crossings with ease.

This web app allows to register border crossings to anyone who needs to calculate his subsistence allowance for cross-border business trips.
Version 1 uses browser's localStorage to store all user data as well as app state between subsequent runs as no backend is implemented yet.
This app is PWA compliant which makes it installable on mobile devices and can be used offline.

Tech stack:

frontend built with React  
Context API used to manage app state  
React Hooks  
Parcel used to bundle all the assets  
Workbox used to generate service worker  
RWD and mobile-first approach  
SASS preprocessor  

Visit https://marcin-bojar.github.io/border-pass to start using this app and to install it on your smartphone/tablet.
