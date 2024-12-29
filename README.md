# Bin.WebAlly.co.za - Over-Featured Pastebin

This pastebin was created with a single response from AI, it looks fine, and does exactly what I want. AI can create full-stack apps, and getting better as time goes by. What is the takeway?
I would not be creating my own tools like this if it was not for AI, it would just be a waste of time, so for creating tools to assist with bigger projects is a good use for AI at the moment.

**Repo URL:** [https://github.com/charlpcronje/bin.webally.co.za.git](https://github.com/charlpcronje/bin.webally.co.za.git)

This project is a dark-themed, “over-featured” Pastebin application split into two parts:

1. **Backend**: Node.js + Express (with MySQL)  
2. **Frontend**: React + Vite + Tailwind CSS (using ShadCN UI–inspired components)

It includes:
- **Syntax**: Basic paste creation and retrieval
- **Rate Limiting**: Prevents spammy paste creation
- **Dark UI**: ShadCN-like styling in Tailwind
- **Error Handling**: A base controller and a Proxy for controller-level errors
- **MySQL**: For data persistence
- **Reverse Proxy**: Typically served behind Nginx/Apache with distinct subdomains

---
## Table of Contents
- [Bin.WebAlly.co.za - Over-Featured Pastebin](#binweballycoza---over-featured-pastebin)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Reverse Proxy Configuration](#reverse-proxy-configuration)
    - [Example (Nginx)](#example-nginx)
  - [Usage](#usage)
  - [Troubleshooting](#troubleshooting)
  - [License](#license)

---

## Project Structure

```
bin.webally.co.za/
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── server.js
│   │   └── ...
│   └── ...
├── frontend/
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   └── App.jsx
│   └── ...
└── README.md
```

- **backend/**: Node.js + Express application  
- **frontend/**: React (Vite) application with Tailwind + ShadCN-like UI

---

## Prerequisites

1. **Node.js** (v16+ recommended)  
2. **MySQL** server (or a local MySQL instance running)
3. **NPM** (or Yarn) to install dependencies

**Subdomains** (example setup):
- **Frontend**: `bin.webally.co.za` → port **5173**  
- **Backend**: `api.bin.webally.co.za` → port **4000**

---

## Database Setup

1. **Create the MySQL database** (if it does not already exist):
   ```sql
   CREATE DATABASE IF NOT EXISTS featured_pastbin;
   USE featured_pastbin;

   CREATE TABLE IF NOT EXISTS pastes (
     id INT AUTO_INCREMENT PRIMARY KEY,
     content TEXT NOT NULL,
     created_at DATETIME NOT NULL,
     expires_at DATETIME DEFAULT NULL,
     ip VARCHAR(100) NOT NULL,
     views INT DEFAULT 0
   ) ENGINE=InnoDB;

   CREATE TABLE IF NOT EXISTS logs (
     id INT AUTO_INCREMENT PRIMARY KEY,
     ip VARCHAR(100) NOT NULL,
     created_at DATETIME NOT NULL
   ) ENGINE=InnoDB;
   ```
2. **User Credentials**:  
   - **Database**: `featured_pastbin`  
   - **User**: `cp`  
   - **Password**: `4334.4334`  
   - **Host**: `localhost`  
   - **Port**: `3306`

Update these values in the backend code if needed.

---

## Backend Setup

1. **Navigate** to the `backend` folder:
   ```bash
   cd backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Update MySQL config** (if needed) in `src/db/Database.js`:
   ```js
   export const db = await mysql.createPool({
     host: "localhost",
     user: "cp",
     password: "4334.4334",
     database: "featured_pastbin",
     port: 3306,
     ...
   });
   ```
4. **Run the backend**:
   ```bash
   npm run start
   ```
   By default, the server listens on port **4000** (`0.0.0.0`).

---

## Frontend Setup

1. **Navigate** to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Check** `App.jsx` or any code that calls the backend:
   ```jsx
   const res = await axios.post("https://api.bin.webally.co.za/api/pastes", { content });
   ```
   Make sure it points to your actual **backend** domain (e.g., `api.bin.webally.co.za`).
4. **Run the dev server**:
   ```bash
   npm run dev -- --host 0.0.0.0
   ```
   By default, Vite listens on port **5173**.  
   Open your browser to [http://bin.webally.co.za:5173](http://bin.webally.co.za:5173) if you haven’t set up a reverse proxy yet, or just `https://bin.webally.co.za` if you have your proxy configured.

---

## Reverse Proxy Configuration

### Example (Nginx)
1. **Frontend** subdomain: `bin.webally.co.za`
   ```nginx
   server {
     listen 443 ssl;
     server_name bin.webally.co.za;

     # SSL config here...
     location / {
       proxy_pass http://127.0.0.1:5173;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       proxy_set_header Host $host;
     }
   }
   ```
2. **Backend** subdomain: `api.bin.webally.co.za`
   ```nginx
   server {
     listen 443 ssl;
     server_name api.bin.webally.co.za;

     # SSL config here...
     location / {
       proxy_pass http://127.0.0.1:4000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       proxy_set_header Host $host;
     }
   }
   ```

---

## Usage

1. **Create a Paste**:
   - Go to your frontend domain (e.g., `https://bin.webally.co.za`).
   - Enter text in the **Paste Content** field.
   - Click **Create Paste**.
   - If successful, you’ll see a Paste ID and creation info.
2. **Retrieve a Paste**:
   - Copy the Paste ID from the above step.
   - Enter it in the **Paste ID** field.
   - Click **Get Paste** to see the content and view count.

---

## Troubleshooting

1. **Network Error**:  
   - Check your domain/proxy settings to ensure requests from `bin.webally.co.za` can reach the backend at `api.bin.webally.co.za`.
   - Confirm CORS in your backend matches the frontend’s domain.

2. **CORS Errors**:  
   - In `server.js` (backend), ensure:
     ```js
     app.use(cors({
       origin: "https://bin.webally.co.za",
       ...
     }));
     ```
     Or set `origin` to `*` temporarily for debugging.

3. **Database Connection Issues**:
   - Verify the MySQL credentials in `Database.js`.
   - Confirm your MySQL server is running on `localhost:3306`.

4. **SSL Certificate Problems**:
   - If you’re using self-signed certs, your browser might block requests. Ensure the certificate is trusted or switch to a real SSL provider.

---

## License

This project is provided “as-is” without warranty. You are free to modify and use it within your organization or for your own personal projects.  
*(No explicit license file has been provided—feel free to add an MIT or similar if desired.)*

---

**Enjoy your Over-Featured Pastebin!** If you run into any further issues, open an issue on the repository or reach out to the maintainer.