# Identify
An API used to authenticate and authorize users.

The service consists of 3 endpoints

 - register (localhost:3000/users/register)
    This one is used to register new users in the database. The required json should contain the following fields:
        {
            "name",
            "email",
            "password"
        }
- login (localhost:3000/users/login)
    This one is used to generate a JWT for registered users. The required json should contain the following fields:
        {
            "email",
            "password"
        }
- authorize (localhost:3000/users/authorize)
    This one is used to validate the JWT to see if a user is logged in. The request should contain a header called auth-token with the actual token as value. If the token is correct it returns 200 "User authorize" and if it is not it sends 401 "Access denied"

The API requires two environmental variables:

 - DB_CONNECT (connection string to the database)
 - SECRET (secret used for JWT)