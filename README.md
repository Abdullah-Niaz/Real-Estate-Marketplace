
# MERN Real Estate Marketplace

A modern, full-stack real estate marketplace built from scratch using the MERN stack (MongoDB, Express.js, React, Node.js). This application provides a comprehensive platform for users to list, browse, and search for properties with advanced features and a seamless user experience.

-----

## ✨ Key Features

  * **Advanced Authentication**: Secure user sign-up and sign-in functionality using JSON Web Tokens (JWT), with integrated Google OAuth for quick access.
  * **Full CRUD Operations**: Users can create, read, update, and delete their own property listings.
  * **User Profile Management**: A dedicated profile page where users can update their information, view their listings, delete their account, or sign out.
  * **Dynamic Image Uploads**: Seamlessly upload multiple images for each property listing with storage handled by Firebase.
  * **Advanced Search & Filtering**: A powerful search functionality that allows users to filter listings based on type (rent/sale), amenities (parking, furnished), and sort by price or creation date.
  * **Contact Landlord**: An integrated feature for potential buyers or renters to contact the property owner directly via email.
  * **Responsive Design**: A clean and modern UI built with Tailwind CSS that looks great on all devices.
  * **State Management**: Efficient and predictable state management using Redux Toolkit and Redux Persist.

-----

## 🛠️ Tech Stack

  * **Frontend**: React, Redux Toolkit, React Router, Tailwind CSS
  * **Backend**: Node.js, Express.js
  * **Database**: MongoDB
  * **Authentication**: JSON Web Tokens (JWT), bcryptjs, Google OAuth
  * **Image Storage**: Firebase Storage

-----

## 🚀 Live Demo & Source Code

  * **Source Code**: [GitHub Repository](https://github.com/Abdullah-Niaz/Real-Estate-Marketplace)
  * **Live Demo**: Check the GitHub repository for a live demo link.

-----

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  * Node.js and npm (or yarn) installed
  * MongoDB instance (local or cloud-based like MongoDB Atlas)
  * Firebase account for image storage and Google OAuth

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/Abdullah-Niaz/Real-Estate-Marketplace
    cd mern-estate
    ```

2.  **Install backend dependencies:**
    Navigate to the `api` directory and install the required npm packages.

    ```sh
    cd api
    npm install
    ```

3.  **Install frontend dependencies:**
    Navigate to the `client` directory and install the required npm packages.

    ```sh
    cd ../client
    npm install
    ```

4.  **Set up Environment Variables:**
    In the `api` directory, create a `.env` file. Copy the contents of `.env.example` (if available) or add the following variables. **Do not share your `.env` file.**

    ```env
    MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
    JWT_SECRET=<YOUR_JWT_SECRET>
    ```

    In the `client` directory, create a `.env` file and add your Firebase configuration details:

    ```env
    VITE_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
    ```

5.  **Run the application:**

      * To start the backend server, run the following command from the `api` directory:

        ```sh
        npm run dev
        ```

        The server will start on `http://localhost:3000`.

      * To start the frontend development server, run the following command from the `client` directory:

        ```sh
        npm run dev
        ```

        The React app will be available at `http://localhost:5173`.

-----

## 🚢 Deployment

This application is configured for easy deployment on platforms like **Render**.

1.  Push your code to a GitHub repository.
2.  On Render, create a new "Web Service".
3.  Connect your GitHub repository.
4.  Configure the build and start commands:
      * **Root Directory**: `api`
      * **Build Command**: `npm install`
      * **Start Command**: `npm start`
5.  Add your environment variables from the `.env` file to the Render dashboard.
6.  For the client, you can deploy it as a static site.
