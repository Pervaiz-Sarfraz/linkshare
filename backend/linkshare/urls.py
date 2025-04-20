
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from linkshare.views import CompanyViewSet, JobViewSet, ApplicationViewSet,RegisterView, LoginView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'jobs', JobViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'applications', ApplicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]