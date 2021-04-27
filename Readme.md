Workout Log

Endpoints:

/user/register  POST
adds a new user to the database
![Create User Screenshot](Docs/createUser.png)

/user/login     POST
revalidate an existing user
![Login User Screenshot](Docs/loginUser.png)

/log/           POST
adds a new log to the database, owned by posting user
![Post Log Screenshot](Docs/postNewLog.png)

/log/           GET
view all posts by current user
![See All Posts Screenshot](Docs/getUsersLogs.png)

/log/:id        GET
view logs with stated Id
![Get Logs By Id Screenshot](Docs/getLogById.png)

/log/:id        PUT
Updates stated log entry if owned by the user
![Update Log Screenshot](Docs/updateLog.png)

/log/:id        DELETE
Deletes stated log entry, if owned by the user
![Delete Log Screenshot](Docs/deleteLog.png)

