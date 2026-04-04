# WonderLust 🏠

A full-stack MERN (MongoDB, Express, React, Node.js) application that replicates the core features of Airbnb. Users can explore listings, post their own properties, leave reviews, and book accommodations with real-time tax calculation.

## 🌟 Features

### User Management
- **User Authentication**: Sign up and login with passport.js
- **Session Management**: Secure sessions with MongoDB store
- **Password Security**: Hashed passwords using passport-local

### Listing Management
- **Create Listings**: Users can post new property listings with images
- **Edit Listings**: Modify existing listings with image re-upload
- **Delete Listings**: Remove listings from the platform
- **View Listings**: Browse all available properties with detailed information
- **Image Upload**: Cloudinary integration for property image storage

### Booking System
- **Book Properties**: Reserve properties by selecting check-in/check-out dates
- **Guest Details**: Collect user information during booking
- **Price Calculation**: Dynamic pricing based on number of nights
- **Tax Display**: Real-time GST (18%) calculation and display
- **My Bookings**: View all personal bookings in a dashboard
- **Cancel Bookings**: Cancel reservations with confirmation

### Reviews & Ratings
- **Add Reviews**: Users can leave reviews on properties they've booked
- **Star Ratings**: 5-star rating system
- **View Reviews**: See reviews from other users on listing detail pages
- **Delete Reviews**: Users can delete their own reviews

### Additional Features
- **Tax Toggle**: Display prices with/without 18% GST
- **Flash Messages**: User-friendly notifications for actions
- **Responsive Design**: Bootstrap 5 for mobile-friendly interface
- **Data Validation**: Server-side validation using Joi
- **Error Handling**: Comprehensive error handling and middleware

## 🛠️ Tech Stack

### Frontend
- **HTML5 & EJS**: Templating engine
- **CSS3 & Bootstrap 5**: Responsive styling
- **JavaScript**: Interactive functionality
- **Font Awesome**: Icons

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB

### Authentication & Storage
- **Passport.js**: Authentication middleware
- **express-session**: Session management
- **connect-mongo**: MongoDB session store
- **Cloudinary**: Cloud image storage
- **Multer**: File upload handling

### Validation & Utilities
- **Joi**: Schema validation
- **method-override**: HTTP method override
- **ejs-mate**: EJS template engine layout support
- **connect-flash**: Flash messages
- **dotenv**: Environment variables

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account for image storage
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/wonderlust.git
cd wonderlust
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
NODE_ENV=production
ATLAS_DB=mongodb+srv://username:password@cluster.mongodb.net/wonderlust
SECRET=your_session_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

### 4. Start MongoDB
Ensure MongoDB is running (locally or using MongoDB Atlas)

### 5. Run the Application
```bash
npm start
# or for development
nodemon main.js
```

The application will run on **http://localhost:8080**

## 📁 Project Structure

```
wonderlust/
├── controllers/          # Request handlers
│   ├── listing.js       # Listing logic
│   ├── bookings.js      # Booking logic
│   ├── reviews.js       # Review logic
│   └── user.js          # User authentication
├── models/              # Database schemas
│   ├── lists.js         # Property listings
│   ├── bookings.js      # Bookings collection
│   ├── reviews.js       # Reviews collection
│   ├── user.js          # User model
│   └── wrapAsync.js     # Error wrapper
├── routes/              # URL routes
│   ├── listing.js       # Listing routes
│   ├── bookings.js      # Booking routes
│   ├── reviews.js       # Review routes
│   └── user.js          # Auth routes
├── views/               # EJS templates
│   ├── listings/        # Listing pages
│   ├── users/           # Auth pages
│   └── includes/        # Reusable components
├── public/              # Static files
│   ├── css/             # Stylesheets
│   └── js/              # Client-side scripts
├── middleware.js        # Custom middleware
├── schema.js            # Joi validation schemas
├── cloudConfig.js       # Cloudinary configuration
├── main.js              # Application entry point
└── package.json         # Dependencies
```

## 🔑 Key Endpoints

### Listings
- `GET /home` - View all listings
- `GET /home/:id` - View listing details
- `GET /home/new/newform` - New listing form
- `POST /home` - Create listing
- `GET /home/edit/:id` - Edit listing form
- `PATCH /home/edit/:id` - Update listing
- `DELETE /home/delete/:id` - Delete listing

### Bookings
- `GET /home/:id/book` - Booking form
- `POST /home/:id/book` - Create booking
- `GET /mybookings` - View user bookings
- `DELETE /booking/:id/cancel` - Cancel booking

### Reviews
- `POST /home/:id/review` - Add review
- `DELETE /home/:id/review/:reviewId` - Delete review

### Authentication
- `GET /signup` - Sign up page
- `POST /signup` - Register user
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## 🎨 Features in Detail

### Tax Calculation
- Base price shown for all listings
- Toggle button to display prices with 18% GST included
- Smooth animation for showing/hiding tax details
- Real-time calculation during booking

### Booking Process
1. User clicks "Book Now" on a listing
2. Fills in personal details (name, email, phone)
3. Selects check-in and check-out dates
4. Specifies number of guests
5. Can add special requests
6. System calculates total price (nights × rate)
7. Booking confirmation with flash message
8. Redirect to home page

### Review System
- Only logged-in users can leave reviews
- Star rating system (1-5 stars)
- Text comments support
- Review author username displayed
- Users can only delete their own reviews
- Reviews appear on listing detail pages

## 🔐 Security Features

- Password hashing with passport-local
- Session-based authentication
- CSRF protection ready
- Input validation with Joi
- Authorization checks on protected routes
- Owner verification for edit/delete operations

## 📦 Deployment

This application is ready to deploy to:
- **Heroku**: With MongoDB Atlas
- **Render**: With MongoDB Atlas
- **Vercel**: (Backend only with serverless functions)
- **AWS**: (EC2, RDS for database)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created as a MERN stack project to demonstrate full-stack web development capabilities.

## 🙋 Support

For support, email your-email@example.com or open an issue in the repository.

## 🎯 Future Enhancements

- [ ] Payment integration (Stripe/Razorpay)
- [ ] Email notifications
- [ ] Wishlist feature
- [ ] Advanced search filters
- [ ] Messaging between users
- [ ] Admin dashboard
- [ ] Analytics and insights
- [ ] Social media login
- [ ] Multi-language support
- [ ] Mobile app version

---

**Made with ❤️ by WonderLust Team**