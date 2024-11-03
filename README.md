# Get Me a Chai

**Get Me a Chai** is a crowdfunding platform designed to help creators receive support through direct contributions from fans and followers. Inspired by “Buy Me a Coffee,” it allows users to fund creators through donations, ensuring creators can continue doing what they love with the support of their community.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with GitHub using NextAuth.js
- Payment processing with Razorpay
- Profile management
- MongoDB Atlas for database

## Tech Stack

- Next.js
- MongoDB Atlas
- NextAuth.js
- Razorpay

## Getting Started

### Prerequisites

- Node.js (>= 18.17.0)
- npm

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/get-me-a-chai.git
    cd get-me-a-chai
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env.local` file in the root directory and add the following:

    ```plaintext
    NEXT_PUBLIC_URL=http://localhost:3000
    DB_PASSWORD=your_mongodb_password
    GITHUB_CLIENT_ID=your_local_github_client_id
    GITHUB_CLIENT_SECRET=your_local_github_client_secret
    NEXTAUTH_URL=http://localhost:3000/api/auth
    MONGODB_URI=mongodb+srv://<username>:${DB_PASSWORD}@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    ```

4. Run the development server:

    ```sh
    npm run dev
    ```

    Open http://localhost:3000 with your browser to see the result.

## Environment Variables

The following environment variables need to be set:

- `NEXT_PUBLIC_URL`: The base URL of your application.
- `DB_PASSWORD`: The password for your MongoDB Atlas database.
- `GITHUB_CLIENT_ID`: The client ID for GitHub OAuth.
- `GITHUB_CLIENT_SECRET`: The client secret for GitHub OAuth.
- `NEXTAUTH_URL`: The URL for NextAuth.js authentication.
- `MONGODB_URI`: The connection string for MongoDB Atlas.

## Deployment

### Vercel

Deploy the application to Vercel.

Set the following environment variables in the Vercel dashboard:

- `NEXT_PUBLIC_URL`: https://get-me-a-chai-theta.vercel.app
- `DB_PASSWORD`: your_mongodb_password
- `GITHUB_CLIENT_ID`: your_production_github_client_id
- `GITHUB_CLIENT_SECRET`: your_production_github_client_secret
- `NEXTAUTH_URL`: https://get-me-a-chai-theta.vercel.app/api/auth
- `MONGODB_URI`: mongodb+srv://<username>:${DB_PASSWORD}@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

Visit our website: [Get Me a Chai](https://get-me-a-chai-theta.vercel.app/)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
