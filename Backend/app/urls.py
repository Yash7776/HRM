from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    UserDetailView,
    EmployeeView,
    AttendanceView,
    LeaveView,
    SalaryView
)

urlpatterns = [
    # Authentication
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserDetailView.as_view(), name='user_detail'),

    # HR Modules
    path('employees/', EmployeeView.as_view(), name='employees'),
    path('attendance/', AttendanceView.as_view(), name='attendance'),
    path('leaves/', LeaveView.as_view(), name='leaves'),
    path('salary/', SalaryView.as_view(), name='salary'),
]
