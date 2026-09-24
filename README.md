# FleetSphere

FleetSphere is a pure MERN fleet-management application for multi-branch logistics operations. It provides JWT authentication, role and branch isolation, vehicle/driver/route/trip management, trip transition history, fuel calculation, maintenance, incidents, documents, expenses, notifications, and audit logs.

## Run locally

1. Install MongoDB and start a local instance.
2. Copy `backend/.env.example` to `backend/.env` and set a strong `JWT_SECRET`.
3. Run `npm install` in both `backend` and `frontend`.
4. Start the API with `npm run dev` in `backend`, then start Vite with `npm run dev` in `frontend`.

The API is served at `http://localhost:5000/api`; the client expects it there by default.

## Security and scope

Every API route except auth and health requires a bearer JWT. Server middleware derives the organization and branch filters from the authenticated account; branch managers and drivers cannot query another branch. Assignment uses time-window overlap checks for both vehicles and drivers. Trip status changes create immutable history and audit records.

## API areas

`/auth`, `/vehicles`, `/drivers`, `/routes`, `/trips`, `/fuel`, `/maintenance`, `/incidents`, `/documents`, `/expenses`, `/notifications`, `/users`, `/branches`, `/organizations`, and `/audit-logs`.

List endpoints support `page`, `limit`, `search`, `status`, and `sort` where applicable. Responses use `{ success, message?, data, pagination? }`.
