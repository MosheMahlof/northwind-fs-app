
---

## 🖼️ Frontend

The frontend is built using:

- **React** with **TypeScript**
- **React Context API** for state management (sufficient for small-scale apps)
- **Material UI (MUI)** for UI components and layout
- **Custom Theme** for consistent styling

> ⚠️ No standalone CSS files were created because:
> - MUI provides a complete design system and utility props (`display="flex"`, `spacing`, etc.)
> - Styling is handled via component props and theming
> - Time constraints and project scope did not justify custom CSS

> ⚠️ Didnt use ADO .net/entity framwork:
> - Time constraints

📌 Refer to `frontend/README.md` for setup and usage instructions.

---

## 🔧 Backend

The backend stack includes:

- **.NET 6 Web API**
- **MSSQL Server** running in a **Docker container**
- **SQL script** to initialize the database schema and define all required **stored procedures**
- Data access using **ADO.NET** and **stored procedures**

📌 Refer to `backend/README.md` for instructions on building and running the backend services (including Docker setup).

---

## ⚙️ Additional Features & Notes

- Error handling and logging implemented on both frontend and backend
- SQL scripts ensure clean DB setup and referential integrity
- Fulfills fullstack requirements for:
  - Product list view with sorting/filtering
  - Autocomplete search built from scratch (no external libs)
  - Product create/edit/delete functionality with validation and error feedback

---

## 📝 Bonus & Design Decisions

- Chose React + Context over Redux due to small app scope
- Used Material UI for speed and consistent design
- Dark mode, CSV/PDF export, and localStorage form persistence were considered, but deprioritized due to time constraints

---

## 🚀 Getting Started

For full setup and run instructions, please refer to:

- [`frontend/README.md`](./frontend/README.md)
- [`backend/README.md`](./backend/README.md)

---

## ✅ Assignment Goals Recap

✔️ Fullstack CRUD  
✔️ Stored procedures for all DB operations  
✔️ Dockerized MSSQL setup  
✔️ Responsive UI with custom autocomplete  
✔️ Error handling and user-friendly feedback

---

Happy coding! ✨
