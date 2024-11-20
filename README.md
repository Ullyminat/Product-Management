
# Product Management API

## RU 🇷🇺

### Описание

REST API для управления продуктами, созданное на Node.js, Express.js и MongoDB. Поддерживает добавление, просмотр списка продуктов и отображение изображений.

### Возможности

- Добавление нового продукта с изображением.
- Получение списка всех продуктов из базы данных.
- Загрузка изображения продукта.

### Установка

#### Необходимые компоненты

- Node.js
- MongoDB

#### Шаги установки

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/Ullyminat/Product-Management.git
    cd Product-Management
    ```

2. Установите зависимости:

    ```bash
    npm i
    ```

3. Настройте `.env` файл:

    ```bash
    DB=mongodb://localhost:27017/test  # Ваша строка подключения
    PORT=3006                         # Порт для запуска сервера
    ```

4. Запустите сервер:

    ```bash
    npm run dev
    ```

    Сервер будет доступен по адресу [http://localhost:3006](http://localhost:3006).

### API Эндпоинты

#### Базовый URL: `/product`

- **Добавление нового продукта**  
  **URL:** `/product/create`  
  **Метод:** `POST`  
  **Тело запроса (form-data):**
    - `name` (string) — Название продукта.
    - `price` (number) — Цена продукта.
    - `description` (string) — Описание продукта.
    - `picture` (file) — Изображение продукта.

    **Пример:**

    ```bash
    curl -X POST http://localhost:3006/product/create \
    -F "name=Книга" \
    -F "price=500" \
    -F "description=Книга о программировании" \
    -F "picture=@/путь/к/файлу.jpg"
    ```

- **Получение списка продуктов**  
  **URL:** `/product/load`  
  **Метод:** `GET`  

    **Пример ответа:**

    ```json
    [
        {
            "_id": "64234a12d78f8d5a7867c123",
            "name": "Книга",
            "price": 500,
            "description": "Книга о программировании",
            "picture": "1698192345678-файл.jpg"
        }
    ]
    ```

- **Получение изображения продукта**  
  **URL:** `/product/:filename`  
  **Метод:** `GET`  

    **Пример:**

    ```bash
    curl http://localhost:3006/product/1698192345678-файл.jpg
    ```

### Структура проекта

```bash
📂 backend
├── 📂 config
│   ├── db_connect.mjs       # Подключение к базе данных MongoDB
│   └── uploader.mjs         # Конфигурация загрузки файлов с использованием multer
├── 📂 controllers
│   └── ProductController.mjs # Логика обработки запросов для сущности "Продукт"
├── 📂 models
│   └── Product.mjs          # Схема модели MongoDB для "Продукта"
├── 📂 router
│   └── ProductRouter.mjs    # Роутинг для работы с продуктами
├── 📂 media                 # Папка для хранения загруженных изображений
├── .env                     # Конфигурация окружения
├── index.mjs                # Главный файл приложения
└── README.md                # Документация
```

### Используемые технологии

- **Node.js** — Серверная платформа.
- **Express** — Веб-фреймворк.
- **Mongoose** — Библиотека для работы с MongoDB.
- **Multer** — Middleware для загрузки файлов.
- **Cors** — Для настройки CORS.
- **dotenv** — Управление переменными окружения.