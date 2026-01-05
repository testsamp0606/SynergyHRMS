export type Employee = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: 'Engineering' | 'HR' | 'Marketing' | 'Sales' | 'Design';
  role: string;
  status: 'Active' | 'On Leave' | 'Inactive';
};

export type LeaveRequest = {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  leaveType: 'Vacation' | 'Sick' | 'Personal';
  startDate: Date;
  endDate: Date;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type PerformanceReview = {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  reviewer: string;
  dueDate: Date;
  status: 'Upcoming' | 'In Progress' | 'Completed';
};

export type PayrollRun = {
  id: string;
  period: string;
  runDate: Date;
  status: 'Completed' | 'In Progress' | 'Failed';
  totalAmount: number;
};

export type Role = {
    id: string;
    name: "Admin" | "HR Manager" | "Manager" | "Employee";
    description: string;
    permissions: string[];
}

export type UserProfile = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    role?: Role; // Optional: Can be populated after fetching
}

export type TrainingProgram = {
  id: string;
  title: string;
  category: 'Technical' | 'Soft Skills' | 'Leadership' | 'Compliance';
  duration: string;
  status: 'Active' | 'Draft' | 'Archived';
  assignedTo: number;
  completionRate: number;
};

export type Asset = {
  id: string;
  name: string;
  category: 'Laptop' | 'Monitor' | 'Keyboard' | 'Mouse' | 'Headset' | 'Other';
  serialNumber: string;
  purchaseDate: Date;
  value: number;
  assignedTo?: string; // Employee ID
  assignedAvatar?: string;
  status: 'Assigned' | 'Unassigned' | 'In Repair' | 'Retired';
};

export type ExpenseClaim = {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  category: 'Travel' | 'Food' | 'Supplies' | 'Other';
  submissionDate: Date;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  description: string;
};

export type Document = {
  id: string;
  title: string;
  category: 'HR Policies' | 'Contracts' | 'Payslips' | 'Compliance';
  version: string;
  lastUpdated: Date;
  uploadedBy: string;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  target: 'Everyone' | 'Engineering' | 'HR' | 'Marketing' | 'Sales' | 'Design';
};

export type AuditLog = {
  id: string;
  user: string;
  userAvatar: string;
  action: 'USER_LOGIN' | 'CREATE_EMPLOYEE' | 'UPDATE_ROLE' | 'RUN_PAYROLL' | 'EXPORT_DATA';
  details: string;
  date: Date;
  ipAddress: string;
};
