# Initial Architecture

## Documentation

### Database Schema

[Database Schema](https://menu-flax-six.vercel.app/DataBaseSchema)

### Project Documentation — Part 1

[Project Documentation](https://menu-flax-six.vercel.app/ProjectDocumentation)

---

## Architecture

The project currently follows a **monolithic architecture**.

```text
Frontend
   ↓
Backend
   ↓
PostgreSQL
```

## Structure

### Frontend

* React
* Vite
* Environment variables
* Configuration for managing environment variables

### Backend

* Node.js
* Express
* `/responses`

  * Error responses
  * Success responses

### Database

* PostgreSQL
* Database connection configuration
* Queries
* Schema

### Root

* `/tests`
* `/config`

  * Environment variables
  * Configuration for managing environment variables

scrip for start e build;