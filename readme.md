# Welcome to API MoodShop
This is Restfull API using **ExpressJS**
## This API use:
1. NodeJS
2. ExpressJS Framework
3. PostgreSQL as DBMS
4. Postman for testing

## Tutorial Use This API

Please copy this project for learning by cloning from Github in a way, 
- clone code with this

  `git clone [**link github**].`
- please create `.env` file for setting in this project
  ```
  MODE=DEV

  DB_HOST=your DB_HOST
  DB_USER=your user
  DB_PASS=your password
  DB_DATABASE=your database
  DB_PORT=port postgres

  REDIS_HOST=redis
  REDIS_PORT=port redis 
  REDIS_PASS=your password

  JWT_KEYS = your jwt keys

  CLOUD_KEY = your cloud key
  CLOUD_SECRET = your CLOUD_SECRET
  CLOUD_NAME = your CLOUD_NAME
  CLOUD_ENV = your CLOUD_ENV
  ```
- Create database with postgresql
- create table Product and Category
- fill column in product with id, name, price, image, id_category
- fill column in category with id, name
- and then use postman for trying this API
- code is from [Postman](https://web.postman.co/workspace/DevOps~11c91da1-708f-48a4-a903-c04ba134d26f/documentation/8654045-e5835fba-208c-4200-9f16-7e1b519a2b51)

### HAPPY CODING :D
