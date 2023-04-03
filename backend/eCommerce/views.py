from django.shortcuts import render,redirect

from rest_framework.response import Response
from rest_framework import status


# Create your views here.
def google_auth(request):
    redirect_url = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:5173/google&prompt=consent&response_type=code&client_id=610673970685-ssh27o6b808ht7j0mdvnudtpqq54ra1s.apps.googleusercontent.com&scope=openid%20email%20profile'
    return redirect(redirect_url)

