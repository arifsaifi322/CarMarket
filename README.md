# CarMarket 🏪

A full-stack MERN (MongoDB, Express, Node.js) application for an E-Commerce Spare Parts Marketplace. Users can browse spare parts listings, create new products, manage their inventory, leave reviews, and place orders with integrated tax calculations.

## 🌟 Features

### User Management
- **User Authentication**: Sign up and login with passport.js
- **Session Management**: Secure sessions with MongoDB store
- **Password Security**: Hashed passwords using passport-local
- **User Profiles**: Track user listings and bookings

### Product/Listing Management
- **Create Listings**: Sellers can post new spare parts with images and pricing
- **Edit Listings**: Modify existing product listings with image re-upload capability
- **Delete Listings**: Remove products from the marketplace
- **View Listings**: Browse all available spare parts with detailed information
- **Image Upload**: Cloudinary integration for product image storage
- **Product Details**: Title, description, price, and quantity management

### Order System
- **Place Orders**: Browse and order spare parts by quantity
- **Delivery Address**: Collect delivery address during order placement
- **Order Quantity**: Select desired quantity of products
- **My Orders**: View all personal orders in a dedicated dashboard
- **Cancel Orders**: Cancel orders with one-click confirmation
- **Order Management**: Track all orders with creation dates and prices

### Reviews & Ratings
- **Add Reviews**: Users can leave reviews for products they've ordered
- **Star Ratings**: 5-star rating system for products
- **View Reviews**: See community reviews from other users on product detail pages
- **Delete Reviews**: Users can delete their own reviews

### Additional Features
- **Tax Display**: Real-time GST (18%) calculation and optional display
- **Flash Messages**: User-friendly notifications for all actions
- **Responsive Design**: Bootstrap 5 for mobile-friendly interface
- **Data Validation**: Server-side validation using Joi
- **Error Handling**: Comprehensive error handling and middleware
- **Filters**: Browse spare parts by category (New, Old, Dummy)

## 🛠️ Tech Stack

### Frontend
- **HTML5 & EJS**: Server-side templating engine
- **CSS3 & Bootstrap 5**: Responsive styling with custom design (color palette: #79AE6F)
- **JavaScript**: Interactive functionality for UI interactions
- **Font Awesome**: Icon library for visual elements

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data persistence
- **Mongoose**: ODM (Object Data Modeling) for MongoDB

### Authentication & Storage
- **Passport.js**: Authentication middleware with local strategy
- **express-session**: Session management for user authentication
- **connect-mongo**: MongoDB session store
- **Cloudinary**: Cloud image storage for product images
- **Multer**: File upload handling middleware

### Validation & Utilities
- **Joi**: Schema validation for form data
- **method-override**: HTTP method override (PATCH, DELETE support)
- **ejs-mate**: EJS template engine with layout support
- **connect-flash**: Flash message notifications
- **dotenv**: Environment variables management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account for image storage
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/arifsaifi322/carMarket.git
cd carMarket
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
NODE_ENV=production
ATLAS_DB=mongodb+srv://username:password@cluster.mongodb.net/carMarket
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
# or for development with auto-reload
nodemon main.js
```

The application will run on **http://localhost:8080**

## 📁 Project Structure

```
carMarket/
├── controllers/          # Request handlers for business logic
│   ├── listing.js       # Product listing operations
│   ├── bookings.js      # Order/booking logic
│   ├── reviews.js       # Review operations
│   └── user.js          # User authentication & profile
├── models/              # Database schemas & data models
│   ├── lists.js         # Product listing schema
│   ├── bookings.js      # Order/booking schema
│   ├── reviews.js       # Review schema
│   ├── user.js          # User model
│   ├── data.js          # Sample data initialization
│   ├── wrapAsync.js     # Error wrapper utility
│   └── init.js          # Database initialization
├── routes/              # API route definitions
│   ├── listing.js       # Product routes (CRUD)
│   ├── bookings.js      # Order routes
│   ├── reviews.js       # Review routes
│   └── user.js          # Authentication routes
├── views/               # EJS template files
│   ├── listings/        # Product pages
│   │   ├── home.ejs     # Product listing page
│   │   ├── show.ejs     # Product detail page
│   │   ├── new.ejs      # Create product form
│   │   ├── edit.ejs     # Edit product form
│   │   ├── book.ejs     # Order form
│   │   └── layout/      # Layout templates
│   ├── users/           # User authentication pages
│   │   ├── login.ejs    # Login page
│   │   ├── signup.ejs   # Registration page
│   │   └── mybookings.ejs # Orders dashboard
│   └── includes/        # Reusable components
│       ├── navbar.ejs   # Navigation bar
│       ├── footer.ejs   # Footer
│       └── flash.ejs    # Flash messages
├── public/              # Static files
│   ├── css/
│   │   ├── styles.css   # Main stylesheet
│   │   └── rating.css   # Star rating styles
│   └── js/
│       └── script.js    # Client-side JavaScript
├── middleware.js        # Custom middleware (authentication, validation)
├── schema.js            # Joi validation schemas
├── cloudConfig.js       # Cloudinary cloud storage configuration
├── main.js              # Application entry point
├── package.json         # Project dependencies
├── .env                 # Environment variables (not in repo)
└── README.md            # Project documentation
```

## 🔑 Key Endpoints

### Products/Listings
- `GET /home` - View all spare parts listings
- `GET /home/:id` - View product detail page
- `GET /home/new/newform` - Create new product form
- `POST /home` - Create new product
- `GET /home/edit/:id` - Edit product form
- `PATCH /home/edit/:id` - Update product
- `DELETE /home/delete/:id` - Delete product

### Orders/Bookings
- `GET /home/:id/book` - Order/booking form
- `POST /home/:id/book` - Create order
- `GET /mybookings` - View user's orders
- `DELETE /booking/:id/cancel` - Cancel order

### Reviews
- `POST /home/:id/review` - Add product review
- `DELETE /home/:id/review/:reviewId` - Delete review

### Authentication
- `GET /signup` - Sign up page
- `POST /signup` - Register new user
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## 🎨 Features in Detail

### Tax Calculation
- Base product price clearly displayed
- Option to toggle display of prices with included 18% GST
- Real-time calculation and smooth animation for showing/hiding tax details
- Transparent tax breakdown in order summary

### Order Process
1. User browses and selects a spare part from the catalog
2. Clicks "Order" button on the product detail page
3. Fills in personal information (name, email, phone)
4. Enters delivery address
5. Specifies quantity required
6. Reviews order summary with tax details
7. Completes order with confirmation message
8. Can view order in "My Orders" dashboard

### Product Listing Features
- Add new products with title, description, price, quantity, and image
- Edit existing product information
- Delete products from inventory
- Upload images via Cloudinary (cloud storage)
- Professional product cards with images and pricing
- Category filters (New Spare Parts, Old Spare Parts, Dummy Spare Parts)

### Review & Rating System
- Only logged-in users who have ordered can leave reviews
- 5-star rating system for products
- Detailed text reviews from customers
- Review author username displayed
- Users can delete only their own reviews
- Reviews publicly visible on product detail pages
- Helps build product credibility and customer trust

### Order Management
- Complete order history in user dashboard
- View order details (product, quantity, price, date)
- Cancel orders with one-click confirmation
- Order status tracking with timestamps
- Secure order confirmation with flash messages

## 🔐 Security Features

- **Password Security**: Hashing with passport-local strategy
- **Session-based Authentication**: Secure user sessions with MongoDB store
- **Authorization Checks**: Protected routes requiring authentication
- **Owner Verification**: Users can only edit/delete their own products
- **Data Validation**: Input validation with Joi schema validation
- **CSRF Protection**: Ready for CSRF protection implementation
- **Secure Environment**: Sensitive data managed via environment variables
- **Image Security**: Secure image uploads through Cloudinary

## 📦 Deployment

This application is ready to deploy to:
- **Heroku**: With MongoDB Atlas connection
- **Render**: With MongoDB Atlas database
- **Vercel**: (Backend only with serverless functions)
- **AWS EC2**: With RDS or MongoDB Atlas
- **DigitalOcean**: With MongoDB hosting

### Deployment Checklist
- Set NODE_ENV to 'production'
- Configure MongoDB Atlas cluster
- Set up Cloudinary account for image storage
- Generate secure session secret
- Configure environment variables on hosting platform
- Ensure HTTPS is enabled

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeatureName`)
3. Commit your changes (`git commit -m 'Add YourFeatureName'`)
4. Push to the branch (`git push origin feature/YourFeatureName`)
5. Open a Pull Request with detailed description

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

Created as a full-stack MERN project to demonstrate web development capabilities.

## 🙋 Support

For support, open an issue in the repository or contact the development team.

## 🎯 Future Enhancements

- [ ] Payment integration (Stripe/Razorpay)
- [ ] Email notifications for orders
- [ ] Wishlist/favorites feature
- [ ] Advanced search and filtering
- [ ] User messaging system
- [ ] Admin dashboard for analytics
- [ ] Inventory management system
- [ ] Order tracking and notifications
- [ ] Social media login (Google, Facebook)
- [ ] Multi-language support
- [ ] Mobile responsive improvements
- [ ] Product recommendations engine
- [ ] Bulk order discounts
- [ ] Return/refund management
- [ ] Seller dashboard and analytics

## 📊 Database Schema Overview

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}
```

### Product/Listing Model
```javascript
{
  title: String,
  description: String,
  price: Number,
  quantity: Number,
  image: { filename, url },
  reviews: [ObjectId],
  owner: ObjectId,
  createdAt: Date
}
```

### Booking/Order Model
```javascript
{
  listing: ObjectId,
  user: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  quantity: Number,
  address: String,
  totalPrice: Number,
  createdAt: Date
}
```

### Review Model
```javascript
{
  comment: String,
  rating: Number (1-5),
  author: ObjectId,
  listing: ObjectId,
  createdAt: Date
}
```

## 🎨 UI/UX Features

- **Color Palette**: Primary color #79AE6F (green)
- **Responsive Design**: Mobile, tablet, and desktop views
- **Bootstrap 5**: Modern and clean UI framework
- **Font Awesome Icons**: Professional UI elements
- **Flash Messages**: User feedback for all actions
- **Form Validation**: Real-time and server-side validation
- **Smooth Animations**: CSS transitions for better UX

---

**Made with ❤️ CarMarket Team**