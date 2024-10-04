# **Site Dashboard Management System**

A dashboard management system to track, add, and view project sites. This application is built using **React** and **Next.js** for the frontend, and it interacts with the backend to fetch and save project details for a seamless user experience.

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Setup and Installation](#setup-and-installation)
5. [API Endpoints](#api-endpoints)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

---

## **Project Overview**

The **Site Dashboard Management System** is a web-based application that allows users to create, view, and manage project sites. Users can add new project sites by providing project name, description, and location. The dashboard displays these projects in a card-based layout. Each project can be clicked to view more details.

## **Features**

- 📝 **Add New Projects**: Users can add new projects with name, description, and location using a modal form.
- 🗃️ **View Existing Projects**: Displays a list of all added projects in a clean, card-based format.
- 🔄 **Dynamic Loading**: The app dynamically fetches and displays the projects associated with the logged-in user.
- 💡 **Skeleton Loading Animation**: Shows a skeleton loader while data is being fetched, providing better UX.
- 🔒 **Secure Access**: Projects are fetched based on the logged-in user's email, ensuring data privacy.

## **Tech Stack**

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Libraries**: Axios for HTTP requests, React Hook Form for form handling
- **Styling**: Tailwind CSS for modern and responsive design
- **Authentication**: JWT for secure user authentication

## **Setup and Installation**

### Prerequisites

- Node.js (>=14.0.0)
- npm or yarn
- MongoDB instance (local or cloud-based)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/friedavocadoes/SP.git/
   cd SP
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Setup environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```bash
   MONGODB_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   The application should now be running at [http://localhost:3000](http://localhost:3000).

### **API Endpoints**

The application interacts with several backend endpoints to fetch, save, and update project data. Below is a list of the API routes:

- **User Authentication**
  - `GET /api/users/me`: Get current user information based on JWT token.
- **Project Management**
  - `POST /api/project/fetch`: Fetch all projects for the logged-in user.
  - `POST /api/project/save`: Save a new project for the user.

### **Usage**

1. **Login to your account**: The app authenticates using JWT tokens. Once logged in, your projects will be fetched and displayed.
2. **Add a new project**: Click on the 'Add New Project' card to open a modal form. Fill in the project details and click 'Add Project' to save.
3. **View Projects**: The dashboard displays your projects as cards. Click on any project card to view more details.

### **Contributing**

Contributions are welcome! If you find a bug or have a feature request, please create an issue on GitHub. Feel free to fork the repository and submit a pull request with your changes.

### **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

If you have any questions or need further assistance, feel free to reach out. Happy coding! ✨

---
