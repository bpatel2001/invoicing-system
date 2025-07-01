# Invoicing System

This is a full-stack web application for creating and managing invoices, built for the individual project section of the MultiVerse bootcamp. It provides a user-friendly interface to view, create, and delete invoices.

**Live Application:** [https://invoicing-system-1.onrender.com/](https://invoicing-system-1.onrender.com/)

## Features

* **View Invoices:** See a comprehensive list of all invoices with key details at a glance.
* **Create Invoices:** Easily generate new invoices with a simple and intuitive form.
* **Sign Invoices:** Have users sign invoices and it persisting on your end.
* **Delete Invoices:** Remove invoices that are no longer required.
* **Responsive Design:** The application is designed to work seamlessly across different devices and screen sizes.

---

## Tech Stack

This project is built using the following technologies:

* **Frontend:** React
* **Backend:** Spring Boot
* **Database:** H2 (embedded)
* **Build Tool:** Maven

---

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your machine:

* [Node.js and npm](https://nodejs.org/en/download/) (Node Package Manager)
* [Java Development Kit (JDK) 21+](https://www.oracle.com/java/technologies/downloads/#jdk21-windows)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/bpatel2001/invoicing-system.git](https://github.com/bpatel2001/invoicing-system.git)
    cd invoicing-system
    ```

2.  **Run the Frontend (React):**
    Navigate to the `client` directory and install the necessary npm packages. Then, start the development server.
    ```sh
    cd client
    npm install
    npm run dev
    ```
    The React application will be running on `http://localhost:5173`.

3.  **Run the Backend (Spring Boot):**
    Open the project in your favorite IDE (like IntelliJ IDEA or VS Code) and locate the `InvoicingSystemApplication.java` file within the `src/main/java/com/invoicingsystem` directory. Run this file to start the Spring Boot application.

    The backend server will start on `http://localhost:8080`.

---

### Local Development Configuration

**Important:** For the frontend to communicate with your local backend server, you must update the API endpoint.

* Open the file: `src/main/client/api.js`
* Change the `API_BASE` variable to your local server address:
    ```javascript
    export const API_BASE = "http://localhost:8080";
    ```

---

## Wireframe

The application's design was based on the following wireframe, which outlines the core structure and user interface.

![Invoicing System Screenshot](https://github.com/bpatel2001/invoicing-system/blob/main/src/main/resources/WireframeBG.png?raw=true)
