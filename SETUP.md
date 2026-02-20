# Setup Instructions

## Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

## Step 2: Set Up Database

```bash
npm run setup-db
```

This will create the `users` table in your PostgreSQL database.

## Step 3: Start Backend Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## Step 4: Install Frontend Dependencies

Open a new terminal and go back to the project root:

```bash
cd ..
npm install
```

## Step 5: Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Step 6: Test the Application

1. Go to `http://localhost:5173`
2. Click "Get Started" or navigate to `/signup`
3. Fill in the sign up form:
   - Name: Your full name
   - Email: Your email address
   - Password: At least 6 characters
   - Confirm Password: Same as password
4. After successful sign up, you'll be redirected to the login page
5. Log in with your credentials
6. You'll be redirected to the dashboard

## Troubleshooting

### Database Connection Issues
- Make sure your PostgreSQL database is accessible
- Check that the credentials in `server/.env` are correct
- Verify SSL mode is set correctly

### CORS Issues
- Make sure the backend server is running on port 3001
- Check that `VITE_API_URL` in the root `.env` matches your backend URL

### Port Already in Use
- Change the `PORT` in `server/.env` if 3001 is already in use
- Update `VITE_API_URL` in the root `.env` to match
