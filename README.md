```
Why would you add db credentials etc in the README.md, please anonymize everything in the README, including domain names and everything else.
```

**Response:**

Below is a version of the **README.md** with **all sensitive information anonymized** (database name, user credentials, domain/subdomain references, etc.) replaced by placeholders. This ensures no sensitive data or real domain names are revealed.

---

```md
# Over-Featured Pastebin

**Repo URL:** [https://github.com/USERNAME/REPO-NAME.git](https://github.com/USERNAME/REPO-NAME.git)

This project is a dark-themed, “over-featured” Pastebin application split into two parts:

1. **Backend**: Node.js + Express (with MySQL)  
2. **Frontend**: React + Vite + Tailwind CSS (with a ShadCN-inspired UI)

It includes:
- **Syntax**: Basic paste creation and retrieval  
- **Rate Limiting**: Prevents spammy paste creation  
- **Dark UI**: ShadCN-like styling in Tailwind  
- **Error Handling**: A base controller and Proxy for controller-level errors  
- **MySQL**: For data persistence  
- **Reverse Proxy**: Typically served behind Nginx/Apache with distinct subdomains  

---

## Table of Contents
1. [Project Structure](#project-structure)  
2. [Prerequisites](#prerequisites)  
3. [Database Setup](#database-setup)  
4. [Backend Setup](#backend-setup)  
5. [Frontend Setup](#frontend-setup)  
6. [Reverse Proxy Configuration](#reverse-proxy-configuration)  
7. [Usage](#usage)  
8. [Troubleshooting](#troubleshooting)  
9. [License](#license)  

---

## Project Structure

```
your-app/
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

**Optional** (recommended for production):
- **Reverse Proxy** subdomain(s), e.g.:  
  - **Frontend**: `paste.example.com` → port **5173**  
  - **Backend**: `api.example.com` → port **4000**

---

## Database Setup

1. **Create the MySQL database** (if it does not already exist). For instance:
   ```sql
   CREATE DATABASE IF NOT EXISTS your_db_name;
   USE your_db_name;

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
2. **User Credentials** (placeholders):
   - **Database**: `your_db_name`  
   - **User**: `your_user`  
   - **Password**: `your_password`  
   - **Host**: `localhost`  
   - **Port**: `3306`  

Update these in your backend code if needed.

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
3. **Update MySQL config** (in `src/db/Database.js`), replacing placeholders with your actual credentials:
   ```js
   export const db = await mysql.createPool({
     host: "localhost",
     user: "your_user",
     password: "your_password",
     database: "your_db_name",
     port: 3306,
     // ...
   });
   ```
4. **Run the backend**:
   ```bash
   npm run start
   ```
   By default, the server listens on port **4000**.  

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
3. **Check** `App.jsx` or whichever file is calling the backend:
   ```jsx
   const res = await axios.post("https://api.example.com/api/pastes", { content });
   ```
   Make sure it points to your actual **backend** domain or IP if you’re using a reverse proxy.
4. **Run the dev server**:
   ```bash
   npm run dev -- --host 0.0.0.0
   ```
   By default, Vite listens on port **5173**.  
   - Without a reverse proxy, visit `http://<your-server-ip>:5173`.  
   - With a reverse proxy, visit `https://paste.example.com`.

---

## Reverse Proxy Configuration

> **Example** using **Nginx**. Replace `paste.example.com` and `api.example.com` with your actual hostnames.

1. **Frontend** subdomain: `paste.example.com`
   ```nginx
   server {
     listen 443 ssl;
     server_name paste.example.com;

     # SSL config, certificate info, etc.

     location / {
       proxy_pass http://127.0.0.1:5173;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       proxy_set_header Host $host;
     }
   }
   ```
2. **Backend** subdomain: `api.example.com`
   ```nginx
   server {
     listen 443 ssl;
     server_name api.example.com;

     # SSL config, certificate info, etc.

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
   - Go to the frontend domain (e.g., `https://paste.example.com`).
   - Enter text into the **Paste Content** field.
   - Click **Create Paste**.
   - A Paste ID and creation details will appear on success.

2. **Retrieve a Paste**:
   - Copy the Paste ID shown above.
   - Enter it in the **Paste ID** field.
   - Click **Get Paste** to see the content and view count.

---

## Troubleshooting

1. **Network Error**:
   - Check domain/proxy settings. Ensure requests from the frontend domain can reach the backend domain.
   - Confirm that CORS in the backend is configured to allow the frontend origin.

2. **CORS Errors**:
   - In the backend’s `server.js`, ensure:
     ```js
     app.use(cors({
       origin: "https://paste.example.com",
       methods: ["GET", "POST"],
       credentials: true,
     }));
     ```
     (Match your frontend domain exactly.)

3. **Database Connection Issues**:
   - Verify MySQL credentials in `Database.js`.
   - Confirm the MySQL server is running on `localhost:3306` (or your designated host/port).

4. **SSL Certificate Problems**:
   - If using self-signed certs, your browser may block requests. Use a trusted cert or switch to HTTP for local testing.

---

## License

This project is provided “as-is” without warranty. You are free to modify and use it within your organization or for personal projects.  
*(No explicit license file is included—feel free to add an MIT or similar license if desired.)*