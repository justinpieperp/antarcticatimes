<div id="top"></div>

# Antarctica Times

##### This is a blog website which I build from scratch.

## Technology Stack

- NodeJS
- Express
- React
- Scss
- Antd
- MongoDB
- Mongoose
- GraphQL
- Apollo-Server
- other development tools include
  - **eslint** to format code during development
  - **nodemon** to automatically refresh page
  - **bcryptjs** to encrypt password
  - **dotenv** to extrac congif infomation from code

<!-- USAGE EXAMPLES -->

## Usage

Show useful examples of how a project can be used with screenshots, code examples and demos. May also link to more resources.

### Home Page

![homepage]

### Posts Page

![postspage]

### Dashboard Page

![dashboard]

### Post List Page

![postlist]

### Post Detail Page

![postdetail]

### Page Create

![postcreate]

### Post List Page

![categorylist]

### Post Detail Page

![categorydetail]

### Alert

![success]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Client home & post page
- [x] Admin CRUD operations
- [ ] Register & Login
- [ ] Client
  - [ ] posts detail page
  - [ ] user page
  - [ ] search
- [ ] Admin
  - [ ] fix new tag color bug
        extract to tag-color table?
  - [ ] user customized theme
  - [ ] dashboard page

<p align="right">(<a href="#top">back to top</a>)</p>

## Development Log

#### Error 1: MongooseServerSelectionError

Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/
I got this bug when first tried to start the server after a long time, the reason is my IP address changed.
MongoDB Atlas > Add new IP address into list. Details are in the link above.

#### Error 2: Objects are not valid as a react child

React return 里面不能有对象
因为对象不是 primitive type(JavaScript 里只有这一个不是)
要用{ Object.property }

#### Error 3: Object is not extensible error when creating new attribute for array of objects

learn to deconstruct and reconstrut arrays and objects by [...array] / {...object}

#### Error 4: Variable \"$id\" of required type \"ID!\" was not provided

According to GraphQL documents, _string_ and _int_ are acceptable types for _ID_. When facing this problem, think about something else.

#### Error 5: Enforce newlines between operands of ternary expressions if the expression spans multiple lines (multiline-ternary)

when using ? : in React, pay attention to the format. "?" and ":" should always be in the next line.

#### Error 6: Rendered more hooks than during the previous render” error when the initial value for the hook is a query result from a database

Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function.
If we want to set state value after getting data from useQuery() hook, one way is to call setState function in **onCompleted** of useQuery()

<p align="right">(<a href="#top">back to top</a>)</p>

[homepage]: /public/readme_imgs/homepage.png
[postspage]: /public/readme_imgs/postspage.png
[dashboard]: /public/readme_imgs/dashboard.png
[postlist]: /public/readme_imgs/postlist.png
[postdetail]: /public/readme_imgs/postdetail.png
[postcreate]: /public/readme_imgs/postcreate.png
[categorylist]: /public/readme_imgs/categorylist.png
[categorydetail]: /public/readme_imgs/categorydetail.png
[success]: /public/readme_imgs/success.png
