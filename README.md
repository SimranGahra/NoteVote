# NoteVote

NoteVote is a web-based application that allows users to create, vote, and manage posts. The project follows the Model-View-Controller (MVC) architecture, ensuring modular and maintainable code. The application is built using Node.js, Express.js, MongoDB, and EJS for templating.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Core Functionalities](#core-functionalities)
- [Development Insights](#development-insights)
- [Contributing](#contributing)
- [License](#license)
- [Credits & Acknowledgments](#credits--acknowledgments)

## Features

- User authentication (login, registration, logout) using Passport.js.
- Create, upvote, and downvote posts.
- Secure session management with `express-session`.
- Modular design using MVC (Model-View-Controller) architecture for scalability and maintainability.
- Responsive frontend design by using **Bootstrap** and custom HTML and CSS.

## Technologies Used

- **Frontend:** Bootstrap, HTML5, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Templating Engine:** EJS
- **Authentication:** Passport.js
- **Session Management:** express-session

## Folder Structure

```
NoteVote/
├── Controller/       # Handles application logic
│   ├── authController.js
│   ├── postController.js
├── Model/            # Defines database schemas
│   ├── userModel.js
│   ├── postModel.js
├── Public/           # Static files (CSS, images)
│   ├── css/
│       ├── styles.css
├── Views/            # Frontend templates
│   ├── index.ejs
│   ├── note-vote.ejs
│   ├── layouts/
│   │   ├── footer.ejs
│   │   ├── header.ejs
│   ├── partials/
│       ├── note-render.ejs
├── .env              # Environment variables (e.g., secrets, database URIs)
├── server.js         # Entry point for the application
├── package.json      # Project dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm (Node Package Manager)

### Steps

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd NoteVote
   ```

2. **Install dependencies:**

   Install the required Node.js packages.

   ```bash
   npm install
   ```

3. **Set up the environment variables:**

   - Create a `.env` file in the root directory with the following:
     ```env
     SECRET=<your-session-secret>
     MONGO_URI=mongodb://localhost:27017/NoteDB
     PORT=3000
     ```

4. **Start the MongoDB server:**

   Ensure MongoDB is running on `mongodb://localhost:27017/NoteDB`.

5. **Run the application:**

   ```bash
   npm start
   ```

6. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

## Core Functionalities

1. **User Authentication:**
   - Allows secure login, registration, and session management.
   - Ensures data security with hashed passwords and session tokens.

2. **Post Interaction:**
   - Users can create, upvote, and downvote posts.
   - Provides a dashboard to view and manage posts effectively.

3. **Responsive Design:**
   - Features an intuitive interface that adapts across devices using Bootstrap.

## Development Insights

- **Project Design:** Built with modularity in mind using MVC architecture to separate concerns and enhance maintainability.
- **Database Integration:** Utilizes MongoDB for a flexible and scalable NoSQL database solution.
- **Session Management:** Incorporates `express-session` to manage user sessions and ensure seamless transitions across pages.
- **Templating:** EJS templates simplify the rendering of dynamic content, ensuring a responsive and interactive user experience.

## Contributing

We welcome all contributions to make NoteVote even better! Whether you are fixing a bug, adding new features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the repository:**
   - Visit the repository page and click the "Fork" button to create a copy of the project under your account.

2. **Set up your local environment:**
   - Clone your fork and set up the project as described in the [Setup Instructions](#setup-instructions).

3. **Create a feature branch:**
   - Use a descriptive name for your branch.
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make changes:**
   - Ensure your code follows the existing style and passes all tests.

5. **Commit your changes:**
   - Use a clear and concise commit message to describe your work.
   ```bash
   git commit -m "Describe your changes"
   ```

6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Submit a Pull Request:**
   - Navigate to the original repository and create a pull request from your branch. Provide a detailed description of your changes and link any related issues.

### Guidelines

- **Code Style:** Maintain consistency with the project's coding style and conventions.
- **Testing:** Ensure your changes are thoroughly tested.
- **Documentation:** Update relevant documentation if your changes introduce new functionality or modify existing behavior.

We look forward to your contributions and thank you for helping to improve NoteVote!

## License

This project is licensed under the [MIT License](./LICENSE). Feel free to use, modify, and distribute the code under the terms of the license.

---

## Credits & Acknowledgments

- **Developer**: Simran Gahra
- Project developed as part of the **ENSE 374 Software Management Lab**.
- Special thanks to the **University of Regina ENSE Labs** for guidance and resources.

---