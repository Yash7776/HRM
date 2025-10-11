from rest_framework import serializers
from .models import UserAccount, Employee, Attendance, Leave, Salary


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.first_name', read_only=True)

    class Meta:
        model = Attendance
        fields = '__all__'


class LeaveSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.first_name', read_only=True)

    class Meta:
        model = Leave
        fields = '__all__'


class SalarySerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.first_name', read_only=True)

    class Meta:
        model = Salary
        fields = '__all__'
