# Steps to Upload Project to GitHub

## Prerequisites
- GitHub account created
- Git installed on your computer

## Step-by-Step Instructions

### Step 1: Create a New Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `kodnest` (or any name you prefer)
   - **Description**: "StreamVault - OTT Streaming Platform with React and PostgreSQL"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 2: Add All Files to Git

Open your terminal/command prompt in the project directory and run:

```bash
# Add all files
git add .

# Check what will be committed
git status
```

### Step 3: Commit Your Changes

```bash
# Commit with a descriptive message
git commit -m "Add sign up page, backend server with PostgreSQL, and movie API integration"
```

### Step 4: Connect to GitHub Repository

**Option A: If you haven't set a remote yet:**

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/kodnest.git

# Verify the remote was added
git remote -v
```

**Option B: If remote already exists, update it:**

```bash
# Set the remote URL (replace YOUR_USERNAME)
git remote set-url origin https://github.com/YOUR_USERNAME/kodnest.git
```

### Step 5: Push to GitHub

```bash
# Push to GitHub (first time)
git push -u origin main

# For subsequent pushes, you can use:
git push
```

### Step 6: Verify Upload

1. Go to your GitHub repository page
2. Refresh the page
3. You should see all your files uploaded

## Important Notes

### ⚠️ Security: Never Commit Sensitive Files

The following files are **automatically ignored** by `.gitignore`:
- `.env` files (contain database credentials)
- `node_modules/` folders
- Log files

**Before pushing, verify these files are NOT tracked:**

```bash
# Check if .env files are being tracked (should return nothing)
git ls-files | grep .env

# Check if node_modules are tracked (should return nothing)
git ls-files | grep node_modules
```

### If You Need to Remove Already Tracked Files

If you accidentally committed sensitive files:

```bash
# Remove from git tracking (but keep local file)
git rm --cached server/.env
git rm --cached .env

# Commit the removal
git commit -m "Remove sensitive .env files"

# Push the changes
git push
```

## Alternative: Using GitHub Desktop

If you prefer a GUI:

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Sign in with your GitHub account
3. Click **"File" → "Add Local Repository"**
4. Select your project folder (`C:\Users\test\Desktop\kodnest`)
5. Click **"Publish repository"** in GitHub Desktop
6. Choose your GitHub account and repository name
7. Click **"Publish Repository"**

## Troubleshooting

### Authentication Issues

If you get authentication errors:

**For HTTPS:**
```bash
# Use a Personal Access Token instead of password
# Create one at: https://github.com/settings/tokens
```

**For SSH (recommended):**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add SSH key to GitHub
# Copy the public key and add it at: https://github.com/settings/keys
```

### Branch Name Issues

If your default branch is `master` instead of `main`:

```bash
# Rename branch
git branch -M main

# Push with new branch name
git push -u origin main
```

### Large Files

If you have large files that cause issues:

```bash
# Check file sizes
git ls-files | xargs ls -lh | sort -k5 -hr | head -20
```

## Quick Reference Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline
```

## Next Steps After Uploading

1. **Add a README**: Update `README.md` with project description
2. **Add License**: Add a LICENSE file if needed
3. **Set up GitHub Actions**: For CI/CD (optional)
4. **Add Topics**: Add topics like `react`, `postgresql`, `streaming` to your repo
5. **Create .env.example**: Create example env files for other developers:
   ```
   # Frontend
   VITE_API_URL=http://localhost:3001
   
   # Backend (server/.env.example)
   DB_HOST=your_host
   DB_PORT=28973
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=defaultdb
   DB_SSL=true
   PORT=3001
   ```
