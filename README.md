# Blog App

#### This is a blog website which I build from scratch.

## Technology Stack

### frontend

- NodeJS
- Express
- React
- Scss
- HTML

### backend

- MongoDB
- Mongoose
- GraphQL
- Apollo-Server
- other development tools include
  - **eslint** to format code during development
  - **nodemon** to automatically refresh page
  - **bcryptjs** to encrypt password
  - **dotenv** to extrac congif infomation from code

## Development Bug Log

#### Bug1:

**MongooseServerSelectionError:** Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/

**Situation:**I got this bug when first tried to start the server after a long time, the reason is my IP address changed.</p>

**Solution:** MongoDB Atlas > Add new IP address into list. Details are in the link above.

post user 增删改查 function
api 和后端连起来
abstract and add Modal to every operation
