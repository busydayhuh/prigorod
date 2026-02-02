# <img width="35" height="35" alt="favicon-96x96" src="https://github.com/user-attachments/assets/1521a135-d628-4582-a90a-11e4b3fa68b9" /> Prigorod



![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) 

[![Static Badge](https://img.shields.io/badge/lang-ENG-EF4565)](https://github.com/busydayhuh/prigorod/blob/main/README.md)  [![Static Badge](https://img.shields.io/badge/lang-RU-66A0E3)](https://github.com/busydayhuh/prigorod/blob/main/README.ru.md)


A production-oriented frontend application for browsing suburban train schedules with a focus on UX, scalability, and clean React architecture.

<img width="1920" height="1080" alt="cover" src="https://github.com/user-attachments/assets/9272533b-92b3-4595-a3a3-5816c9388e14" />

<div align="center">🔗 <b>Visit live version:</b> https://busydayhuh.github.io/prigorod/</div>

## 💡 Overview

**Prigorod** is a React-based web application that allows users to search and explore suburban train schedules.  
The project demonstrates real-world frontend development practices: API integration, state management, form validation, responsive UI, and maintainable architecture.

## ✨ Features

- 🚃 **Search schedules:**
  - between two stations
  - by selected station
  - by full train route
- 📍 **Location detection and nearby station suggestions**
- 🔄 **Results filtering:**
  - express trains
  - departed trains
  - departure date
- 🙌🏼 **Fallback suggestions** when no direct routes are available
- 📱**Fully responsive layout (mobile / desktop)**

## 🛠️ Technologies Used

- **Core**: React, Vite, Tailwind CSS
- **Routing & State**: React Router, React Context API
- **Data Fetching**: SWR, Custom hooks for API access
- **Forms & Validation**: React Hook Form, Zod
- **UI**: shadcn/ui, Lucide Icons
- **Backend** Proxy server for external API requests: [prigorod-proxy-server](https://github.com/busydayhuh/prigorod-proxy-server)


## 🚀 Getting Started
Follow the steps below to run the project locally.

### Prerequisites
- Node.js ≥ 18
- npm
- Git

### Installation
```
# Clone this repository
$ git clone https://github.com/busydayhuh/prigorod

# Go into the repository
$ cd prigorod

# Install dependencies
$ npm install

# Run the dev server
$ npm run dev
```

## 🎯 What This Project Demonstrates

- Building a real-world React application from scratch
- Working with external APIs and network constraints
- Designing user-friendly search flows
- Writing scalable and maintainable frontend code
- Applying modern React ecosystem tools

## ℹ️ Limitations

- Depends on Yandex Schedules API availability
- Covers suburban trains only
- No offline or PWA support

## 📊 Data Source

This project uses the [Яндекс Расписания API](https://yandex.ru/dev/rasp/) to fetch train schedules and related data. 

## 📜 License

Distributed under the MIT License. See LICENSE.txt for more information.

