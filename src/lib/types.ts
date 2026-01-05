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
