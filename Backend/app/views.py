from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .authentication import CustomJWTAuthentication


from .models import UserAccount, Employee, Attendance, Leave, Salary
from .serializers import (
    UserAccountSerializer,
    EmployeeSerializer,
    AttendanceSerializer,
    LeaveSerializer,
    SalarySerializer,
)


# -----------------------------------------------------------
# 🔹 USER AUTHENTICATION
# -----------------------------------------------------------

class RegisterView(APIView):
    def post(self, request):
        required_fields = ['username', 'password', 'confirm_password', 'role']
        missing_fields = [field for field in required_fields if field not in request.data]

        if missing_fields:
            return Response({
                'error': f'Missing fields: {", ".join(missing_fields)}'
            }, status=status.HTTP_400_BAD_REQUEST)

        username = request.data['username']
        password = request.data['password']
        confirm_password = request.data['confirm_password']
        role = request.data['role']

        if password != confirm_password:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        if role not in ['Admin', 'HR', 'Employee']:
            return Response({'error': 'Invalid role. Must be Admin, HR, or Employee'}, status=status.HTTP_400_BAD_REQUEST)

        if UserAccount.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = UserAccount.objects.create(
            username=username,
            password=make_password(password),
            role=role
        )

        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        required_fields = ['username', 'password']
        missing_fields = [field for field in required_fields if field not in request.data]

        if missing_fields:
            return Response({
                'error': f'Missing fields: {", ".join(missing_fields)}'
            }, status=status.HTTP_400_BAD_REQUEST)

        username = request.data['username']
        password = request.data['password']

        try:
            user = UserAccount.objects.get(username=username)
            if check_password(password, user.password):
                refresh = RefreshToken.for_user(user)
                refresh['user_id'] = user.user_id
                user.last_login = timezone.now()
                user.save()

                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'username': user.username,
                    'role': user.role
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
        except UserAccount.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class UserDetailView(APIView):
    authentication_classes = [CustomJWTAuthentication]

    def get(self, request):
        user = request.user
        user_serializer = UserAccountSerializer(user)

        # Fetch associated Employee details if exists
        employee_data = None
        if hasattr(user, 'employee'):
            employee_serializer = EmployeeSerializer(user.employee)
            employee_data = employee_serializer.data

        return Response({
            "user": user_serializer.data,
            "employee": employee_data
        }, status=status.HTTP_200_OK)


# -----------------------------------------------------------
# 🔹 EMPLOYEE MANAGEMENT
# -----------------------------------------------------------

class EmployeeView(APIView):
    authentication_classes = [CustomJWTAuthentication]

    def get(self, request):
        employees = Employee.objects.all().order_by('-created_at')
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        role = request.user.role
        if role not in ['Admin', 'HR']:
            return Response({'error': 'Access denied. Only Admin or HR can add employees.'}, status=403)

        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Employee added successfully', 'data': serializer.data}, status=201)
        return Response(serializer.errors, status=400)


# -----------------------------------------------------------
# 🔹 ATTENDANCE MANAGEMENT
# -----------------------------------------------------------

class AttendanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        attendance = Attendance.objects.all().order_by('-date')
        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        role = request.user.role
        if role not in ['Admin', 'HR', 'Employee']:
            return Response({'error': 'Access Denied'}, status=403)

        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Attendance marked successfully', 'data': serializer.data}, status=201)
        return Response(serializer.errors, status=400)


# -----------------------------------------------------------
# 🔹 LEAVE MANAGEMENT
# -----------------------------------------------------------

class LeaveView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        leaves = Leave.objects.all().order_by('-applied_on')
        serializer = LeaveSerializer(leaves, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        role = request.user.role
        if role != 'Employee':
            return Response({'error': 'Only Employees can apply for leave'}, status=403)

        serializer = LeaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Leave applied successfully', 'data': serializer.data}, status=201)
        return Response(serializer.errors, status=400)


# -----------------------------------------------------------
# 🔹 SALARY MANAGEMENT
# -----------------------------------------------------------

class SalaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        salary_records = Salary.objects.all().order_by('-salary_month')
        serializer = SalarySerializer(salary_records, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        role = request.user.role
        if role not in ['Admin', 'HR']:
            return Response({'error': 'Only Admin or HR can add salary details'}, status=403)

        serializer = SalarySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Salary record added successfully', 'data': serializer.data}, status=201)
        return Response(serializer.errors, status=400)
