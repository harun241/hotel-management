Hotel management app 

Purpose
MyBookings App is a React-based booking management system that allows users to securely view, update, and cancel their room bookings. Users can also submit reviews for rooms they have booked. The app supports user authentication, real-time updates, and provides a seamless user experience with toast notifications and responsive design.

Live-url
https://hotel-management-5b87e.web.app

Key Features
User Authentication: Secure login with JWT tokens.

Booking Management: View bookings with detailed info including room details, booking date, and user info.

Update Booking Dates: Users can change their booking dates with validation and feedback.

Cancel Bookings: Cancel bookings with a policy that requires at least 1-day advance notice.

Reviews: Submit reviews with ratings and comments for rooms the user has booked.

Responsive UI: Built with Tailwind CSS for a clean and mobile-friendly interface.

Notifications: Uses React Toastify for user-friendly toast messages.

API Integration: Communicates securely with a backend API using Bearer tokens.

Technologies & NPM Packages Used
React — Frontend library for building UI components.

React Router — Routing management.

React Context API — Global state management for authentication.

React Toastify — Toast notification system.

Tailwind CSS — Utility-first CSS framework for styling.

Fetch API — Handling HTTP requests.

Vercel — Hosting and deployment platform.

Installation and Running Locally
Clone the repository:






Deployment
The app is deployed on Vercel. To deploy:

Push code to GitHub.

Connect your GitHub repo to Vercel.

Configure environment variables in Vercel dashboard.

Vercel will automatically build and deploy your app.

Testing
Currently, no automated tests are included.
To manually test:

Register or log in as a user.

Create, update, and cancel bookings.

Submit reviews and check they appear correctly.

Verify toast notifications appear as expected.

Future Improvements
Add automated unit and integration tests.

Add pagination or infinite scroll for bookings list.

Improve error handling UI beyond alerts and toasts.

Support user profile editing.

Integrate date picker libraries for better date input UX.

