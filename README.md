## 📌 Documentation

### Database Schema

[Database Schema](https://menu-flax-six.vercel.app/DataBaseSchema)

### Project Documentation — Part 1

[Project Documentation](https://menu-flax-six.vercel.app/ProjectDocumentation)

---

## 🛠️ Technologies

| Component | Technology / Service |
|---|---|
| Frontend | React |
| Backend | Node.js + Express |
| Session / Cache | Redis |
| Database | PostgreSQL |

### Services

| Service | Provider |
|---|---|
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Redis Hosting | Upstash |
| PostgreSQL Hosting | Neon |

---

## 📋 Roadmap

### Authentication & Security

- [ ] Session-based authentication
- [ ] Session persistence using Redis
- [ ] Protected authenticated routes
- [ ] Login and logout flow
- [ ] Global user state using Context
- [ ] JWT for authorization
- [ ] Complete permissions flow
- [ ] Access attempt control
- [ ] Implement rate limiting for multiple login attempts
- [ ] Request timeouts
- [ ] Implement idempotency for operations that may be repeated

### Configuration

- [ ] Standardize configuration using environment variables
- [ ] Create specific configuration for `development`
- [ ] Create specific configuration for `production`
- [ ] Define URLs/hostnames based on the environment
- [ ] Review CORS configuration
- [ ] Review cookie configuration per environment

### Infrastructure

- [ ] Frontend hosted on Vercel
- [ ] Backend hosted on Render
- [ ] Redis hosted on Upstash
- [ ] PostgreSQL hosted on Neon
- [ ] Rebuild Docker image
- [ ] Adjust Dockerfile
- [ ] Validate full application execution through Docker
- [ ] Review production container configuration

### Database

- [ ] Define initial schema
- [ ] Evolve user structure
- [ ] Structure permissions
- [ ] Structure menu relationships
- [ ] Create audit structure
- [ ] Review indexes as the application grows

### Interface

- [ ] Create base layout for authenticated pages
- [ ] Create header
- [ ] Create user identification
- [ ] Create visual permissions area
- [ ] Define visual identity
- [ ] Create main management screen
- [ ] Implement create functionality
- [ ] Implement listing
- [ ] Implement editing
- [ ] Implement deletion
- [ ] Implement search
- [ ] Implement filters
- [ ] Implement pagination
- [ ] Adapt actions according to user permissions

---

## 🎨 Visual Identity — By ChatGPT

The application uses a palette based on soft, natural tones.

| Color | Hexadecimal | Usage |
|---|---|---|
| 🟡 Pastel Yellow | `#F6D77A` | Highlights / Brand |
| 🥛 Cream | `#FFFDF5` | Main background |
| 🌿 Dark Olive Green | `#3F5145` | Text / Buttons |
| 🌱 Soft Green | `#E7EFE7` | Secondary areas |
| 🤍 Warm White | `#FFFFFF` | Cards / Header |

### Complementary Colors

| Color | Usage |
|---|---|
| `#8A8F82` | Secondary text |
| `#E8E1C8` | Borders |
| `#D9B64C` | Focus / Highlight states |