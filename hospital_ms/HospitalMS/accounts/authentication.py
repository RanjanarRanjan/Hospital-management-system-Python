from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Look for token inside HttpOnly cookie
        token = request.COOKIES.get("authToken")

        if token is None:
            return None  # no auth

        validated_token = self.get_validated_token(token)
        return self.get_user(validated_token), validated_token
