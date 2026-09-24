# FleetSphere — MERN Stack Fleet Management System

You are a senior MERN Stack developer. Build a complete, production-quality **Fleet Management System called FleetSphere** using **ONLY the MERN Stack and standard MERN ecosystem libraries**.

## STRICT TECHNOLOGY REQUIREMENT

The application MUST use:

* MongoDB — Database
* Express.js — Backend REST API
* React.js — Frontend
* Node.js — Runtime/Server

Use Mongoose for MongoDB interaction.

Do NOT use:

* Python
* Django
* Flask
* FastAPI
* Java
* Spring Boot
* MySQL
* PostgreSQL
* Firebase
* Supabase
* PHP
* Laravel
* Next.js
* Angular
* Vue
* .NET

Do not replace MongoDB, Express, React, or Node.js with any alternative technology.

---

# 1. PROJECT OVERVIEW

Build an enterprise-level fleet management application called:

**FleetSphere**

Tagline:

**Smart Fleet. Safer Roads. Better Operations.**

The system is designed for logistics companies managing:

* Multiple branches
* Vehicles
* Drivers
* Routes
* Trips
* Fuel
* Maintenance
* Incidents
* Documents
* Expenses
* Fleet analytics

The application must be a **fully functional MERN application**, not a static UI prototype.

---

# 2. MERN ARCHITECTURE

Use this architecture:

```text
FleetSphere/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   ├── uploads/
│   ├── seed/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── features/
│   │   ├── services/
│   │   ├── store/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── routes/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# 3. ALLOWED MERN ECOSYSTEM LIBRARIES

Use only libraries that naturally work with the MERN stack.

### Backend

* Express.js
* Mongoose
* JWT
* bcrypt/bcryptjs
* Multer
* Helmet
* CORS
* Morgan
* dotenv
* express-validator

### Frontend

* React
* React Router DOM
* Axios
* Redux Toolkit
* Tailwind CSS
* Recharts
* React Hook Form
* Lucide React
* jsPDF
* XLSX

These libraries are allowed because the core architecture remains:

**MongoDB + Express + React + Node.js**

---

# 4. USER ROLES

Implement five roles.

## SUPER ADMIN

Can:

* Manage organizations
* Manage branches
* Manage users
* Manage global settings
* View all data
* View audit logs
* Manage platform-wide access

## FLEET MANAGER

Can:

* Manage vehicles
* Manage drivers
* Manage assignments
* Manage maintenance
* Manage incidents
* View fleet analytics
* Manage fleet operations

## BRANCH MANAGER

Can:

* Manage branch vehicles
* Manage branch drivers
* Manage branch trips
* Manage routes
* Manage branch fuel records
* Manage branch expenses
* Manage branch incidents

A Branch Manager MUST NOT access another branch's data.

## DRIVER

Can:

* View assigned trips
* Start trips
* Update trip status
* Complete trips
* Report incidents
* Submit fuel records
* Submit expenses
* View assigned vehicle

## FINANCE OFFICER

Can:

* View fuel expenses
* Review maintenance costs
* Review trip expenses
* Approve/reject expenses
* View financial reports
* Export financial data

---

# 5. AUTHENTICATION

Implement JWT authentication.

Features:

* Login
* Logout
* Current user
* Password hashing
* Protected routes
* Role-based authorization
* Branch-based authorization
* Change password
* Account status

API:

```text
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
POST /api/auth/logout
PUT  /api/auth/change-password
```

Never store plaintext passwords.

---

# 6. ROLE-BASED ACCESS CONTROL

Implement backend middleware:

```text
authenticateUser
authorizeRoles
authorizeBranch
```

Do NOT depend only on React for security.

The Express backend MUST verify:

* User role
* Organization
* Branch
* Resource ownership

For example:

```text
Super Admin
    ↓
All branches

Fleet Manager
    ↓
Authorized fleet data

Branch Manager
    ↓
Only assigned branch

Driver
    ↓
Only own assigned trips

Finance Officer
    ↓
Financial records
```

---

# 7. DATABASE

Use **MongoDB only**.

Use Mongoose schemas.

Create these collections:

```text
organizations
branches
users
vehicles
drivers
routes
trips
tripstatushistories
fuelentries
maintenancejobs
incidents
documents
expenses
notifications
auditlogs
```

---

# 8. ORGANIZATION MODEL

Fields:

```text
name
code
email
phone
address
status
createdAt
updatedAt
```

---

# 9. BRANCH MODEL

Fields:

```text
organizationId
name
code
address
city
state
managerId
contactNumber
status
createdAt
updatedAt
```

---

# 10. USER MODEL

Fields:

```text
name
email
password
phone
role
organizationId
branchId
status
lastLogin
createdAt
updatedAt
```

Roles:

```text
SUPER_ADMIN
FLEET_MANAGER
BRANCH_MANAGER
DRIVER
FINANCE_OFFICER
```

---

# 11. VEHICLE MODEL

Fields:

```text
organizationId
branchId
registrationNumber
vehicleType
make
model
year
color
VIN
engineNumber
fuelType
fuelTankCapacity
currentMileage
status
acquisitionDate
insuranceExpiry
registrationExpiry
pollutionExpiry
lastServiceDate
nextServiceDate
lastServiceMileage
nextServiceMileage
notes
createdAt
updatedAt
```

Statuses:

```text
AVAILABLE
ASSIGNED
ON_TRIP
UNDER_MAINTENANCE
OUT_OF_SERVICE
```

---

# 12. DRIVER MODEL

Fields:

```text
organizationId
branchId
userId
employeeId
name
phone
email
licenseNumber
licenseType
licenseExpiry
dateOfJoining
emergencyContact
status
totalTrips
rating
createdAt
updatedAt
```

Statuses:

```text
AVAILABLE
ASSIGNED
ON_TRIP
ON_LEAVE
INACTIVE
```

---

# 13. ROUTE MODEL

Fields:

```text
organizationId
branchId
name
origin
destination
distanceKm
estimatedDuration
stops
notes
status
createdAt
updatedAt
```

---

# 14. TRIP MODEL

Fields:

```text
organizationId
branchId
tripNumber
routeId
vehicleId
driverId
scheduledStart
scheduledEnd
actualStart
actualEnd
startOdometer
endOdometer
cargoDescription
cargoWeight
customerName
customerContact
priority
status
notes
createdBy
createdAt
updatedAt
```

Statuses:

```text
PLANNED
ASSIGNED
STARTED
DELAYED
COMPLETED
CANCELLED
```

---

# 15. TRIP STATUS HISTORY

Create a separate MongoDB collection.

Fields:

```text
tripId
status
changedBy
timestamp
remarks
```

Every status change MUST create a history record.

---

# 16. VEHICLE AND DRIVER ASSIGNMENT

Create an assignment service using Node.js + Express + MongoDB.

Requirements:

* Prevent overlapping vehicle assignments
* Prevent overlapping driver assignments
* Vehicle must be available
* Driver must be available
* Vehicle under maintenance cannot be assigned
* Inactive driver cannot be assigned

Create:

```text
checkVehicleAvailability()
checkDriverAvailability()
assignVehicleAndDriver()
releaseVehicleAndDriver()
```

Example error:

```text
Vehicle is already assigned during this time period.
```

---

# 17. TRIP LIFECYCLE

Implement:

```text
PLANNED
   ↓
ASSIGNED
   ↓
STARTED
   ↓
DELAYED
   ↓
COMPLETED
```

Cancellation:

```text
PLANNED → CANCELLED
ASSIGNED → CANCELLED
```

Only valid transitions should be allowed.

Every transition must:

1. Update Trip
2. Create TripStatusHistory
3. Create AuditLog
4. Create notification when required

---

# 18. FUEL MANAGEMENT

Create FuelEntry model.

Fields:

```text
organizationId
branchId
vehicleId
driverId
tripId
date
odometer
liters
pricePerLiter
totalCost
fuelStation
receiptUrl
notes
createdBy
createdAt
```

Automatically calculate:

```text
totalCost = liters × pricePerLiter
```

Calculate:

```text
fuelEfficiency = distanceKm / liters

costPerKm = totalFuelCost / distanceKm
```

---

# 19. MAINTENANCE

Create maintenance management.

Support:

* Scheduled maintenance
* Preventive maintenance
* Emergency repair
* Overdue maintenance
* Completed maintenance

Fields:

```text
vehicleId
serviceType
description
scheduledDate
completedDate
scheduledMileage
actualMileage
vendor
partsCost
laborCost
totalCost
status
priority
notes
```

Calculate maintenance status based on:

* Date
* Mileage

Show:

```text
Upcoming
Due
Overdue
Completed
```

---

# 20. INCIDENT MANAGEMENT

Create incident system.

Incident types:

```text
ACCIDENT
BREAKDOWN
TRAFFIC_VIOLATION
THEFT
DAMAGE
OTHER
```

Severity:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Status:

```text
REPORTED
UNDER_INVESTIGATION
RESOLVED
CLOSED
```

Fields:

```text
incidentNumber
vehicleId
driverId
tripId
date
location
type
severity
description
evidenceUrls
reportedBy
investigationNotes
resolution
resolvedBy
resolvedAt
status
```

Allow evidence file uploads using Multer.

---

# 21. DOCUMENT MANAGEMENT

Support:

```text
Vehicle Registration
Insurance
Pollution Certificate
Driver License
Permit
Other
```

Fields:

```text
entityType
entityId
documentType
documentNumber
issueDate
expiryDate
fileUrl
status
uploadedBy
```

Automatically calculate:

```text
ACTIVE
EXPIRING_SOON
EXPIRED
```

Flag documents expiring within 30 days.

---

# 22. EXPENSE MANAGEMENT

Categories:

```text
FUEL
MAINTENANCE
TOLL
PARKING
TRIP
REPAIR
OTHER
```

Status:

```text
PENDING
APPROVED
REJECTED
```

Fields:

```text
vehicleId
driverId
tripId
category
amount
date
description
receiptUrl
status
submittedBy
approvedBy
approvedAt
```

Finance Officer can approve/reject expenses.

---

# 23. DASHBOARD

Create role-specific dashboards.

## Fleet Manager Dashboard

Cards:

```text
Total Vehicles
Available Vehicles
Vehicles On Trip
Vehicles Under Maintenance
Total Drivers
Active Trips
Completed Trips
Fleet Utilization
Fuel Cost
Maintenance Cost
Incidents
```

Charts:

* Fleet utilization
* Trips by status
* Fuel cost
* Maintenance cost
* Operating cost
* Driver activity

---

## Branch Manager Dashboard

Show only branch data.

Cards:

```text
Branch Vehicles
Branch Drivers
Active Trips
Upcoming Trips
Maintenance
Fuel Cost
Expenses
Incidents
```

---

## Driver Dashboard

Show:

```text
Today's Trip
Upcoming Trips
Assigned Vehicle
Trip Status
Fuel Records
Expenses
Incidents
```

Buttons:

```text
START TRIP
UPDATE STATUS
COMPLETE TRIP
REPORT INCIDENT
ADD FUEL
ADD EXPENSE
```

---

## Finance Dashboard

Cards:

```text
Total Operating Cost
Fuel Cost
Maintenance Cost
Trip Expenses
Pending Expenses
Approved Expenses
Cost Per KM
```

Charts:

* Monthly expenses
* Fuel expenses
* Maintenance expenses
* Branch costs
* Vehicle costs

---

# 24. FLEET ANALYTICS

Calculate:

```text
Fleet utilization
Vehicle utilization
Driver activity
Fuel efficiency
Cost per kilometer
Maintenance cost
Downtime
Trip completion rate
```

Use React + Recharts.

All analytics must be calculated from MongoDB data through Express APIs.

---

# 25. SEARCH AND FILTERING

All major pages must support:

```text
Search
Filtering
Sorting
Pagination
Date range
```

Backend example:

```text
GET /api/vehicles?page=1&limit=10&search=TS01&status=AVAILABLE
```

Pagination response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

# 26. REST API

Create Express REST APIs.

```text
/api/auth
/api/users
/api/organizations
/api/branches
/api/vehicles
/api/drivers
/api/routes
/api/trips
/api/fuel
/api/maintenance
/api/incidents
/api/documents
/api/expenses
/api/notifications
/api/audit-logs
/api/dashboard
/api/analytics
```

Use proper:

```text
GET
POST
PUT
PATCH
DELETE
```

---

# 27. FRONTEND

Build the frontend using React.

Use:

* React Router
* Redux Toolkit
* Axios
* Tailwind CSS
* Recharts
* React Hook Form

Create:

```text
Login
Dashboard
Vehicles
Drivers
Routes
Trips
Fuel
Maintenance
Incidents
Documents
Expenses
Reports
Notifications
Users
Branches
Organizations
Audit Logs
Settings
```

---

# 28. REACT ROUTING

Routes:

```text
/login

/dashboard

/vehicles
/vehicles/new
/vehicles/:id
/vehicles/:id/edit

/drivers
/drivers/new
/drivers/:id
/drivers/:id/edit

/routes
/trips
/trips/new
/trips/:id
/trips/:id/edit

/fuel
/maintenance
/incidents
/documents
/expenses
/reports
/notifications
/users
/branches
/organizations
/audit-logs
/settings
```

Protect routes based on JWT and role.

---

# 29. UI DESIGN

Create a professional SaaS dashboard.

Layout:

```text
Sidebar
Navbar
Main Content
```

Sidebar:

```text
Dashboard

Fleet
  Vehicles
  Drivers
  Assignments

Operations
  Routes
  Trips
  Fuel
  Expenses

Maintenance
  Maintenance
  Documents
  Incidents

Analytics
  Reports
  Fleet Analytics

Administration
  Users
  Branches
  Organizations
  Audit Logs
  Settings
```

Hide unauthorized navigation items.

---

# 30. VEHICLE MANAGEMENT UI

Vehicle table:

```text
Registration
Vehicle
Branch
Fuel Type
Mileage
Status
Next Service
Actions
```

Actions:

```text
View
Edit
Delete
Assign
Maintenance
Documents
```

Vehicle details tabs:

```text
Overview
Trips
Maintenance
Fuel
Documents
Incidents
```

---

# 31. DRIVER MANAGEMENT UI

Driver table:

```text
Employee ID
Driver
Branch
Phone
License
License Expiry
Status
Trips
Rating
```

Driver details:

```text
Personal Information
License
Assigned Vehicle
Trip History
Incidents
Expenses
```

---

# 32. TRIP MANAGEMENT UI

Trip table:

```text
Trip Number
Route
Vehicle
Driver
Start
End
Status
Actions
```

Trip details:

```text
Trip Information
Route
Vehicle
Driver
Status Timeline
Fuel
Expenses
Incidents
```

Display a visual timeline for trip status history.

---

# 33. NOTIFICATIONS

Create notification system.

Notify users about:

* Trip assignment
* Trip delay
* Maintenance due
* Maintenance overdue
* Document expiry
* License expiry
* Incident reports
* Expense approval
* Expense rejection

Add notification bell to navbar.

Display unread count.

---

# 34. AUDIT LOGS

Create audit logging middleware/service.

Track:

```text
CREATE
UPDATE
DELETE
LOGIN
LOGOUT
APPROVE
REJECT
STATUS_CHANGE
```

Store:

```text
userId
organizationId
branchId
action
entity
entityId
oldValues
newValues
ipAddress
timestamp
```

---

# 35. FILE UPLOADS

Use Node.js + Express + Multer.

Allow:

```text
PDF
JPG
JPEG
PNG
```

Validate:

* File type
* File size
* Filename

Use uploaded files for:

* Fuel receipts
* Expense receipts
* Incident evidence
* Vehicle documents
* Driver documents

---

# 36. EXPORTS

Implement exports from the React frontend using backend APIs.

Support:

```text
CSV
Excel
PDF
```

Export:

```text
Vehicles
Drivers
Trips
Fuel
Maintenance
Incidents
Expenses
```

Exports MUST respect branch authorization.

---

# 37. SECURITY

Implement:

* JWT
* bcrypt
* Helmet
* CORS
* Express validation
* Authentication middleware
* Role middleware
* Branch middleware
* Secure file uploads
* Rate limiting for login
* MongoDB query validation
* Proper HTTP status codes

Never trust client-provided:

```text
role
organizationId
branchId
userId
```

The backend must determine authorization from the authenticated user.

---

# 38. ERROR HANDLING

Create centralized Express error middleware.

Success:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Meaningful error message",
  "errors": []
}
```

Handle:

```text
400
401
403
404
409
422
500
```

---

# 39. SEED DATA

Create a MongoDB seed script.

Create:

```text
1 organization
4 branches
30 vehicles
20 drivers
10 users
30 routes
50 trips
50 fuel records
30 maintenance records
20 incidents
30 documents
50 expenses
notifications
audit logs
```

Create login users:

```text
superadmin@fleetsphere.com
fleetmanager@fleetsphere.com
branchmanager@fleetsphere.com
driver@fleetsphere.com
finance@fleetsphere.com
```

Use a development password and document it in README.

---

# 40. TESTING

Create tests for:

* Login
* JWT authentication
* Role authorization
* Branch isolation
* Vehicle CRUD
* Driver CRUD
* Trip CRUD
* Vehicle assignment
* Driver assignment
* Assignment conflicts
* Trip lifecycle
* Fuel calculations
* Maintenance
* Expenses
* Incidents

Critical test:

```text
Branch A Manager MUST NOT access Branch B data.
```

Critical test:

```text
A vehicle MUST NOT have overlapping trips.
```

Critical test:

```text
A driver MUST NOT have overlapping trips.
```

---

# 41. ENVIRONMENT VARIABLES

Backend `.env.example`:

```text
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fleetsphere
JWT_SECRET=your_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

Frontend `.env.example`:

```text
VITE_API_URL=http://localhost:5000/api
```

Never commit real secrets.

---

# 42. README

Create a detailed README containing:

* Project overview
* MERN architecture
* Features
* Installation
* MongoDB setup
* Backend setup
* Frontend setup
* Environment variables
* Seed command
* Login credentials
* API documentation
* Database models
* RBAC permissions
* Branch authorization
* Testing
* Deployment

---

# 43. CODE QUALITY

The final project must:

* Use reusable React components
* Use reusable Express middleware
* Use reusable Mongoose models
* Use services for business logic
* Use proper validation
* Use async/await
* Use centralized error handling
* Avoid duplicated code
* Use meaningful names
* Keep frontend and backend separated
* Keep API logic inside services
* Keep secrets in `.env`

Do not leave:

```text
TODO
Coming Soon
Implement later
Placeholder
Dummy function
```

for required functionality.

---

# 44. DEVELOPMENT ORDER

Build the project in this exact order:

### Phase 1

MERN project setup

### Phase 2

MongoDB + Mongoose models

### Phase 3

JWT authentication

### Phase 4

RBAC + branch authorization

### Phase 5

Vehicle management

### Phase 6

Driver management

### Phase 7

Routes

### Phase 8

Trips

### Phase 9

Vehicle/driver assignment engine

### Phase 10

Fuel management

### Phase 11

Maintenance

### Phase 12

Incidents

### Phase 13

Documents

### Phase 14

Expenses

### Phase 15

Notifications

### Phase 16

Audit logs

### Phase 17

Dashboards

### Phase 18

Analytics

### Phase 19

Search/filter/pagination

### Phase 20

Exports

### Phase 21

Testing

### Phase 22

Seed data

### Phase 23

Responsive UI polish

### Phase 24

README and deployment

---

# 45. IMPORTANT FINAL INSTRUCTION

This project MUST remain a **pure MERN Stack project**.

The architecture must always be:

```text
React
   ↓
Axios
   ↓
Express.js REST API
   ↓
Node.js
   ↓
Mongoose
   ↓
MongoDB
```

Do not introduce another backend language, database, framework, or external backend service.

Build the project as a **complete, functional, professional Fleet Management System**, suitable for a B.Tech capstone project and capable of being demonstrated as a real enterprise application.

Before considering the project complete, verify:

* Frontend works
* Backend works
* MongoDB connection works
* JWT works
* RBAC works
* Branch isolation works
* CRUD operations work
* Assignment conflicts are prevented
* Trip lifecycle works
* Fuel calculations work
* Maintenance calculations work
* Expense workflow works
* Incident workflow works
* Documents work
* Notifications work
* Audit logs work
* Dashboards work
* Analytics work
* Search works
* Pagination works
* Exports work
* Responsive UI works
* Seed data works
* No broken imports
* No missing dependencies
* No placeholder functionality
