from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, username,email, password = None , **extrafields):
        if not email:
            raise ValueError('User must have an email')
        if not username:
            raise ValueError('User must have username')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username,**extrafields)
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, username, password=None, **extrafields):
        user = self.create_user(
            username,
            email,
            password
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user
    
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=12)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
    is_admin = models.BooleanField(default = False)
    
    
    # profile_pic = models.ImageField(upload_to='media/profile', default='media/profile/profile.png')

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    def get_short_name(self):
        return self.first_name

    def serialize(self):
        return{
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'id': self.pk,
            # 'profile_pic': f'http://localhost:8000{self.profile_pic.url}'
        }


    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'


