# Prigorod

A web application for viewing suburban train schedules, built with React and Tailwind CSS. The app provides features like location-based search, filtering options, and suggestions for nearby stations.

![Desktop - 3](https://github.com/user-attachments/assets/a5adf1b3-1590-48ac-ac47-368e56938e20)


## 💥 Live Version
#### [Visit the live version](https://busydayhuh.github.io/prigorod/)
---

## Features

- **Train Schedules**: View schedules for trains between selected stations.
- **Location-Based Search**: Automatically detect the user's location to suggest nearby stations.
- **Filters**: Filter results by express trains, departed trains, and more.
- **Suggestions**: Get alternative routes or station suggestions when no direct routes are available.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Technologies Used

- **Frontend**: React, Tailwind CSS, shadcn components
- **State Management**: React Context API
- **Routing**: React Router
- **API Integration**: Custom hooks with `useSWR` for data fetching
- **Icons**: Lucide icons
- **Build Tool**: Vite
- **Backend**: [prigorod-proxy-server](https://github.com/busydayhuh/prigorod-proxy-server)

---
## Getting Started

To clone and run this application, you'll need Git and Node.js (which comes with npm) installed on your computer. From your command line:
```
# Clone this repository
$ git clone https://github.com/busydayhuh/prigorod

# Go into the repository
$ cd prigorod

# Install dependencies
$ npm install

# Run the server
$ npm run dev
```

## ⭐ Acknowledgments

This project uses the [Яндекс Расписания API](https://yandex.ru/dev/rasp/) to fetch train schedules and related data. 

## 📜 License

Distributed under the MIT License. See LICENSE.txt for more information.
