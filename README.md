# BagGO Store
### Project Description

BagGO Store is small a full-stack application designed to provide a seamless shopping experience for purchasing bags. The frontend is built using React, while the backend leverages the power of Express and Firebase. This project integrates modern technologies to deliver a robust and scalable solution. Key features include user authentication, data storage in Firestore. The main highlight of this project is the integration with Stripe for handling billing and payments.

Users can sign up with an email and password. The application allows users to browse products, add items to their cart, and proceed to checkout with secure payment processing through Stripe. Additionally, users can manage their saved payment methods.

### Tech Stack

- **Stripe**: For integrating Stripe's payment processing capabilities, handling billing and payment processing.
- **React, React Router**: For building user interfaces and handling routing in the App.
- **Formik**: For building forms in React.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Firebase**: for authentication used Firebase Auth, used Firestore for database.
- **Axios**: For making HTTP requests.
- **Bulma, Sass**: For writing more maintainable and scalable styles.


## Getting Started

1. **Clone the repository:**

  ```bash
  git clone https://github.com/marynadevk/stripe-react-bagStore.git
  ```

2. **Install dependencies for server and client projects, run:**

  ```sh
  cd frontend/
  npm ci
  cd ../
  cd backend/
  npm ci
  ```

3. **Create a .env.local files based on the provided .env.local.example**

4. **To start the development servers, run:**

  ```sh
  *frontend*
  npm run dev

  *backend*
  npm run start:dev
  ```

Dive into the code, explore the features, and start building your own social network today.

Happy coding! :)

