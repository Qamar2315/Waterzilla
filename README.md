# WaterZilla - Online Water Delivery Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

WaterZilla is a robust full-stack web application designed to streamline the online water purchasing and delivery process. Built with a powerful MERN-like stack, it features a modern React frontend and offers the flexibility of two distinct backend implementations: one using **Node.js with Express, Sequelize, and MySQL**, and another using **Node.js with Express, Mongoose, and MongoDB**.

This application provides a seamless, intuitive portal for customers to order water and track deliveries, while equipping administrators with a comprehensive dashboard to manage every aspect of the business—from customers and orders to inventory and sales reporting.

---

## Table of Contents

- [WaterZilla - Online Water Delivery Management System](#waterzilla---online-water-delivery-management-system)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
    - [Admin Dashboard](#admin-dashboard)
    - [Customer Portal](#customer-portal)
  - [Architecture \& Tech Stack](#architecture--tech-stack)
    - [Frontend (Client)](#frontend-client)
    - [Backend (Server)](#backend-server)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation \& Setup](#installation--setup)
      - [1. Clone the Repository](#1-clone-the-repository)
      - [2. Frontend Setup](#2-frontend-setup)
      - [3. Backend Setup (Choose one)](#3-backend-setup-choose-one)
        - [Option A: MySQL Backend](#option-a-mysql-backend)
        - [Option B: MongoDB Backend](#option-b-mongodb-backend)
  - [Running the Application](#running-the-application)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

---

## Key Features

### Admin Dashboard

The administrative panel is a central hub for managing the entire business operation.

-   **Analytics Dashboard:** Get a real-time overview of business performance with key metrics:
    -   Total Orders & Sales Figures
    -   Breakdown of orders by status (New, Accepted, Delivered, Cancelled)
    -   Total registered customers and partner companies.
-   **Order Management:** A complete system to track and update orders throughout their lifecycle.
    -   View orders categorized by their status.
    -   Inspect individual order details, including customer information and delivery address.
    -   Update order status from "New" to "Accepted" or "Delivered".
-   **Customer Management (CRUD):** Full control over the user base.
    -   View a complete list of registered customers.
    -   Access and edit detailed customer profiles, including personal and address information.
    -   Ability to add or remove customers from the system.
-   **Product & Inventory Management (CRUD):** Easily manage the water bottle catalog.
    -   Add new water bottle products with details like name, price, quantity, size, and image.
    -   Images are seamlessly uploaded and managed via **Cloudinary**.
    -   Update existing product information and delete discontinued items.
-   **Company Management (CRUD):** Manage the portfolio of water bottle companies.
    -   Add, view, update, and delete company profiles and logos.
-   **Reporting Engine:** Generate insightful reports for business analysis.
    -   Visualize order statistics with interactive Pie and Bar charts (using **Recharts**).
    -   Export detailed sales and order reports to **PDF format** for documentation and meetings.
-   **Content Management:**
    -   Dynamically update the public-facing "About Us" page with new text and images.
-   **System Notifications:**
    -   Receive real-time notifications for key events like new orders or cancellations.

### Customer Portal

A user-friendly and secure interface for customers to interact with the service.

-   **Secure Authentication:** Customers can register for a new account or log in securely. Authentication is handled by JWT (JSON Web Tokens).
-   **Product Catalog:** Browse a clean, visual catalog of available water bottles.
-   **Order Placement:** A simple and intuitive process to select a product and place an order.
-   **Order History & Tracking:**
    -   View a personalized history of all past and current orders.
    -   Track the real-time status of each order (e.g., Accepted, Out for Delivery).
    -   Option to cancel an order before it is processed.
-   **Product Reviews:**
    -   Read reviews from other customers on the product checkout page.
    -   Post new reviews to share feedback on products.
    -   Ability to delete their own previously posted reviews.

---

## Architecture & Tech Stack

WaterZilla is built with a decoupled frontend and backend architecture, allowing for scalability and maintainability.

### Frontend (Client)

| Technology           | Description                                          |
| -------------------- | ---------------------------------------------------- |
| **React**            | A JavaScript library for building user interfaces.   |
| **React Router**     | For declarative, client-side routing.                |
| **React Context API**| For global state management (e.g., authentication).  |
| **Axios**            | Promise-based HTTP client for making API requests.   |
| **Tailwind CSS**     | A utility-first CSS framework for rapid UI development.|
| **DaisyUI**          | A component library for Tailwind CSS.                |
| **Formik & Yup**     | For building and validating forms with ease.         |
| **Recharts**         | A composable charting library for data visualization.|
| **jsPDF**            | For generating client-side PDFs.                     |

### Backend (Server)

The project includes two complete, interchangeable backend implementations.

| Technology                    | MySQL Implementation (`/server`)                | MongoDB Implementation (`/server2`)               |
| ----------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| **Runtime Environment**       | Node.js                                         | Node.js                                           |
| **Framework**                 | Express.js                                      | Express.js                                        |
| **Database**                  | MySQL                                           | MongoDB                                           |
| **ORM / ODM**                 | **Sequelize** (Object-Relational Mapper)        | **Mongoose** (Object Data Modeling)               |
| **Authentication**            | `jsonwebtoken` (JWT), `bcrypt` (hashing)        | `jsonwebtoken` (JWT), `bcrypt` (hashing)          |
| **Middleware**                | `cors`, Custom Auth Middleware                  | `cors`, Custom Auth Middleware                    |

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed:
-   [Node.js](https://nodejs.org/) (v14 or newer)
-   [Git](https://git-scm.com/)
-   **For MySQL Backend:** A running MySQL server instance.
-   **For MongoDB Backend:** A running MongoDB server instance.

### Installation & Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Qamar2315/Waterzilla.git
cd Waterzilla
```

#### 2. Frontend Setup

Navigate to the client directory and install the necessary dependencies.

```bash
cd client
npm install
```

**Note:** The frontend is configured to communicate with the backend at `http://localhost:8080`.

#### 3. Backend Setup (Choose one)

You can run either the MySQL or the MongoDB backend.

##### Option A: MySQL Backend

1.  **Navigate and Install Dependencies:**
    ```bash
    cd server
    npm install
    ```
2.  **Database Configuration:**
    -   Open the `server/config/config.json` file.
    -   Update the `development` object with your MySQL username, password, and desired database name.
    ```json
     "development": {
        "username": "your_mysql_user",
        "password": "your_mysql_password",
        "database": "waterzilla_db",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
    ```
3.  **Create Database & Run Migrations:**
    -   From the `/server` directory, run the Sequelize CLI commands to set up your database schema.
    ```bash
    # Make sure you have sequelize-cli installed globally or as a dev dependency
    # npm install -g sequelize-cli
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    ```

##### Option B: MongoDB Backend

1.  **Navigate and Install Dependencies:**
    ```bash
    cd server2
    npm install
    ```
2.  **Database Configuration:**
    -   Open the `server2/index.js` file.
    -   Ensure the MongoDB connection string points to your local database instance. The default is `mongodb://127.0.0.1:27017/waterzilla`.
    ```javascript
    async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/waterzilla');
      console.log("connected");
    }
    ```
3.  **Seed Initial Data (Optional):**
    -   The `/server2` directory contains a `seeder.js` file to populate the database with initial admin data. To run it:
    ```bash
    node seeder.js
    ```

---

## Running the Application

To run WaterZilla, you need to start both the client and your chosen backend server.

1.  **Start the Backend Server** (from `/server` or `/server2` directory):
    ```bash
    npm start
    # Or for development with nodemon
    # nodemon index.js
    ```
    The server will start on `http://localhost:8080`.

2.  **Start the Frontend React App** (from the `/client` directory in a new terminal):
    ```bash
    npm start
    ```
    The application will open automatically in your web browser at `http://localhost:3000`.

---

## Contributing

Contributions are welcome! If you would like to contribute to WaterZilla, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourAmazingFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some amazing feature'`).
5.  Push to the branch (`git push origin feature/YourAmazingFeature`).
6.  Open a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE). Feel free to explore, modify, and distribute WaterZilla according to the terms of the license.

---

## Contact

For any inquiries or feedback, please reach out to:
**Qamar Ul Islam** - qamarislam4496@gmail.com