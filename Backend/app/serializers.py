from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Department, Designation, Employee

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    # Employee fields
    employee_id = serializers.CharField(required=True)
    date_of_birth = serializers.DateField(required=True)
    phone_number = serializers.CharField(required=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=True)
    designation = serializers.PrimaryKeyRelatedField(queryset=Designation.objects.all(), required=True)
    date_joined = serializers.DateField(required=True)

    class Meta:
        model = User
        fields = (
            'username', 'password', 'password2', 'email', 
            'first_name', 'last_name',
            'employee_id', 'date_of_birth', 'phone_number',
            'department', 'designation', 'date_joined'
        )
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        # Check if employee_id already exists
        if Employee.objects.filter(employee_id=attrs['employee_id']).exists():
            raise serializers.ValidationError({"employee_id": "Employee ID already exists."})

        return attrs

    def create(self, validated_data):
        # Remove employee fields from user data
        employee_data = {
            'employee_id': validated_data.pop('employee_id'),
            'date_of_birth': validated_data.pop('date_of_birth'),
            'phone_number': validated_data.pop('phone_number'),
            'department': validated_data.pop('department'),
            'designation': validated_data.pop('designation'),
            'date_joined': validated_data.pop('date_joined'),
        }
        
        # Remove password2
        validated_data.pop('password2')
        
        # Create User
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        user.set_password(validated_data['password'])
        user.save()
        
        # Create Employee
        employee = Employee.objects.create(
            user=user,
            **employee_data
        )
        
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = User.objects.filter(username=username).first()
            
            if user and user.check_password(password):
                if not user.is_active:
                    raise serializers.ValidationError("User account is disabled.")
                
                # Check if user has employee profile
                try:
                    employee = user.employee
                    if not employee.is_active:
                        raise serializers.ValidationError("Employee account is inactive.")
                except Employee.DoesNotExist:
                    raise serializers.ValidationError("Employee profile not found.")
                
                attrs['user'] = user
                return attrs
            else:
                raise serializers.ValidationError("Invalid credentials.")
        else:
            raise serializers.ValidationError("Both username and password are required.")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    designation_title = serializers.CharField(source='designation.title', read_only=True)
    
    class Meta:
        model = Employee
        fields = (
            'id', 'user', 'employee_id', 'department', 'department_name',
            'designation', 'designation_title', 'date_of_birth', 'gender',
            'phone_number', 'work_email', 'date_joined', 'is_active'
        )

# Simple serializers for dropdowns (if you only need basic data)
class DepartmentDropdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name']

class DesignationDropdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designation
        fields = ['id', 'title', 'level']