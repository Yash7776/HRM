from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from .models import UserAccount

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            user_id = validated_token.get('user_id')
            user = UserAccount.objects.get(user_id=user_id)
        except UserAccount.DoesNotExist:
            raise AuthenticationFailed('User not found', code='user_not_found')
        return user
