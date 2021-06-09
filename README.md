# Border Pass v0.2.2

Register your business trip's border crossings with ease.

This web app allows to register cross-border business trips' details like time and date the trip started and ended as well as border crossings to anyone who needs to calculate his subsistence allowance. Designed with truck drivers in mind, but can be used by anyone who travels abroad and needs to document the trip.  
Version 0.2.2 brings new functionality, which is the archive, where user has all his sent and unsent tables available for 6 months.  
The app gives the possibility to send the already preformated table with all the data about the trips from selected timeframe by email.  
Another feature is possibility to register trip's start and end time, apart from the border crossings.  
All user data is stored in MongoDB database. JSON web tokens are used for user authentication and authorization.  
Sensitive data like users' passwords are hashed before stored in database.  
It is still possible to use this app as guest user, without signing in/up, as all functionalities from version 0.1 are still available to the user.  
**This app is PWA compliant which makes it installable on mobile devices. Using this app in guest mode makes it 100% functional offline.**

### Tech stack:

#### Backend

built with **Node/Express**  
**jsonwebtoken** used for user auth  
all data stored in **MongoDB**  
**Mongoose** ODM for MongoDB  
**bcrypt** used to encrypt sensitive data  
**dotenv** used to manage environment variables  
**nodemailer** used to send email from the server  
**googleapis** used to connect to the Google API using **OAuth2**  
**html-minifier** used to minify the sent file

#### Frontend

built with **React**  
**Context API** used to manage app state  
**React Hooks**  
**Parcel** used to bundle all the assets  
**Workbox** used to generate service worker  
**RWD** and **mobile-first** approach  
**SASS** preprocessor

Deployed live with **nazwa.pl** hosting provider.  
Staging deployed live with **Heroku**.

Landing page: https://border-pass.pl  
Visit https://app.border-pass.pl to start using this app and to install it on your smartphone/tablet.

## EARLIER VERSIONS

### Border Pass v0.2.1

Register your business trip's border crossings with ease.

This web app allows to register cross-border business trips' details like time and date the trip started and ended as well as border crossings to anyone who needs to calculate his subsistence allowance. Designed with truck drivers in mind, but can be used by anyone who travels abroad and needs to document the trip.  
Version 0.2.1 brings new functionality, which is the possibility to send the already preformated table with all the data about the trips from selected timeframe by email.  
Another new addition is possibility to register trip's start and end time, apart from the border crossings.  
All user data is stored in MongoDB database. JSON web tokens are used for user authentication and authorization.  
Sensitive data like users' passwords are hashed before stored in database.  
It is still possible to use this app as guest user, without signing in/up, as all functionalities from version 0.1 are still available to the user.  
This app is PWA compliant which makes it installable on mobile devices. Using this app in guest mode makes it 100% functional offline.

### Tech stack:

#### Backend

built with **Node/Express**  
**jsonwebtoken** used for user auth  
all data stored in **MongoDB**  
**Mongoose** ODM for MongoDB  
**bcrypt** used to encrypt sensitive data  
**dotenv** used to manage environment variables  
**nodemailer** used to send email from the server  
**googleapis** used to connect to the Google API using **OAuth2**  
**html-minifier** used to minify the sent file

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

### Border Pass v0.2

Register your business trip's border crossings with ease.

This web app allows to register border crossings to anyone who needs to calculate his subsistence allowance for cross-border business trips.
Since version 2.0 all user data is stored in MongoDB database. JSON web tokens are used for user authentication and authorization.  
Sensitive data like users' passwords are hashed before stored in database.  
It is still possible to use this app as guest user, without signing in/up, as all functionalities from version 0.1 are still available to the user.  
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

### Border Pass v0.1

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
