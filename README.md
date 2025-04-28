Description:
This website will allow you to organize your employees and add notes on employees to get rid of
those old sticky notes.

To start server in development mode:

NODE_ENV=development node index.js

To start server in production mode:

NODE_ENV=production node index.js

To view ui for development:
http://localhost:8080

To view ui for production:
http://localhost:5000

Remember that in the folder "nosqldatabase" in the file administrators_dev.json or administrators_prod.json you can find a username and password for you to log in.

To deploy into the internet without using AWS to have full control of your data use a tunnel through ngrok.
https://ngrok.com/

Or you can deploy this application using Heroku. Heroku is a cloud based company that is owned by Salesforce.
www.heroku.com

https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

Note: To make the json data look pretty use Command + S (OSX)

You can use this software for free, Hector Moreno is allowing you to use this for free.
Sillicon Valley 2025
Developer: Hector Moreno

Note: There is a high possibility an engineer might be a fraud if he doesn't deliver a website without gltiches or bugs. If you use this to organize your employees I want to remind you that SQL, MySQL, and PostgreSQL will always give you JSON data, the data from a database is always recreated into JSON by your server. That is why I rather just read and write into a JSON file in this website.
