This is a Full-Stack Web Application that allows you to organize your company employees or government employees, you can take as many copies as you want for free.

To start server in development mode:

NODE_ENV=development node index.js

To start server in production mode:

NODE_ENV=production node index.js

To view ui for development:
http://localhost:8080

To view ui for production:
http://localhost:5000

To login:
userName: JonBonjovi
password: test

Remember that in the folder "nosqldatabase" in the file administrators_dev.json or administrators_prod.json you can find a username and password for you to log in.

Note: Remember that you have to start the server in development mode to use the ui in development mode as well in
http://localhost:8080

To deploy into the internet without using AWS to have full control of your data use a tunnel through ngrok.
https://ngrok.com/

Or you can deploy this application using Heroku. Heroku is a cloud based company that is owned by Salesforce.
www.heroku.com

https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

To use FaceTime to make calls if you are using OSX

1. Command + Space(Search for FaceTime).
2. Once you have FaceTime open on the left corner in the top next to the Apple icon in your Mac
   ,Macbook Air, or Macbook Pro click on the FaceTime text and in the drop-down menu choose Preferences.
3. In the section "Default for Calls:" click on the drop-down menu and choose FaceTime to be able to use
   FaceTime to call employees once you click on a phone number.

Note: I chose Node JS as the technology for my server because of libuv the C library that implements the Node.js event loop, its worker threads and all of the asynchronous behaviors of the platform.
https://nodejs.org/api/addons.html

Note: I want to remind engineers that "data" is always JSON to the UI that is sent through HTTPS requests. This NOSQL database writes and reads into a json file which is the same as Mongo DB.

Created by: Hector Moreno
Development Machine: Macbook Air 2020 M1 RAM 16GB SSD 500GB
OS Machine: macOS Big Sur
