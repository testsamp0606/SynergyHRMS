



export type Employee = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: 'Engineering' | 'HR' | 'Marketing' | 'Sales' | 'Design';
  role: string;
  status: 'Active' | 'On Leave' | 'Inactive';
};

export type LeaveRequestStatus = 
  | 'Pending Manager Approval'
  | 'Pending Admin Approval'
  | 'Approved'
  | 'Rejected'
  | 'Cancelled';

export type LeaveRequest = {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  leaveType: 'Vacation' | 'Sick' | 'Personal';
  startDate: Date;
  endDate: Date;
  status: LeaveRequestStatus;
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

export type EmployeeDashboardSummary = {
  leaveBalance: {
    used: number;
    total: number;
  };
  upcomingPayslip: {
    period: string;
    payDate: string;
    netPay: string;
  };
  pendingExpenses: {
    count: number;
    totalAmount: string;
  };
  attendanceSummary: {
    present: number;
    absent: number;
    onLeave: number;
  };
  leaveBreakdown: {
    vacation: number;
    sick: number;
    personal: number;
  };
  performanceTrend: {
    cycle: string;
    rating: number;
  }[];
};

export type RecentAnnouncement = {
  id: string;
  title: string;
  date: string;
  target: 'Everyone' | 'Engineering' | 'HR' | 'Marketing' | 'Sales' | 'Design';
}

export type EmployeeTask = {
  id: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
}

export type PerformanceGoal = {
    id: string;
    title: string;
    description: string;
    progress: number;
    status: 'On Track' | 'At Risk' | 'Completed' | 'In Progress';
};

export type PerformanceCycle = {
    id: string;
    cycleName: string;
    startDate: Date;
    endDate: Date;
    goals: PerformanceGoal[];
    selfAppraisal: string;
    managerFeedback: string;
};

export type HistoricalPerformanceReview = {
    id: string;
    cycleName: string;
    status: 'Completed';
    rating: number; // e.g., 1-5
};

export type AttendanceRecord = {
    status: string;
    checkIn?: string;
    checkOut?: string;
    totalHours?: string;
}

export type AttendanceData = {
    [key: string]: AttendanceRecord;
}

export type UpcomingEvent = {
    date: string;
    name: string;
}
