from django.db import models
from django.utils import timezone

# ------------------------
# UserAccount Model (Login Table)
# ------------------------
class UserAccount(models.Model):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Employee', 'Employee'),
        ('HR', 'HR'),
    ]

    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)  # store hashed password manually
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Employee')
    status = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True, blank=True)

    @property
    def id(self):
        return self.user_id

    def __str__(self):
        return f"{self.username} ({self.role})"

# ------------------------
# Employee Information
# ------------------------
class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='employee',blank=True,null=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    date_of_birth = models.DateField()
    date_of_joining = models.DateField()
    department = models.CharField(max_length=50)
    designation = models.CharField(max_length=50)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# ------------------------
# Attendance
# ------------------------
class Attendance(models.Model):
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
        ('Leave', 'Leave'),
    ]

    attendance_id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    login_time = models.DateTimeField(null=True, blank=True)
    logout_time = models.DateTimeField(null=True, blank=True)
    working_hours = models.FloatField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Absent')

    def __str__(self):
        return f"{self.employee} - {self.date}"


# ------------------------
# Leave Management
# ------------------------
class Leave(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]
    TYPE_CHOICES = [
        ('Sick', 'Sick'),
        ('Casual', 'Casual'),
        ('Paid', 'Paid'),
        ('Unpaid', 'Unpaid'),
    ]

    leave_id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    leave_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    applied_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee} - {self.leave_type}"


# ------------------------
# Payroll / Salary
# ------------------------
class Salary(models.Model):
    salary_id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    allowances = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_salary = models.DecimalField(max_digits=10, decimal_places=2)
    salary_month = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee} - {self.salary_month}"
