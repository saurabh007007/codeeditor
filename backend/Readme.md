# Backend Setup of the Project 
- Create the .env file ate the root of the backend folder
- Add env 
```
 PORT=8080

# This was inserted by `prisma init`:
[object Promise]
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/postgres"
JWT_SECRET="SaurabhYadav"
JUGE0_API_URL="http://localhost:2358" 

```

# Install the dependencies
```bash
npm install
``` 
# Run the migrations
```bash
npx prisma db sync
``` 

# Run the backend server
```bash
npm run dev
``` 


