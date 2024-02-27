
# myHommy
#  About

myHommy is a full-stack real estate application designed to facilitate property transactions. It provides a platform for property owners to list their properties for sale or rent and for potential buyers or renters to find and inquire about available properties.
Features

 

- **Node.js Backend:** Utilizes Node.js for the backend server implementation.
- **Pagination:** Implements pagination for efficiently managing large datasets.
- **AWS Integration:** Integrates with AWS services such as AWS S3 for image storage and AWS SES for email communication.
- **MongoDB Database:** Uses MongoDB as the database to store property and user information.
- **React.js Frontend:** Employs React.js for building a dynamic and interactive user interface.
- **Image Gallery:** Provides an image gallery feature for showcasing property images.
- **JWT Authentication:** Implements JSON Web Token (JWT) authentication for secure user authentication.
- **Image Upload:** Allows users to upload property images for listing.
- **Searching Algorithms:** Implements searching algorithms to enable users to search for properties based on various criteria.
- **Google Maps API Integration:** Integrates with Google Maps API for location-based services and property mapping.
- **Google Places API Integration:** Utilizes Google Places API for retrieving location information and nearby amenities.
- **bcrypt.js:** Implements bcrypt.js for secure password hashing.
- **React Context:** Utilizes React Context API for managing global state within the application.
- **Material Bootstrap:** Incorporates Material Bootstrap for styling and UI components.

# Installation

To run this application locally, follow these steps:

Clone the repository to your local machine:

bash

    git clone https://github.com/your-username/myHommy.git

Navigate to the project directory:

bash

   cd myHommy

Install dependencies:

bash

    npm install

Set up environment variables:

Create a .env file in the root directory and configure the following variables:

plaintext

PORT=3000
MONGODB_URI=mongodb://localhost:27017/myhommy
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key

# Run the application:

bash

    npm start

Access the application in your web browser at http://localhost:3000.

# Usage

Once the application is running, users can perform the following actions:

    Property Listing: Owners can list their properties for sale or rent.
    Property Search: Users can search for properties based on location, price range, etc.
    Property Viewing: Users can view property details and images in the image gallery.
    Inquiry: Users can inquire about properties they are interested in.
    Authentication: Users can sign up, log in, and log out using JWT authentication.
    User Dashboard: Authenticated users have access to a dashboard for managing their listings and inquiries.

# Technologies Used

    Node.js
    Express.js
    MongoDB
    React.js
    AWS (S3, SES)
    JSON Web Tokens (JWT)
    bcrypt.js
    Google Maps API
    Google Places API
    Material Bootstrap

