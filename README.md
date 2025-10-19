# AdventureXP - Frontend

**AdventureXP Frontend** handles the user interface for the action park reservation system.  
It allows employees and users to interact with the system via web pages.

---

## 🌐 Features

- User-friendly interface for managing activity reservations  
- Display activity schedules and availability  
- Form-based input for reservations (individual & company)  
- Age restrictions displayed for each activity  
- Employee login and role-based access  
- View equipment status and activity details  

---

## 🧱 Technologies

- **Frontend:** HTML / CSS / Thymeleaf  
- **Templating:** Thymeleaf for dynamic content rendering  
- **Responsive Design:** CSS and basic JS for interactivity  
- **Integration:** Communicates with Backend via REST endpoints  

---

## 📁 Project Structure (Frontend) 🚧

```plaintext
adventurexp-frontend/
├── src/
│   ├── main/
│   │   ├── resources/
│   │   │   ├── static/           # CSS, JS, images
│   │   │   └── templates/        # Thymeleaf HTML templates
│   │   │       ├── index.html
│   │   │       ├── reservation/
│   │   │       │   ├── create.html
│   │   │       │   ├── list.html
│   │   │       │   └── detail.html
│   │   │       └── activity/
│   │   │           ├── schedule.html
│   │   │           └── detail.html
