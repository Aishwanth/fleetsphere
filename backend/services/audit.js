import { AuditLog } from '../models/index.js';
export const audit=(req,action,entity,entityId,oldValues,newValues)=>AuditLog.create({userId:req.user?._id,organizationId:req.user?.organizationId,branchId:req.user?.branchId,action,entity,entityId,oldValues,newValues,ipAddress:req.ip});
