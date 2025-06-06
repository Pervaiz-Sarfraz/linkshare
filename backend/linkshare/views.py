from django.shortcuts import render
from rest_framework import viewsets
from .models import Company, Job, Application,SavedJob
from .serializers import CompanySerializer,JobSerializer,ApplicationSerializer,SavejobSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer 
    permission_classes = [IsAuthenticatedOrReadOnly]
    # In your view (e.g., CompanyViewSet or APIView)
def get_serializer_context(self):
    return {'request': self.request}

    
class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by('-applied_at')
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegisterView(APIView):
    def post(self, request):
        email= request.data.get('email')
        username = request.data.get('username') or email.split('@')[0]
        password = request.data.get("password")

        if User.objects.filter(email=email).exists():
            return Response({ "error": "User not found" }, status=400)
        
        user = User.objects.create_user(username=username, password=password,email=email)
        return Response({"message": "User created"}, status=201)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid email"}, status=401)
        
        user = authenticate(username=user.username, password=password)
        
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "id": user.id,
                "username": user.username,
                "email": user.email
            })
        return Response({"error": "Invalid credentials"}, status=401)
    
class SavedJobViewSet(viewsets.ModelViewSet):
    serializer_class = SavejobSerializer
    queryset = SavedJob.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedJob.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        job_id = self.request.data.get('job_id')
        job = Job.objects.get(id=job_id)
        serializer.save(user=self.request.user, job=job)

    def create(self, request, *args, **kwargs):
        job_id = request.data.get('job_id')
        if SavedJob.objects.filter(user=request.user, job_id=job_id).exists():
            return Response({"detail": "Job already saved"}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)
