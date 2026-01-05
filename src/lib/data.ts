import type { Employee, LeaveRequest, PerformanceReview, PayrollRun } from '@/lib/types';

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
];

export const payrollRuns: PayrollRun[] = [
  { id: 'PAY001', period: 'July 2024', runDate: new Date('2024-07-31'), status: 'Completed', totalAmount: 55000.00 },
  { id: 'PAY002', period: 'June 2024', runDate: new Date('2024-06-30'), status: 'Completed', totalAmount: 54500.00 },
  { id: 'PAY003', period: 'May 2024', runDate: new Date('2024-05-31'), status: 'Completed', totalAmount: 54000.00 },
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
  { name: 'Female', value: 25, fill: 'hsl(var(--chart-1))' },
  { name: 'Male', value: 22, fill: 'hsl(var(--chart-2))' },
  { name: 'Other', value: 3, fill: 'hsl(var(--chart-3))' },
];
