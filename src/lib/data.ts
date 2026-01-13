
import { addDays, format, subDays, subMonths } from 'date-fns';
import type { Employee, LeaveRequest, PerformanceReview, PayrollRun, TrainingProgram, Asset, ExpenseClaim, Document, Announcement, UserProfile, Role, AuditLog, EmployeeDashboardSummary, RecentAnnouncement, EmployeeTask, PerformanceCycle, PerformanceGoal, HistoricalPerformanceReview, AttendanceData } from '@/lib/types';

export const employees: Employee[] = [
  { id: 'EMP001', name: 'Alice Johnson', email: 'alice.j@example.com', avatar: 'https://picsum.photos/seed/1/100/100', department: 'Engineering', role: 'Senior Software Engineer', status: 'Active' },
  { id: 'EMP002', name: 'Bob Williams', email: 'bob.w@example.com', avatar: 'https://picsum.photos/seed/2/100/100', department: 'HR', role: 'HR Manager', status: 'Active' },
  { id: 'EMP003', name: 'Charlie Brown', email: 'charlie.b@example.com', avatar: 'https://picsum.photos/seed/3/100/100', department: 'Marketing', role: 'Marketing Lead', status: 'Active' },
  { id: 'EMP004', name: 'Diana Miller', email: 'diana.m@example.com', avatar: 'https://picsum.photos/seed/4/100/100', department: 'Sales', role: 'Sales Executive', status: 'On Leave' },
  { id: 'EMP005', name: 'Ethan Davis', email: 'ethan.d@example.com', avatar: 'https://picsum.photos/seed/5/100/100', department: 'Design', role: 'UI/UX Designer', status: 'Active' },
  { id: 'EMP006', name: 'Fiona Garcia', email: 'fiona.g@example.com', avatar: 'https://picsum.photos/seed/6/100/100', department: 'Engineering', role: 'Frontend Developer', status: 'Active' },
  { id: 'EMP007', name: 'George Clark', email: 'george.c@example.com', avatar: 'https://picsum.photos/seed/7/100/100', department: 'Sales', role: 'Sales Manager', status: 'Active' },
  { id: 'EMP008', name: 'Hannah Lewis', email: 'hannah.l@example.com', avatar: 'https://picsum.photos/seed/8/100/100', department: 'Engineering', role: 'Backend Developer', status: 'Active' },
  { id: 'EMP009', name: 'Ian Walker', email: 'ian.w@example.com', avatar: 'https://picsum.photos/seed/9/100/100', department: 'Design', role: 'Graphic Designer', status: 'Active' },
  { id: 'EMP010', name: 'Jane Hall', email: 'jane.h@example.com', avatar: 'https://picsum.photos/seed/10/100/100', department: 'HR', role: 'HR Generalist', status: 'Active' },
  { id: 'EMP011', name: 'Kyle Young', email: 'kyle.y@example.com', avatar: 'https://picsum.photos/seed/11/100/100', department: 'Marketing', role: 'Content Strategist', status: 'Active' },
  { id: 'EMP012', name: 'Liam King', email: 'liam.k@example.com', avatar: 'https://picsum.photos/seed/12/100/100', department: 'Engineering', role: 'DevOps Engineer', status: 'Active' },
  { id: 'EMP013', name: 'Mia Wright', email: 'mia.w@example.com', avatar: 'https://picsum.photos/seed/13/100/100', department: 'Sales', role: 'Account Executive', status: 'Inactive' },
  { id: 'EMP014', name: 'Noah Scott', email: 'noah.s@example.com', avatar: 'https://picsum.photos/seed/14/100/100', department: 'Engineering', role: 'QA Engineer', status: 'Active' },
  { id: 'EMP015', name: 'Olivia Green', email: 'olivia.g@example.com', avatar: 'https://picsum.photos/seed/15/100/100', department: 'Design', role: 'Product Designer', status: 'On Leave' },
  { id: 'EMP016', name: 'Peter Adams', email: 'peter.a@example.com', avatar: 'https://picsum.photos/seed/16/100/100', department: 'Marketing', role: 'SEO Specialist', status: 'Active' },
  { id: 'EMP017', name: 'Quinn Baker', email: 'quinn.b@example.com', avatar: 'https://picsum.photos/seed/17/100/100', department: 'HR', role: 'Recruiter', status: 'Active' },
  { id: 'EMP018', name: 'Rachel Carter', email: 'rachel.c@example.com', avatar: 'https://picsum.photos/seed/18/100/100', department: 'Engineering', role: 'Mobile Developer', status: 'Active' },
  { id: 'EMP019', name: 'Samuel Turner', email: 'samuel.t@example.com', avatar: 'https://picsum.photos/seed/19/100/100', department: 'Sales', role: 'Sales Development Rep', status: 'Active' },
  { id: 'EMP020', name: 'Tara Phillips', email: 'tara.p@example.com', avatar: 'https://picsum.photos/seed/20/100/100', department: 'Engineering', role: 'Data Scientist', status: 'Active' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'LR001', employeeName: 'Diana Miller', employeeAvatar: 'https://picsum.photos/seed/4/100/100', leaveType: 'Vacation', startDate: new Date('2024-08-10'), endDate: new Date('2024-08-20'), status: 'Approved' },
  { id: 'LR002', employeeName: 'Ethan Davis', employeeAvatar: 'https://picsum.photos/seed/5/100/100', leaveType: 'Sick', startDate: new Date(), endDate: new Date(), status: 'Pending Manager Approval' },
  { id: 'LR003', employeeName: 'Charlie Brown', employeeAvatar: 'https://picsum.photos/seed/3/100/100', leaveType: 'Personal', startDate: new Date(new Date().setDate(new Date().getDate() + 5)), endDate: new Date(new Date().setDate(new Date().getDate() + 7)), status: 'Pending Admin Approval' },
  { id: 'LR004', employeeName: 'Fiona Garcia', employeeAvatar: 'https://picsum.photos/seed/6/100/100', leaveType: 'Vacation', startDate: new Date(new Date().setDate(new Date().getDate() + 2)), endDate: new Date(new Date().setDate(new Date().getDate() + 8)), status: 'Pending Manager Approval' },
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
  { id: 'AST008', name: 'iPhone 15 Pro', category: 'Other', serialNumber: 'IP15P-54321', purchaseDate: new Date('2024-03-01'), value: 999, assignedTo: 'George Clark', assignedAvatar: 'https://picsum.photos/seed/7/100/100', status: 'Assigned' },
  { id: 'AST009', name: 'Logitech MX Master 3S', category: 'Mouse', serialNumber: 'SN-LOGI-M-98765', purchaseDate: new Date('2023-09-05'), value: 99, status: 'Unassigned' },
  { id: 'AST010', name: 'iPad Pro 11"', category: 'Other', serialNumber: 'IPADPRO-11-ABCDE', purchaseDate: new Date('2023-10-10'), value: 799, status: 'Retired' },
  { id: 'AST011', name: 'Microsoft Surface Laptop 5', category: 'Laptop', serialNumber: 'MS-SL5-13579', purchaseDate: new Date('2024-01-20'), value: 1299, assignedTo: 'Kyle Young', assignedAvatar: 'https://picsum.photos/seed/11/100/100', status: 'Assigned' },
  { id: 'AST012', name: 'Jabra Evolve 75', category: 'Headset', serialNumber: 'SN-JABRA-H-24680', purchaseDate: new Date('2023-11-15'), value: 279, assignedTo: 'Samuel Turner', assignedAvatar: 'https://picsum.photos/seed/19/100/100', status: 'Assigned' },
  { id: 'AST013', name: 'Dell 24" Monitor', category: 'Monitor', serialNumber: 'SN-DELL-24-97531', purchaseDate: new Date('2024-02-28'), value: 249, status: 'Unassigned' },
  { id: 'AST014', name: 'Anker PowerConf C300', category: 'Other', serialNumber: 'SN-ANKER-WC-86420', purchaseDate: new Date('2024-04-05'), value: 129, assignedTo: 'Rachel Carter', assignedAvatar: 'https://picsum.photos/seed/18/100/100', status: 'Assigned' },
  { id: 'AST015', name: 'Lenovo ThinkPad X1 Carbon', category: 'Laptop', serialNumber: 'LEN-X1C-12345', purchaseDate: new Date('2023-04-12'), value: 1599, assignedTo: 'Tara Phillips', assignedAvatar: 'https://picsum.photos/seed/20/100/100', status: 'Assigned' },
  { id: 'AST016', name: 'Keychron K2', category: 'Keyboard', serialNumber: 'SN-KEY-K2-54321', purchaseDate: new Date('2023-06-20'), value: 89, assignedTo: 'Ian Walker', assignedAvatar: 'https://picsum.photos/seed/9/100/100', status: 'Assigned' },
  { id: 'AST017', name: 'Samsung 32" Odyssey G7', category: 'Monitor', serialNumber: 'SN-SAM-32-67890', purchaseDate: new Date('2024-05-01'), value: 699, assignedTo: 'Liam King', assignedAvatar: 'https://picsum.photos/seed/12/100/100', status: 'Assigned' },
  { id: 'AST018', name: 'Google Pixel 8', category: 'Other', serialNumber: 'GP8-13579', purchaseDate: new Date('2024-03-18'), value: 699, status: 'Unassigned' },
  { id: 'AST019', name: 'Bose QuietComfort Earbuds II', category: 'Headset', serialNumber: 'SN-BOSE-EB-24680', purchaseDate: new Date('2023-12-22'), value: 299, assignedTo: 'Olivia Green', assignedAvatar: 'https://picsum.photos/seed/15/100/100', status: 'Assigned' },
  { id: 'AST020', name: 'HP EliteBook 840', category: 'Laptop', serialNumber: 'HP-E840-97531', purchaseDate: new Date('2022-09-30'), value: 1399, status: 'Retired' },
];


export const expenseClaims: ExpenseClaim[] = [
    { id: 'CLM001', employeeName: 'Alice Johnson', employeeAvatar: 'https://picsum.photos/seed/1/100/100', category: 'Travel', submissionDate: new Date('2024-08-01'), amount: 250.75, status: 'Approved', description: 'Client meeting in SF' },
    { id: 'CLM002', employeeName: 'Charlie Brown', employeeAvatar: 'https://picsum.photos/seed/3/100/100', category: 'Food', submissionDate: new Date('2024-08-05'), amount: 85.50, status: 'Pending', description: 'Team lunch' },
    { id: 'CLM003', employeeName: 'Fiona Garcia', employeeAvatar: 'https://picsum.photos/seed/6/100/100', category: 'Supplies', submissionDate: new Date('2024-08-02'), amount: 120.00, status: 'Pending', description: 'Office supplies' },
    { id: 'CLM004', employeeName: 'Ethan Davis', employeeAvatar: 'https://picsum.photos/seed/5/100/100', category: 'Other', submissionDate: new Date('2024-07-28'), amount: 50.00, status: 'Rejected', description: 'Online course' },
    { id: 'CLM005', employeeName: 'Alice Johnson', employeeAvatar: 'https://picsum.photos/seed/1/100/100', category: 'Food', submissionDate: new Date('2024-08-10'), amount: 45.30, status: 'Pending', description: 'Dinner with client' },
];

export const documents: Document[] = Array.from({ length: 25 }, (_, i) => {
    const categories = ['HR Policies', 'Contracts', 'Payslips', 'Compliance', 'Project Plans'];
    const users = ['Admin User', 'Bob Williams', 'System'];
    const employeeNames = ['Alice Johnson', 'Charlie Brown', 'Fiona Garcia', 'Ethan Davis'];
    const docType = ['Employee Handbook', 'Employment Contract', 'Payslip', 'Work From Home Policy', 'Form 16', 'Project Phoenix Plan', 'Q3 Marketing Strategy'];
    const randomCategory = categories[i % categories.length];
    const randomUser = users[i % users.length];
    let randomTitle = docType[i % docType.length];

    if (randomCategory === 'Contracts' || randomCategory === 'Payslips' || randomCategory === 'Compliance' && i < employeeNames.length) {
        randomTitle = `${randomTitle} - ${employeeNames[i]}`;
    }

    return {
        id: `DOC${String(i + 1).padStart(3, '0')}`,
        title: `${randomTitle} ${randomCategory === 'Payslips' ? subMonths(new Date(), i).toLocaleString('default', { month: 'long', year: 'numeric' }) : ''}`,
        category: randomCategory as 'HR Policies' | 'Contracts' | 'Payslips' | 'Compliance',
        version: `1.${i % 4}`,
        lastUpdated: subDays(new Date(), i * 5),
        uploadedBy: randomUser,
    };
});

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

export const users: UserProfile[] = employees.map((emp, index) => {
    let roleId = 'R04'; // Default to Employee
    if (emp.role === 'HR Manager') roleId = 'R02';
    else if (emp.role.includes('Manager') || emp.role.includes('Lead')) roleId = 'R03';
    else if (emp.email === 'admin@synergy.com') roleId = 'R01';

    return {
        id: `USR${String(index + 1).padStart(3, '0')}`,
        firstName: emp.name.split(' ')[0],
        lastName: emp.name.split(' ').slice(1).join(' '),
        email: emp.email,
        roleId: roleId,
    };
});

export const auditLogs: AuditLog[] = Array.from({ length: 30 }, (_, i) => {
    const actions: AuditLog['action'][] = ['USER_LOGIN', 'CREATE_EMPLOYEE', 'UPDATE_ROLE', 'RUN_PAYROLL', 'EXPORT_DATA'];
    const randomUser = users[i % users.length];
    const employee = employees.find(e => e.email === randomUser.email);
    const action = actions[i % actions.length];

    let details = 'Action performed successfully.';
    if (action === 'USER_LOGIN') details = 'User logged in successfully.';
    if (action === 'CREATE_EMPLOYEE') details = `Created new employee: ${employees[(i + 1) % employees.length].name}`;
    if (action === 'UPDATE_ROLE') details = `Changed role for ${employees[(i + 2) % employees.length].name}`;
    if (action === 'RUN_PAYROLL') details = `Completed payroll run for ${format(subMonths(new Date(), i), 'MMMM yyyy')}`;
    if (action === 'EXPORT_DATA') details = 'Exported employee data (CSV)';

    return {
        id: `LOG${String(i + 1).padStart(3, '0')}`,
        user: `${randomUser.firstName} ${randomUser.lastName}`,
        userAvatar: employee?.avatar || 'https://picsum.photos/seed/default/100/100',
        action: action,
        details: details,
        date: subDays(new Date(), i),
        ipAddress: `192.168.1.${i + 10}`,
    };
});


export const employeeDashboardSummary: EmployeeDashboardSummary = {
  leaveBalance: {
    used: 5,
    total: 20,
  },
  upcomingPayslip: {
    period: 'August 2024',
    payDate: 'Aug 31, 2024',
    netPay: '$4,500.00',
  },
  pendingExpenses: {
    count: 2,
    totalAmount: '$130.80',
  },
  attendanceSummary: {
    present: 18,
    absent: 1,
    onLeave: 2,
  },
  leaveBreakdown: {
    vacation: 5,
    sick: 2,
    personal: 1,
  },
  performanceTrend: [
    { cycle: 'H1 2023', rating: 4.0 },
    { cycle: 'H2 2023', rating: 4.2 },
    { cycle: 'H1 2024', rating: 4.5 },
  ],
};

export const recentAnnouncements: RecentAnnouncement[] = [
    { id: 'ANN001', title: 'Q3 2024 All-Hands Meeting', date: 'Aug 15, 2024', target: 'Everyone' },
    { id: 'ANN002', title: 'New Engineering Library: `synergy-ui`', date: 'Aug 10, 2024', target: 'Engineering' },
];

export const employeeTasks: EmployeeTask[] = [
    { id: 'TSK001', title: 'Complete performance self-assessment', dueDate: 'Due Aug 25, 2024', status: 'Pending' },
    { id: 'TSK002', title: 'Finish mandatory cybersecurity training', dueDate: 'Due Sep 01, 2024', status: 'Pending' },
    { id: 'TSK003', title: 'Update personal contact information', dueDate: 'Completed', status: 'Completed' },
];

export const currentPerformanceCycle: PerformanceCycle = {
    id: 'CYCLE2024H2',
    cycleName: 'H2 2024 Performance Review',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-12-31'),
    selfAppraisal: "This cycle, I successfully led the 'synergy-ui' component library project, which was adopted by three other teams. I also improved the performance of the main dashboard by 15%. I'd like to focus on mentoring junior developers more in the next cycle.",
    managerFeedback: '', // Not yet provided
    goals: [
        { id: 'GOAL01', title: 'Launch v1 of `synergy-ui` library', description: 'Successfully design, build, and launch the first version of the internal component library.', progress: 100, status: 'Completed' },
        { id: 'GOAL02', title: 'Improve dashboard load time by 10%', description: 'Optimize front-end assets and API calls to reduce the main dashboard\'s initial load time.', progress: 100, status: 'Completed' },
        { id: 'GOAL03', title: 'Mentor one junior developer', description: 'Provide regular guidance and support to a junior member of the team.', progress: 75, status: 'In Progress' },
    ],
};

export const performanceHistory: HistoricalPerformanceReview[] = [
    { id: 'HIST01', cycleName: 'H1 2024 Performance Review', status: 'Completed', rating: 5 },
    { id: 'HIST02', cycleName: 'H2 2023 Performance Review', status: 'Completed', rating: 4 },
    { id: 'HIST03', cycleName: 'H1 2023 Performance Review', status: 'Completed', rating: 4 },
];

export const attendanceData: AttendanceData = {
  [format(addDays(new Date(), -1), 'yyyy-MM-dd')]: { status: 'Present', checkIn: '09:00 AM', checkOut: '06:00 PM', totalHours: '9h 0m' },
  [format(addDays(new Date(), -2), 'yyyy-MM-dd')]: { status: 'Absent' },
  [format(addDays(new Date(), -3), 'yyyy-MM-dd')]: { status: 'On Leave' },
  [format(addDays(new Date(), -4), 'yyyy-MM-dd')]: { status: 'Present', checkIn: '09:15 AM', checkOut: '06:05 PM', totalHours: '8h 50m' },
  [format(addDays(new Date(), -9), 'yyyy-MM-dd')]: { status: 'Half Day' },
  [format(addDays(new Date(), -10), 'yyyy-MM-dd')]: { status: 'Week Off' },
  [format(addDays(new Date(), -11), 'yyyy-MM-dd')]: { status: 'Week Off' },
};

export const holidays = [
    { date: new Date(2024, 7, 15), name: 'Independence Day' },
    { date: new Date(2024, 9, 31), name: 'Diwali' },
    { date: new Date(2026, 0, 1), name: "New Year's Day" },
    { date: new Date(2026, 0, 19), name: 'Martin Luther King, Jr. Day' },
    { date: new Date(2026, 4, 25), name: 'Memorial Day'},
    { date: new Date(2026, 6, 3), name: 'Independence Day'},
    { date: new Date(2026, 8, 7), name: 'Labor Day'},
];

export const leaveTrends = [
  { month: 'Mar', requests: 10 },
  { month: 'Apr', requests: 12 },
  { month: 'May', requests: 15 },
  { month: 'Jun', requests: 14 },
  { month: 'Jul', requests: 18 },
  { month: 'Aug', requests: 20 },
];

export const latestPayroll = {
  period: 'August 2024',
  status: 'Pending',
};

export const complianceAlerts = [
  { id: 'CMP01', title: 'Annual Anti-Harassment Training', dueDate: 'Sep 30, 2024' },
  { id: 'CMP02', title: 'Form I-9 Reverification for 3 employees', dueDate: 'Aug 31, 2024' },
];

export { type Employee };
