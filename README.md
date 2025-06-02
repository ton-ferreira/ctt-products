

# CTT Products

A simple CRUD web application for managing products built mostly in a weekend.  
Built with **React**, **Redux**, and **TypeScript**, following frontend best practices.


![image](https://github.com/user-attachments/assets/57415480-bdc9-44a1-b4ee-fa22e73f8a6e)

## Tech Stack

- React + TypeScript
- Redux for state management
- React Router for navigation
- Testing Library + Jest for unit tests
- SCSS for styling
- Docker for containerization
- No additional libs were allowed in this test

## Getting Started

### Prerequisites

- Node.js (if something do not work, try node v22+)
- Docker & Docker Compose (optional, for containerized run)

### Install dependencies

```bash
npm install
```
and... run :)
```bash
npm start
```

### Docker alternative

First of all, [download docker](https://www.docker.com/products/docker-desktop/) and then run:
```bash
docker-compose up
```
The application will run at http://localhost:3000

### Project structure
Even though this is a simple CRUD test application, I used a really good structure for either small projects or large ones. It's based [in this guide](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) for good practices on code organization.

### Production

As requested, there are several changes I would do if this was a real / production app.

 - Redux: I probably wouldn’t use Redux in this case (especially without Redux Toolkit), as there are simpler alternatives with much less boilerplate and complexity. Zustand would likely be a better fit here.
 - Form: The test instructions clearly stated not to use third-party libraries. However, in a real-world scenario, I would use React Hook Form together with Zod for its scalability, flexibility, and strong validation capabilities.
 - Tests: TDD is a great approach to writing robust and maintainable code, but it requires time for proper planning and architecture. Unfortunately, I didn’t have enough free time during the test to fully apply TDD. In a real work environment, I would definitely prioritize it when feasible.

### Assumptions
- Categories: since it is a 36 char category array (just like the product id), I assumed it is an uuid as well, so I've made an object of 3 uuids simulating categories ids.
- API: Since it is a frontend test, I just made a fake api to simulate the api calls, loads and sync with the redux store. I would use something like Json-serve to get a similar result, but I made it myself because of the 3rd part libraries limitation.
