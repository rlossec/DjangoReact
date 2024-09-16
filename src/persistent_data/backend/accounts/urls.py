
from django.urls import path, include
from django.contrib.auth import views as auth_views

from rest_framework_simplejwt import views as jwt_views

from dj_rest_auth import views as dj_rest_aut_views
from dj_rest_auth.registration import views as dj_rest_aut_registration_views


urlpatterns = [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    # url du front
    path('auth/password/reset/confirm/<uidb64>/<token>/',
         dj_rest_aut_views.PasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),

]
