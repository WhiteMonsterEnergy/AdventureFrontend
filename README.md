# 🧭 AdventureXP - Frontend

**AdventureXP Frontend** provides the user interface for the AdventureXP action park reservation system.  
It allows employees and customers to manage bookings, activities, and authentication through an HTML and JavaScript-based interface powered by Thymeleaf.

---

## 🌐 Features

- Intuitive HTML interface for activity and booking management  
- Displays activity schedules, age restrictions, and availability  
- Employee login and role-based access (Manager / Operator)  
- Form-based booking for individuals and companies  
- REST API integration with the backend  
- Smoke and functional tests for frontend stability  

---

## 🧱 Technologies

- **Frontend:** HTML, CSS, JavaScript  
- **Templating:** Thymeleaf (dynamic rendering)  
- **Framework:** Spring Boot (Java 21)  
- **Build Tool:** Maven  
- **Testing:**  
  - **Smoke test:** ensures the app context loads successfully  
  - **Functional tests:** validate controller view mappings and accessibility  

---

## 📁 Project Structure

```plaintext
adventurexp-frontend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── white/monster/energy/adventurefrontend/
│   │   │       ├── activity/
│   │   │       ├── controller/
│   │   │       │   └── ViewController.java
│   │   │       └── AdventureFrontendApplication.java
│   │   │
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── javascript/
│   │       │   │   ├── activity.js
│   │       │   │   ├── booked_activities_list.js
│   │       │   │   ├── booking.js
│   │       │   │   ├── login.api.js
│   │       │   │   ├── login.js
│   │       │   │   └── main.js
│   │       │   │
│   │       │   ├── test/
│   │       │   │   ├── login-test.html
│   │       │   │   ├── styles-test.html
│   │       │   │   └── styles-test.js
│   │       │   │
│   │       │   ├── favicon.ico
│   │       │   └── styles.css
│   │       │
│   │       ├── templates/                   # Thymeleaf HTML pages
│   │       │   ├── login.html
│   │       │   ├── activities.html
│   │       │   ├── booking.html
│   │       │   └── index.html
│   │       │
│   │       └── application.properties
│   │
│   └── test/
│       └── java/
│           └── white/monster/energy/adventurefrontend/
│               ├── controller/
│               │   └── ViewTestControllerTest.java
│               └── AdventureFrontendApplicationTests.java
│
└── pom.xml
