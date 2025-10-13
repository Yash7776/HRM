from django.contrib import admin
from .models import *

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']

@admin.register(Designation)
class DesignationAdmin(admin.ModelAdmin):
    list_display = ['title', 'level']
    search_fields = ['title']

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['employee_id', 'user', 'department', 'designation', 'date_joined', 'is_active']
    list_filter = ['department', 'designation', 'employment_type', 'is_active']
    search_fields = ['employee_id', 'user__first_name', 'user__last_name', 'work_email']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ['employee', 'date', 'check_in', 'check_out', 'status', 'hours_worked']
    list_filter = ['status', 'date']
    search_fields = ['employee__user__first_name', 'employee__user__last_name']

@admin.register(LeaveType)
class LeaveTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'max_days', 'is_active']
    list_filter = ['is_active']

@admin.register(Leave)
class LeaveAdmin(admin.ModelAdmin):
    list_display = ['employee', 'leave_type', 'start_date', 'end_date', 'total_days', 'status']
    list_filter = ['status', 'leave_type', 'start_date']
    search_fields = ['employee__user__first_name', 'employee__user__last_name']

@admin.register(Salary)
class SalaryAdmin(admin.ModelAdmin):
    list_display = ['employee', 'basic_salary', 'net_salary', 'effective_from', 'is_active']
    list_filter = ['is_active', 'effective_from']
    readonly_fields = ['gross_salary', 'net_salary']

@admin.register(Payroll)
class PayrollAdmin(admin.ModelAdmin):
    list_display = ['employee', 'month', 'year', 'net_salary', 'is_paid']
    list_filter = ['month', 'year', 'is_paid']
    search_fields = ['employee__user__first_name', 'employee__user__last_name']

@admin.register(PerformanceReview)
class PerformanceReviewAdmin(admin.ModelAdmin):
    list_display = ['employee', 'reviewer', 'review_date', 'rating', 'is_approved']
    list_filter = ['rating', 'is_approved', 'review_date']
    search_fields = ['employee__user__first_name', 'employee__user__last_name']

@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ['name', 'trainer', 'start_date', 'end_date', 'is_active']
    list_filter = ['is_active', 'start_date']
    search_fields = ['name', 'trainer']

@admin.register(TrainingEnrollment)
class TrainingEnrollmentAdmin(admin.ModelAdmin):
    list_display = ['employee', 'training', 'enrollment_date', 'status', 'certificate_issued']
    list_filter = ['status', 'certificate_issued']
    search_fields = ['employee__user__first_name', 'training__name']

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['employee', 'document_type', 'title', 'uploaded_at']
    list_filter = ['document_type', 'uploaded_at']
    search_fields = ['employee__user__first_name', 'title']

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['employee', 'title', 'notification_type', 'is_read', 'created_at']
    list_filter = ['notification_type', 'is_read', 'created_at']
    search_fields = ['employee__user__first_name', 'title']