# blogBloom

blogBloom is a full-stack blog application created using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to register, login, create, edit, and view blogs with rich text content and embedded images.

## Features

- User Authentication: Register and login securely using bcrypt for password encryption and JSON Web Tokens (JWT) for token creation and verification.
- Blog Listing: View a list of blogs, limited to 20, with newer ones displayed at the top.
- Blog Creation and Editing: Create your own blogs with text content and embedded images. Edit your existing blogs.
- Frontend Design: Designed with React for a modern and responsive user interface.
- Styling: Styled using Tailwind CSS for a clean and aesthetic look.
- Rich-Text Editing: Utilizes React Quill as the rich-text editor for an enhanced blogging experience.

## Technologies Used

### Frontend

- React: JavaScript library for building user interfaces.
- Tailwind CSS: Utility-first CSS framework for styling.
- React Quill: A powerful and customizable rich-text editor for React.

### Backend

- Express.js: Web application framework for Node.js, used for routing.
- Bcrypt: Library for password hashing and encryption.
- Cookie Parser: Middleware for parsing Cookie headers.
- CORS: Middleware for enabling Cross-Origin Resource Sharing.
- JSON Web Token: For generating and verifying tokens for user authentication.
- Multer: Middleware for handling multipart/form-data (used for image uploads).
- Mongoose: MongoDB Object Data Modeling (ODM) library for Node.js.
- MongoDB: NoSQL database used for storing blog data.

## Screenshots 

### Before Login

#### Home page
![Screenshot 2023-11-19 005224](https://github.com/karthiikJR/BlogBloom/assets/115890844/107cc9ec-fd4d-4ef4-942a-d055a3d6f8ea)


#### Post Page
![Screenshot 2023-11-19 005320](https://github.com/karthiikJR/BlogBloom/assets/115890844/e2982edc-eff4-4a3a-9e65-02f2a64bb360)


#### Login / Register
![Screenshot 2023-11-19 005229](https://github.com/karthiikJR/BlogBloom/assets/115890844/348e2bba-a7de-43e2-b3c8-b0b0af7c4376)
![Screenshot 2023-11-19 005235](https://github.com/karthiikJR/BlogBloom/assets/115890844/62479b38-e344-41b6-ab83-6f2a2b0e1534)

### After Login

![Screenshot 2023-11-19 005309](https://github.com/karthiikJR/BlogBloom/assets/115890844/6841c3ee-7be4-47f3-8152-a2aa59c1f8c4)
![Screenshot 2023-11-19 005334](https://github.com/karthiikJR/BlogBloom/assets/115890844/00c42238-6087-4b5d-9977-8a54b0049baa)
![Screenshot 2023-11-19 005356](https://github.com/karthiikJR/BlogBloom/assets/115890844/b46e5cfe-6bda-4b86-a341-b2d21f0c210e)


## How to Install

### Client (Frontend)

1. Open the `client` folder in your terminal.
2. Run `npm install` to install the required dependencies.

### Server (Backend)

1. Open the `server` folder in your terminal.
2. Create a folder named "uploads" for storing images.
3. Run `npm install` to install the required dependencies.

## How to Run

1. In the `client` folder, run `npm run dev` to start the frontend server.
2. In the `server` folder, run `npm run dev` to start the backend server.

Visit `http://localhost:3000` in your browser to access the blogBloom application.

Happy Blogging!
