# Simple Node.js E-commerce Application 🛒

A basic e-commerce web application built using Node.js, Express, EJS, and MongoDB. This project serves as a learning example demonstrating fundamental web development concepts within the Node.js ecosystem.

[![Node.js CI](https://github.com/<Consultantsrihari>/<simple-node-ecommerce>/actions/workflows/ci.yml/badge.svg)](https://github.com/<Consultantsrihari>/<simple-node-ecommerce>/actions/workflows/ci.yml) <!-- Optional: Replace with your actual repo path after pushing -->

## Features ✨

*   **User Authentication:** Signup, Login, Logout functionality.
*   **Password Security:** Passwords hashed using `bcryptjs`.
*   **Session Management:** User sessions maintained using `express-session` and stored in MongoDB via `connect-mongodb-session`.
*   **CSRF Protection:** Basic protection against Cross-Site Request Forgery using `csurf`.
*   **Product Catalog:** Display products from the database (list and detail views).
*   **Shopping Cart:** Add products to a cart, view the cart, and remove items. Cart data is associated with the user.
*   **MVC Pattern:** Code organized into Models, Views, and Controllers.
*   **Templating:** Dynamic HTML generation using EJS.
*   **Database:** MongoDB integration using Mongoose ODM.
*   **Environment Variables:** Configuration managed via `.env` file.
*   **Basic Error Handling:** Custom 404 and 500 error pages.
*   **Docker Support:** Includes `Dockerfile` and `docker-compose.yml` for easy local setup and containerization.
*   **Basic CI:** Simple GitHub Actions workflow example (`.github/workflows/ci.yml`).

## Technology Stack 🛠️

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **ODM:** Mongoose
*   **Templating Engine:** EJS
*   **Authentication:** `bcryptjs`, `express-session`, `connect-mongodb-session`
*   **Security:** `csurf`
*   **Environment Variables:** `dotenv`
*   **Development:** `nodemon`
*   **Containerization:** Docker, Docker Compose

## Prerequisites 📋

*   [Node.js](https://nodejs.org/) (v16.x or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   [MongoDB](https://www.mongodb.com/try/download/community) (either installed locally or a cloud instance like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
*   [Git](https://git-scm.com/)
*   [Docker](https://www.docker.com/products/docker-desktop/) & [Docker Compose](https://docs.docker.com/compose/install/) (Optional, for running via Docker)

## Installation & Setup 🚀

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/<YOUR_GITHUB_USERNAME>/simple-node-ecommerce.git
    cd simple-node-ecommerce
    ```
    *(Replace `<YOUR_GITHUB_USERNAME>` with your actual username)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create Environment File:**
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```

4.  **Configure Environment Variables (`.env`):**
    Open the `.env` file and set the following variables:
    *   `MONGODB_URI`: Your MongoDB connection string.
        *   *Local Example:* `mongodb://localhost:27017/shop`
        *   *Atlas Example:* `mongodb+srv://<user>:<password>@<cluster-url>/shop?retryWrites=true&w=majority` (Replace placeholders)
    *   `SESSION_SECRET`: A long, random, secret string used to sign the session ID cookie. Keep this private!
    *   `PORT`: (Optional) The port the application will run on (defaults to 3000 if not set in `app.js`).

## Running the Application 🏃‍♂️

### 1. Development Mode (with Nodemon)

This mode automatically restarts the server when file changes are detected.

```bash
npm run dev
Use code with caution.
Markdown
2. Production Mode
This runs the application using node.

npm start
Use code with caution.
Bash
Access the application in your browser at http://localhost:3000 (or the port you specified).

3. Using Docker Compose (Recommended for isolated local environment)
This method runs both the Node.js application and a MongoDB database instance in separate Docker containers.

Ensure Docker Desktop is running.

Make sure you have configured your .env file. The docker-compose.yml file is set up to use the .env file, but it specifically expects the application inside the container to connect to mongodb://mongo:27017/shop. Your local .env file's MONGODB_URI will be overridden by the environment section in docker-compose.yml for the app service.

Build and start the containers:

docker-compose up --build
Use code with caution.
Bash
(Use -d flag to run in detached mode: docker-compose up --build -d)

Access the application: http://localhost:3000

To stop the containers:

docker-compose down
Use code with caution.
Bash
(Add -v flag to remove the data volume: docker-compose down -v)

Project Structure 📁
simple-node-ecommerce/
├── .github/             # GitHub Actions workflows
├── config/              # Configuration files (e.g., database - optional)
├── controllers/         # Route handlers (logic)
├── middleware/          # Custom Express middleware
├── models/              # Mongoose data models/schemas
├── public/              # Static assets (CSS, images)
├── routes/              # Express route definitions
├── views/               # EJS templates
│   ├── includes/        # Reusable view partials
│   ├── auth/            # Authentication-related views
│   └── shop/            # Shop-related views
├── .env.example         # Example environment variables
├── .gitignore           # Files/folders ignored by Git
├── Dockerfile           # Instructions to build the Node.js app image
├── docker-compose.yml   # Define services for Docker (app, db)
├── app.js               # Main application entry point
├── package.json         # Project metadata and dependencies
└── package-lock.json    # Exact dependency versions
Use code with caution.
TODO / Potential Improvements 💡
Implement Order Creation and History.

Add Product Management (CRUD) for Admins.

Implement User Roles (Admin/Customer).

Add Input Validation (express-validator).

Integrate a Payment Gateway (e.g., Stripe).

Implement Password Reset Functionality.

Add Unit and Integration Tests.

Improve UI/UX and Styling.

Implement File Uploads for Product Images.

Add proper logging.

License 📄
This project is open-source and available under the MIT License. (You might want to add a LICENSE file with the MIT license text).

**Remember to:**

1.  Replace `<Consultantsrihari>/<simple-node-ecommerce>` in the CI badge URL if you decide to use it.
2.  Consider adding a `LICENSE` file (e.g., containing the standard MIT License text) to your repository root.
