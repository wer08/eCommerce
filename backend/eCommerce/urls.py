# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    # other paths here...
    path('dj-rest-auth/google/', views.GoogleLogin.as_view(), name='google-login'),
]

