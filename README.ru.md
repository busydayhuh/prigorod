# Пригород

Приложение для просмотра расписания электричек, созданное с использованием React и Tailwind CSS. Помогает найти доступные рейсы пригородных поездов между двумя станциями, а также расписания ближайших станций и маршурт выбранного поезда.

![Desktop - 3](https://github.com/user-attachments/assets/a5adf1b3-1590-48ac-ac47-368e56938e20)


## Live-версия
↗️ [busydayhuh.github.io/prigorod/](https://busydayhuh.github.io/prigorod/)

## Возможности

- **Расписание поездов**: Просмотр расписания между выбранными станциями, расписания выбранной станции или маршрута поезда.
- **Поиск по местоположению**: Автоматическое определение местоположения пользователя для предложений ближайших станций.
- **Фильтры**: Фильтрация результатов по экспрессам, уже ушедшим поездам и другим параметрам.
- **Альтернативные маршруты**: Предложения по альтернативным маршрутам или станциям, если прямого рейса нет.
- **Адаптивный дизайн**: Оптимизировано для работы на компьютерах и мобильных устройствах.


## Технологии

- **Frontend**: React, Tailwind CSS, shadcn components
- **State Management**: React Context API
- **Routing**: React Router
- **API Integration**: Кастомные хуки с `useSWR` для получения данных
- **Forms**: React Hook Form с валидацией через Zod
- **Icons**: Lucide icons
- **Build Tool**: Vite
- **Backend**: [prigorod-proxy-server](https://github.com/busydayhuh/prigorod-proxy-server)

## Установка

Для клонирования и запуска приложения вам понадобятся Git и Node.js (включает npm). Выполните следующие команды в терминале:
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

## Acknowledgments

Этот проект использует [Яндекс Расписания API](https://yandex.ru/dev/rasp/) для получения данных о расписании поездов. 

## License

Проект распространяется под лицензией MIT. Подробнее см. в файле LICENSE.txt.

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) 
