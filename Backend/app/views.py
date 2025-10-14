from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .models import Employee, Department, Designation
from .serializers import (
    DesignationDropdownSerializer,
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserSerializer,
    EmployeeSerializer,
    DepartmentDropdownSerializer
)

# Department APIs
class DepartmentDropdownAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DepartmentDropdownSerializer
    queryset = Department.objects.all()

class DesignationDropdownAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DesignationDropdownSerializer
    queryset = Designation.objects.all()

class UserRegistrationAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            # Get employee data
            employee = Employee.objects.get(user=user)
            employee_serializer = EmployeeSerializer(employee)
            
            return Response({
                'message': 'User registered successfully',
                'user': UserSerializer(user).data,
                'employee': employee_serializer.data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            employee = Employee.objects.get(user=user)
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            # Serialize user and employee data
            user_serializer = UserSerializer(user)
            employee_serializer = EmployeeSerializer(employee)
            
            return Response({
                'message': 'Login successful',
                'user': user_serializer.data,
                'employee': employee_serializer.data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            
            return Response({
                'message': 'Logout successful'
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': 'Invalid token'
            }, status=status.HTTP_400_BAD_REQUEST)

class UserProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        employee = Employee.objects.get(user=user)
        
        user_serializer = UserSerializer(user)
        employee_serializer = EmployeeSerializer(employee)
        
        return Response({
            'user': user_serializer.data,
            'employee': employee_serializer.data
        }, status=status.HTTP_200_OK)

class RefreshTokenAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        refresh_token = request.data.get('refresh')
        
        if not refresh_token:
            return Response({
                'error': 'Refresh token is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            
            return Response({
                'access': access_token
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': 'Invalid or expired refresh token'
            }, status=status.HTTP_400_BAD_REQUEST)

# Additional view to get departments and designations for registration
class RegistrationDataAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        departments = Department.objects.all().values('id', 'name')
        designations = Designation.objects.all().values('id', 'title')
        
        return Response({
            'departments': departments,
            'designations': designations
        }, status=status.HTTP_200_OK)