# myapp/urls.py

from django.urls import path
from .views import google_auth

urlpatterns = [
    # other paths here...
    path('google-auth', google_auth, name='google-auth'),
]

