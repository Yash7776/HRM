from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserRegistrationAPIView,
    UserLoginAPIView,
    UserLogoutAPIView,
    UserProfileAPIView,
    RefreshTokenAPIView,
    RegistrationDataAPIView,
)

urlpatterns = [
    # Authentication endpoints
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('logout/', UserLogoutAPIView.as_view(), name='logout'),
    path('token/refresh/', RefreshTokenAPIView.as_view(), name='token_refresh'),
    
    # Profile endpoints
    path('profile/', UserProfileAPIView.as_view(), name='profile'),
    
    # Registration data
    path('registration-data/', RegistrationDataAPIView.as_view(), name='registration_data'),
]