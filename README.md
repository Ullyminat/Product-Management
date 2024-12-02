# Product Management API

## RU 🇷🇺

### Описание

REST API для управления продуктами и категориями, созданное на Node.js, Express.js и MongoDB. Поддерживает добавление, удаление, обновление продуктов и категорий, а также загрузку и отображение изображений продуктов.

### Возможности

- **Управление категориями:**
  - Создание новой категории.
  - Удаление категории (при удалении категории, все продукты, связанные с ней, также будут удалены).

- **Управление продуктами:**
  - Добавление нового продукта с изображением.
  - Получение списка всех продуктов.
  - Загрузка изображения продукта.
  - Обновление информации о продукте.
  - Удаление продукта.

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
    PORT=3006                          # Порт для запуска сервера
    ```

4. Запустите сервер:

    ```bash
    npm run dev
    ```

    Сервер будет доступен по адресу [http://localhost:3006](http://localhost:3006).

### API Эндпоинты

#### Базовый URL: `/category`

- **Создание новой категории**  
  **URL:** `/category/create`  
  **Метод:** `POST`  
  **Тело запроса (JSON):**
    - `name` (string) — Название категории.

    **Пример:**

    ```bash
    curl -X POST http://localhost:3006/category/create \
    -H "Content-Type: application/json" \
    -d '{"name": "Книги"}'
    ```

- **Получение списка категориё**  
  **URL:** `/category/load`  
  **Метод:** `GET`  

    **Пример:**

    ```bash
    curl -X GET http://localhost:3006/category/load
    ```

- **Удаление категории**  
  **URL:** `/category/delete/:id`  
  **Метод:** `DELETE`  

    **Пример:**

    ```bash
    curl -X DELETE http://localhost:3006/category/delete/674b555d5d2583bc1cc57a6b
    ```

#### Базовый URL: `/product`

- **Добавление нового продукта**  
  **URL:** `/product/create/:id` `(id категории из MongoDB)`
  **Метод:** `POST`  
  **Тело запроса (form-data):**
    - `name` (string) — Название продукта.
    - `price` (number) — Цена продукта.
    - `description` (string) — Описание продукта.
    - `picture` (file) — Изображение продукта.

    **Пример:**

    ```bash
    curl -X POST http://localhost:3006/product/create/674b555d5d2583bc1cc57a6b \
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

- **Обновление информации о продукте**  
  **URL:** `/product/update/:id`  
  **Метод:** `PUT`  
  **Тело запроса (JSON):**
    - `name` (string) — Новое название продукта.
    - `price` (number) — Новая цена продукта.
    - `description` (string) — Новое описание продукта.

    **Пример:**

    ```bash
    curl -X PUT http://localhost:3006/product/update/64234a12d78f8d5a7867c123 \
    -H "Content-Type: application/json" \
    -d '{"name": "Новая книга", "price": 600, "description": "Новое описание"}'
    ```

- **Удаление продукта**  
  **URL:** `/product/delete/:id`  
  **Метод:** `DELETE`  

    **Пример:**

    ```bash
    curl -X DELETE http://localhost:3006/product/delete/64234a12d78f8d5a7867c123
    ```

### Структура проекта

```bash
📂 backend
├── 📂 config
│   ├── db_connect.mjs       # Подключение к базе данных MongoDB
│   └── uploader.mjs         # Конфигурация загрузки файлов с использованием multer
├── 📂 controllers
│   ├── ProductController.mjs # Логика обработки запросов для сущности "Продукт"
│   └── CategoryController.mjs # Логика обработки запросов для сущности "Категория"
├── 📂 models
│   ├── Product.mjs          # Схема модели MongoDB для "Продукта"
│   └── Category.mjs         # Схема модели MongoDB для "Категория"
├── 📂 router
│   ├── ProductRouter.mjs    # Роутинг для работы с продуктами
│   ├── CategoryRouter.mjs   # Роутинг для работы с категориями
│   └── index.mjs            # Главный роутинг
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


![Chill Guy](/backend/media/1733043210244-1732607169987-scale-12001.webp)