# 🏗️ Real Estate Operating System (R-OS) — Backend Monorepo

A modular, microservice-based backend built for a scalable real-estate ecosystem.
Designed for production-grade usage, extensibility, and hackathon collaboration.
---

## 🚀 Project Overview

This repository contains independent backend services that together form the **Real Estate Operating System**, enabling digital workflows across:

| Service | Purpose | ERD Diagram |
|---------|---------|-------------|
| 🏢 Society Services | Manage societies, units, parking, members, committees | [View ERD](https://drive.google.com/file/d/1IOyGOjEag3ACskgRCEt4DkaVBs9Z4N8E/view?usp=drive_link) |
| 👥 Community Services | Community creation, posts, join requests, member roles | [View ERD](https://drive.google.com/file/d/1tF80xlRmXHi6pr-CphjzfJg0YIChFew0/view?usp=drive_link) |
| 🧠 Knowledge Services | Knowledge base, categories, versions, history | [View ERD](https://drive.google.com/file/d/16i-g6heyDIo6QnGTJardfxRcROG5WQBs/view?usp=drive_link) |
| 📝 Notes Services | Personal & shared notes with tags, mentions, attachments | [View ERD](https://drive.google.com/file/d/1Tjc7pzeQ0VydUXRfg0m1X_FqryvgmGUr/view?usp=drive_link) |
| 🏝️ Leave Management | Employee leave types, balances, requests, approvals | [View ERD](https://drive.google.com/file/d/1J-HBa-G4JFmojYYiA4BLXxNdEsmCMdSg/view?usp=drive_link) |
| 📅 Events Services | Org-wide or community-based events, RSVPs, reminders | [View ERD](https://drive.google.com/file/d/18EZi1tgp08lw8dBS9Zw3_2eTJHBTWuv9/view?usp=drive_link) |

Each service will expose REST APIs and follow **domain-driven design**, **JWT auth**, and **MongoDB database per service**.

✅ **Tech Stack**
- Node.js 20.18.0 (Express)
- MongoDB per service (no shared DB)
- Express-Validator (mandatory for request validation)
- JWT-based auth middleware
- migrate-mongo for DB migrations
- AWS EC2 for deployment
- AWS S3 for file storage
---

## 📁 Folder Structure

```
real-estate-os/
│── services/
│   ├── society-services/
│   ├── community-services/
│   ├── leave-management-services/
│   ├── knowledge-services/
│   ├── notes-services/
│   ├── events-services/
│── README.md

Each Service has the following structure:

service-name/
│── src/
│   ├── config/           # DB config, constants, env
│   ├── console/          # CLI tools (seeders / cron triggers)
│   ├── controllers/      # Route handlers
│   ├── libs/             # 3rd party libs (S3, Redis, Mail, etc.)
│   ├── logs/             # (optional) log files
│   ├── message/          # Error/success messages
│   ├── middleware/       # Auth, rate-limit, validators
│   ├── migrations/       # migrate-mongo files
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── templates/        # Email/SMS templates (optional)
│   ├── utils/            # Helpers
│   ├── validations/      # Express-validator rules
│   └── index.js          # App entrypoint
│   └── migrate-mongo-config.js
│
│── package.json
│── .env.dev
```

## 🔐 .env.dev (per service)

```
ENTRYTRACKING_DB_URL =
ENTRYTRACKING_DB_POOLSIZE =
DB_NAME = society-services_dev
DB_URL =
PORT=

AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_BUCKET=
AWS_DEFAULT_REGION=
AWS_FILE_PATH=

```
## 🚀 Quick Start (TL;DR)

# 1️⃣ Go inside any service
cd services/society-services

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run database migrations (only if service has DB)
npx migrate-mongo up

# 4️⃣ Start service
npm start    # OR nodemon src/index.js


## 🛠️ Database Migrations (migrate-mongo)

```
cd services/user-services/src

# Create migration
npx migrate-mongo create add-test-users-collection

# Run migration
npx migrate-mongo up

# Check status
npx migrate-mongo status
```

# 📬 Postman API Collection
```
✅ All requests should include bodies with response example
✅ JWT is auto-attached in headers section (`Authorization: token`)
✅ Export full Postman Collection JSON
✅ Upload to Google Drive
✅ Get sharable link
✅ Insert link above inside README
✅ Commit updated README to repo
```
## 📌 Points to Remember
✅ Follow camelCase
✅ Every service must have a unique port


