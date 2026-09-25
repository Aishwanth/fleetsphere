import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import auth from './routes/auth.js';
import trips from './routes/trips.js';
import { authenticateUser } from './middleware/auth.js';
import { resourceRouter } from './routes/resources.js';
import * as M from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.join(__dirname, '../frontend/dist');
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ success: true, message: 'FleetSphere API online' }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }), auth);
app.use('/api', authenticateUser);
app.use('/api/vehicles', resourceRouter(M.Vehicle, 'vehicles', { populate: 'branchId' }));
app.use('/api/drivers', resourceRouter(M.Driver, 'drivers', { populate: 'branchId userId' }));
app.use('/api/routes', resourceRouter(M.Route, 'routes'));
app.use('/api/trips', trips);
app.use('/api/fuel', resourceRouter(M.FuelEntry, 'fuel', { roles: ['SUPER_ADMIN', 'FLEET_MANAGER', 'BRANCH_MANAGER', 'DRIVER'] }));
app.use('/api/maintenance', resourceRouter(M.MaintenanceJob, 'maintenance'));
app.use('/api/incidents', resourceRouter(M.Incident, 'incidents', { roles: ['SUPER_ADMIN', 'FLEET_MANAGER', 'BRANCH_MANAGER', 'DRIVER'] }));
app.use('/api/documents', resourceRouter(M.Document, 'documents'));
app.use('/api/expenses', resourceRouter(M.Expense, 'expenses', { roles: ['SUPER_ADMIN', 'FLEET_MANAGER', 'BRANCH_MANAGER', 'DRIVER', 'FINANCE_OFFICER'] }));
app.use('/api/notifications', resourceRouter(M.Notification, 'notifications', { roles: ['SUPER_ADMIN', 'FLEET_MANAGER', 'BRANCH_MANAGER', 'DRIVER', 'FINANCE_OFFICER'] }));
app.use('/api/users', resourceRouter(M.User, 'users', { roles: ['SUPER_ADMIN'] }));
app.use('/api/branches', resourceRouter(M.Branch, 'branches', { roles: ['SUPER_ADMIN', 'FLEET_MANAGER'] }));
app.use('/api/organizations', resourceRouter(M.Organization, 'organizations', { roles: ['SUPER_ADMIN'] }));
app.use('/api/audit-logs', resourceRouter(M.AuditLog, 'audit-logs', { roles: ['SUPER_ADMIN'] }));

app.use(express.static(frontendDist));
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server error', errors: err.errors || [] });
});

export default app;
