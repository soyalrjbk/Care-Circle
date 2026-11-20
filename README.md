# Care Circle

Care Circle helps families coordinate care for a loved one facing serious illness. Family members share one space where they can track appointments, split up caregiving tasks, and find hospice and support services nearby, so less time goes to logistics and more time goes to being together.

> 🚧 **Work in progress.** Login, registration, and the dashboard layout are working. Circles, tasks, appointments, and the care services directory are being built now.

**Link to project:** __________

![Care Circle dashboard](./screenshot.png)

## How It's Made:

**Tech used:**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![AdminLTE](https://img.shields.io/badge/AdminLTE_4-343A40?style=for-the-badge&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

Care Circle is a full-stack Node.js app. I started from Brad Traversy's Node Passport Login boilerplate so I could spend my time on the features families actually need rather than rebuilding authentication from scratch.

- **Authentication:** Passport's local strategy handles login, with passwords hashed using bcrypt and sessions keeping users signed in. An `ensureAuthenticated` middleware protects private routes, so anyone who isn't logged in is redirected to the login page.
- **Data:** MongoDB Atlas stores the data, and Mongoose models define its shape. Next up are a `Circle` model (an owner plus invited family members) and `Task` and `Appointment` models that belong to a circle.
- **Front end:** Pages are server-rendered with EJS. The dashboard uses AdminLTE 4, a Bootstrap 5 admin template, for its sidebar navigation and summary cards. The login and register pages keep their own simpler layout through `express-ejs-layouts`.
- **Deployment:** The app is hosted on Render and redeploys automatically whenever I push to the main branch on GitHub.

### Planned features
- [x] Sign up, log in, log out
- [x] Dashboard layout
- [ ] Create a care circle and invite family members
- [ ] Shared tasks: add, assign to a family member, mark done
- [ ] Appointments list
- [ ] Directory of hospice and care support services

## Lessons Learned:

- **Checking compatibility before committing to a template.** I first planned to use SB Admin 2, but it's built on Bootstrap 4 while my boilerplate uses Bootstrap 5, and loading both breaks the styling. I switched to AdminLTE 4, which is built on Bootstrap 5.
- **How layouts work in Express.** `express-ejs-layouts` wraps every page in one layout by default. Rendering the dashboard with `layout: false` let it use its own full-page AdminLTE design without changing the login pages.
- **Protecting routes with middleware.** Putting `ensureAuthenticated` in front of a route is a simple, reusable way to keep private pages private.
- **Deployment configuration.** Environment variable names have to match between my local `.env` and Render, or the app can't connect to the database.

## Run It Locally

```bash
git clone https://github.com/soyalrjbk/Care-Circle.git
cd Care-Circle
npm install
```

Create a `.env` file with your MongoDB Atlas connection string:

```
MONGO_URL=your_mongodb_connection_string
```

Then start the app:

```bash
npm run dev
```

## Credits

- Authentication boilerplate: [Node Passport Login](https://github.com/bradtraversy/node_passport_login) by Brad Traversy
- Dashboard UI: [AdminLTE](https://adminlte.io) by ColorlibHQ
