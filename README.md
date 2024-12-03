# 🌸 FloraSense: Where Nature Meets Innovation 🌸

FloraSense is a flower data management system designed to make handling floral data seamless and intuitive. The project includes features for adding flower details, managing flower categories, and displaying the flower database in a user-friendly interface. Built with love for flowers and innovation, FloraSense aims to bring technology closer to nature.

---

## Features ✨

- **Add Flower Data**: Easily add flower attributes such as sepal length, sepal width, petal length, petal width, and type.
- **Manage Flower Categories**: Add new flower categories dynamically and have them reflected in the dropdown for flower types.
- **Database Display**: View all added flowers in a visually appealing, card-based layout.
- **Dynamic Updates**: The dropdown menu for flower types updates in real-time when a new category is added.

---

## Technologies Used 🛠️

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Other Tools**: 
  - Postman for API testing
  - CORS middleware for cross-origin requests

---

## Setup Instructions 🚀

To get FloraSense up and running on your local machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/FloraSense.git
cd FloraSense
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up The Database
1. Create a MySQL database named florasense.
2. Run the create-db-template.sql file in your MySQL client to create the necessary tables:
- Flowers
- Categories
3. Update the database connection details in server.js:
```javascript
const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "your-username",
    password: "your-password",
    database: "florasense",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
```
---

### 4. Start the Server
```bash
node server.js
```
### 5. Open the Frontend
1. Open the index.html file in your browser (or use a live server like VS Code Live Server).
2. Interact with the app!

# Demo
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=R2GLW-s5fV8)

