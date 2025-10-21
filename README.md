# 🧭 AdventureXP - Frontend

**AdventureXP Frontend** provides the user interface for the AdventureXP action park reservation system.  
It enables employees and customers to interact with the backend through web pages, manage reservations, and view activity information.

---

## 🌐 Features

- User-friendly interface for managing activity reservations  
- Display activity schedules, availability, and restrictions  
- Form-based reservation creation for both individuals and companies  
- Login system with employee roles (Manager / Operator)  
- Dynamic views powered by Thymeleaf templates  
- Integration with the backend REST API  
- Basic JavaScript-driven interactivity  

---

## 🧱 Technologies

- **Framework:** Spring Boot (Java 21)  
- **Frontend:** HTML, CSS, JavaScript  
- **Templating:** Thymeleaf  
- **Integration:** REST communication with AdventureXP Backend  
- **Build Tool:** Maven  
- **Testing:** JUnit for controllers, static HTML/JS test files  

---

## 📁 Project Structure (Frontend)

```plaintext
adventurexp-frontend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── white/monster/energy/adventurefrontend/
│   │   │       ├── activity/
│   │   │       ├── controller/
│   │   │       │   └── ViewController.java
│   │   │       └── AdventureFrontendApplication.java      # Application entry point
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
│   │       ├── templates/
│   │       │   └── (Thymeleaf HTML templates)
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
