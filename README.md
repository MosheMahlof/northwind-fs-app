
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

> ⚠️ Custom hooks to seperate logic from html:
> - Time constraints
📌 Refer to `frontend/README.md` for setup and usage instructions.

---

## 🔧 Backend

The backend stack includes:

- **.NET 6 Web API**
- **MSSQL Server** running in a **Docker container**
- **SQL script** to initialize the database schema and define all required **stored procedures**
- access swagger: http://localhost:5234/swagger
## 📝 Bonus & Design Decisions

- Chose React + Context over Redux due to small app scope
- Used Material UI, known ui library with good documentation
- Dark, localStorage form persistence and swagger were completed

---

## 🚀 Getting Started

clone the repository: `git clone https://github.com/MosheMahlof/northwind-fs-app.git`

# frontend:
1. `cd northwind-products`
2. `npm install`
3. `npm run dev`

# backend:
1. run docker desktop application
2. `cd Northwind.API`
3. `docker-compose up -d`
4. `docker exec -it northwind-sqlserver bash`
5. `/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -C -i /init/01-init-northwind.sql` (this setup the DB and stored procedures)
6. `dotnet run`
```


---
