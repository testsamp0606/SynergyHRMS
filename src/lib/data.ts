import type { Employee, LeaveRequest, PerformanceReview, PayrollRun, TrainingProgram, Asset, ExpenseClaim, Document, Announcement, UserProfile, Role } from '@/lib/types';

export const employees: Employee[] = [
  { id: 'EMP001', name: 'Alice Johnson', email: 'alice.j@example.com', avatar: 'https://picsum.photos/seed/1/100/100', department: 'Engineering', role: 'Senior Software Engineer', status: 'Active' },
  { id: 'EMP002', name: 'Bob Williams', email: 'bob.w@example.com', avatar: 'https://picsum.photos/seed/2/100/100', department: 'HR', role: 'HR Manager', status: 'Active' },
  { id: 'EMP003', name: 'Charlie Brown', email: 'charlie.b@example.com', avatar: 'https://picsum.photos/seed/3/100/100', department: 'Marketing', role: 'Marketing Lead', status: 'Active' },
  { id: 'EMP004', name: 'Diana Miller', email: 'diana.m@example.com', avatar: 'https://picsum.photos/seed/4/100/100', department: 'Sales', role: 'Sales Executive', status: 'On Leave' },
  { id: 'EMP005', name: 'Ethan Davis', email: 'ethan.d@example.com', avatar: 'https://picsum.photos/seed/5/100/100', department: 'Design', role: 'UI/UX Designer', status: 'Active' },
  { id: 'EMP006', name: 'Fiona Garcia', email: 'fiona.g@example.com', avatar: 'https://picsum.photos/seed/6/100/100', department: 'Engineering', role: 'Frontend Developer', status: 'Active' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'LR001', employeeName: 'Diana Miller', employeeAvatar: 'https://picsum.photos/seed/4/100/100', leaveType: 'Vacation', startDate: new Date('2024-08-10'), endDate: new Date('2024-08-20'), status: 'Approved' },
  { id: 'LR002', employeeName: 'Ethan Davis', employeeAvatar: 'https://picsum.photos/seed/5/100/100', leaveType: 'Sick', startDate: new Date(), endDate: new Date(), status: 'Pending' },
  { id: 'LR003', employeeName: 'Charlie Brown', employeeAvatar: 'https://picsum.photos/seed/3/100/100', leaveType: 'Personal', startDate: new Date(new Date().setDate(new Date().getDate() + 5)), endDate: new Date(new Date().setDate(new Date().getDate() + 7)), status: 'Pending' },
];

export const performanceReviews: PerformanceReview[] = [
  { id: 'PR001', employeeName: 'Alice Johnson', employeeAvatar: 'https://picsum.photos/seed/1/100/100', reviewer: 'Bob Williams', dueDate: new Date('2024-09-01'), status: 'Upcoming' },
  { id: 'PR002', employeeName: 'Fiona Garcia', employeeAvatar: 'https://picsum.photos/seed/6/100/100', reviewer: 'Alice Johnson', dueDate: new Date('2024-09-15'), status: 'Upcoming' },
  { id: 'PR003', employeeName: 'Charlie Brown', employeeAvatar: 'https://picsum.photos/seed/3/100/100', reviewer: 'Bob Williams', dueDate: new Date('2024-07-30'), status: 'Completed' },
  { id: 'PR004', employeeName: 'Ethan Davis', employeeAvatar: 'https://picsum.photos/seed/5/100/100', reviewer: 'Bob Williams', dueDate: new Date('2024-08-15'), status: 'In Progress' },
];

export const payrollRuns: PayrollRun[] = [
  { id: 'PAY001', period: 'July 2024', runDate: new Date('2024-07-31'), status: 'Completed', totalAmount: 55000.00 },
  { id: 'PAY002', period: 'June 2024', runDate: new Date('2024-06-30'), status: 'Completed', totalAmount: 54500.00 },
  { id: 'PAY003', period: 'May 2024', runDate: new Date('2024-05-31'), status: 'Completed', totalAmount: 54000.00 },
];

export const trainingPrograms: TrainingProgram[] = [
    { id: 'TRN001', title: 'Advanced React Development', category: 'Technical', duration: '4 Weeks', status: 'Active', assignedTo: 25, completionRate: 75 },
    { id: 'TRN002', title: 'Effective Communication', category: 'Soft Skills', duration: '2 Weeks', status: 'Active', assignedTo: 40, completionRate: 90 },
    { id: 'TRN003', title: 'Leadership for New Managers', category: 'Leadership', duration: '6 Weeks', status: 'Active', assignedTo: 15, completionRate: 60 },
    { id: 'TRN004', title: 'Cybersecurity Essentials', category: 'Compliance', duration: '1 Week', status: 'Draft', assignedTo: 0, completionRate: 0 },
    { id: 'TRN005', title: 'Agile Project Management', category: 'Technical', duration: '3 Weeks', status: 'Archived', assignedTo: 50, completionRate: 100 },
];

export const assets: Asset[] = [
    { id: 'AST001', name: 'MacBook Pro 16"', category: 'Laptop', serialNumber: 'C02F1234H8J0', purchaseDate: new Date('2023-01-15'), value: 2499, assignedTo: 'Alice Johnson', assignedAvatar: 'https://picsum.photos/seed/1/100/100', status: 'Assigned' },
    { id: 'AST002', name: 'Dell UltraSharp 27"', category: 'Monitor', serialNumber: 'SN-DELL-27-12345', purchaseDate: new Date('2023-01-15'), value: 599, assignedTo: 'Alice Johnson', assignedAvatar: 'https://picsum.photos/seed/1/100/100', status: 'Assigned' },
    { id: 'AST003', name: 'Logitech MX Keys', category: 'Keyboard', serialNumber: 'SN-LOGI-K-67890', purchaseDate: new Date('2023-01-15'), value: 119, assignedTo: 'Bob Williams', assignedAvatar: 'https://picsum.photos/seed/2/100/100', status: 'Assigned' },
    { id: 'AST004', name: 'MacBook Pro 14"', category: 'Laptop', serialNumber: 'C02G5678H9K1', purchaseDate: new Date('2023-05-20'), value: 1999, status: 'Unassigned' },
    { id: 'AST005', name: 'Herman Miller Aeron', category: 'Other', serialNumber: 'SN-HM-A-11223', purchaseDate: new Date('2022-11-10'), value: 1495, assignedTo: 'Charlie Brown', assignedAvatar: 'https://picsum.photos/seed/3/100/100', status: 'Assigned' },
    { id: 'AST006', name: 'Sony WH-1000XM5', category: 'Headset', serialNumber: 'SN-SONY-H-33445', purchaseDate: new Date('2023-08-01'), value: 399, status: 'In Repair' },
    { id: 'AST007', name: 'MacBook Air M2', category: 'Laptop', serialNumber: 'C02H1234J0L2', purchaseDate: new Date('2024-02-10'), value: 1299, assignedTo: 'Fiona Garcia', assignedAvatar: 'https://picsum.photos/seed/6/100/100', status: 'Assigned' },
];

export const expenseClaims: ExpenseClaim[] = [
    { id: 'CLM001', employeeName: 'Alice Johnson', employeeAvatar: 'https://picsum.photos/seed/1/100/100', category: 'Travel', submissionDate: new Date('2024-08-01'), amount: 250.75, status: 'Approved', description: 'Client meeting in SF' },
    { id: 'CLM002', employeeName: 'Charlie Brown', employeeAvatar: 'https://picsum.photos/seed/3/100/100', category: 'Food', submissionDate: new Date('2024-08-05'), amount: 85.50, status: 'Pending', description: 'Team lunch' },
    { id: 'CLM003', employeeName: 'Fiona Garcia', employeeAvatar: 'https://picsum.photos/seed/6/100/100', category: 'Supplies', submissionDate: new Date('2024-08-02'), amount: 120.00, status: 'Pending', description: 'Office supplies' },
    { id: 'CLM004', employeeName: 'Ethan Davis', employeeAvatar: 'https://picsum.photos/seed/5/100/100', category: 'Other', submissionDate: new Date('2024-07-28'), amount: 50.00, status: 'Rejected', description: 'Online course' },
    { id: 'CLM005', employeeName: 'Alice Johnson', employeeAvatar: 'https://picsum.photos/seed/1/100/100', category: 'Food', submissionDate: new Date('2024-08-10'), amount: 45.30, status: 'Pending', description: 'Dinner with client' },
];

export const documents: Document[] = [
    { id: 'DOC001', title: 'Employee Handbook 2024', category: 'HR Policies', version: '2.1', lastUpdated: new Date('2024-06-15'), uploadedBy: 'Bob Williams' },
    { id: 'DOC002', title: 'Alice Johnson - Employment Contract', category: 'Contracts', version: '1.0', lastUpdated: new Date('2023-01-15'), uploadedBy: 'Bob Williams' },
    { id: 'DOC003', title: 'July 2024 Payslip - Charlie Brown', category: 'Payslips', version: '1.0', lastUpdated: new Date('2024-07-31'), uploadedBy: 'System' },
    { id: 'DOC004', title: 'Work From Home Policy', category: 'HR Policies', version: '1.5', lastUpdated: new Date('2024-05-20'), uploadedBy: 'Bob Williams' },
    { id: 'DOC005', title: 'Form 16 - FY 2023-24 - Alice Johnson', category: 'Compliance', version: '1.0', lastUpdated: new Date('2024-04-30'), uploadedBy: 'System' },
];

export const announcements: Announcement[] = [
  { id: 'ANN001', title: 'Q3 2024 All-Hands Meeting', content: 'Join us for the Q3 All-Hands meeting on Friday, August 30th at 10:00 AM PST. We will discuss our quarterly performance and future goals. A calendar invite will follow shortly.', author: 'Bob Williams', date: new Date('2024-08-15'), target: 'Everyone' },
  { id: 'ANN002', title: 'New Engineering Library: `synergy-ui`', content: 'We are excited to announce the launch of our internal component library, `synergy-ui`. Please start using it for all new frontend projects. Documentation is available on Confluence.', author: 'Alice Johnson', date: new Date('2024-08-10'), target: 'Engineering' },
  { id: 'ANN003', title: 'Marketing Offsite - September', content: 'The annual marketing team offsite is scheduled for September 12-13. Please RSVP by the end of this week so we can finalize the arrangements.', author: 'Charlie Brown', date: new Date('2024-08-05'), target: 'Marketing' },
];

export const departmentHeadcount = [
    { department: 'Engineering', count: 12 },
    { department: 'Marketing', count: 6 },
    { department: 'Sales', count: 8 },
    { department: 'HR', count: 3 },
    { department: 'Design', count: 4 },
];

export const employeeGrowthData = [
  { month: 'Jan', count: 40 },
  { month: 'Feb', count: 42 },
  { month: 'Mar', count: 45 },
  { month: 'Apr', count: 44 },
  { month: 'May', count: 48 },
  { month: 'Jun', count: 50 },
];

export const diversityData = [
  { name: 'Female', value: 22, fill: 'hsl(var(--chart-1))' },
  { name: 'Male', value: 25, fill: 'hsl(var(--chart-2))' },
  { name: 'Other', value: 3, fill: 'hsl(var(--chart-3))' },
];

export const roles: Role[] = [
  { id: 'R01', name: 'Admin', description: 'Full access to all system features and modules.', permissions: ['manage-users', 'manage-roles', 'run-payroll', 'manage-billing'] },
  { id: 'R02', name: 'HR Manager', description: 'Manages employees, recruitment, and approvals.', permissions: ['manage-employees', 'manage-recruitment', 'approve-leave', 'view-reports'] },
  { id: 'R03', name: 'Manager', description: 'Manages their direct reports and team-related approvals.', permissions: ['view-team', 'approve-leave', 'conduct-reviews'] },
  { id: 'R04', name: 'Employee', description: 'Access to their own profile, leave requests, and documents.', permissions: ['view-profile', 'request-leave', 'view-documents'] },
];

export const users: UserProfile[] = [
  { id: 'USR001', firstName: 'Admin', lastName: 'User', email: 'admin@synergy.com', roleId: 'R01' },
  { id: 'USR002', firstName: 'Bob', lastName: 'Williams', email: 'bob.w@example.com', roleId: 'R02' },
  { id: 'USR003', firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@example.com', roleId: 'R03' },
  { id: 'USR004', firstName: 'Charlie', lastName: 'Brown', email: 'charlie.b@example.com', roleId: 'R03' },
  { id: 'USR005', firstName: 'Fiona', lastName: 'Garcia', email: 'fiona.g@example.com', roleId: 'R04' },
  { id: 'USR006', firstName: 'Ethan', lastName: 'Davis', email: 'ethan.d@example.com', roleId: 'R04' },
];
