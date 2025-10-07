# from rest_framework.decorators import api_view,permission_classes
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth import authenticate
# from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
# from rest_framework.permissions import AllowAny


from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

# Signup API
@api_view(["POST"])
def signup_view(request):
    data = request.data
    email = data.get("email")
    password = data.get("password")

    if User.objects.filter(email=email).exists():
        return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # First user = admin
    role = "admin" if not User.objects.filter(user_role="admin").exists() else "user"

    user = User.objects.create_user(
        fullname=data.get("fullname"),
        email=email,
        password=password,
        phone=data.get("phone"),
        dob=data.get("dob"),
        gender=data.get("gender"),
        address=data.get("address"),
        user_role=role
    )

    return Response({"message": f"Signup successful. Role: {role}"}, status=status.HTTP_201_CREATED)


# # Login API
# @api_view(["POST"])
# @permission_classes([AllowAny])
# def login_view(request):
#     email = request.data.get("email")
#     password = request.data.get("password")

#     user = authenticate(request, username=email, password=password)
#     if user is None:
#         return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

#     refresh = RefreshToken.for_user(user)
#     access_token = str(refresh.access_token)

#     print("✅ Token created:", access_token)

#     response = Response({
#         "success": True,
#         "message": "Login successful",
#         "role": user.user_role,
#         "token": str(refresh.access_token)
#     })

#     response.set_cookie(
#     key="authToken",
#     value=access_token,
#     httponly=True,
#     secure=False,              # set True only in HTTPS
#     samesite="None",         # allow cross-origin (React frontend + Django backend)
#     path="/",                  # cookie valid everywhere
# )
#     return response





@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(request, username=email, password=password)
    if user is None:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    response = Response({
        "success": True,
        "message": "Login successful",
        "role": user.user_role,
    })

    # Set HttpOnly cookie for JWT
    response.set_cookie(
        key="authToken",
        value=access_token,
        httponly=True,
        secure=True,      # True in production with HTTPS
        samesite="None",   # allow cross-origin
        path="/",
    )
    return response



# Logout API
@api_view(["GET"])   # <-- changed from POST to GET
def logout_view(request):
    response = Response({"message": "Logged out"})
    response.delete_cookie("authToken")  # remove JWT token from cookie
    return response


