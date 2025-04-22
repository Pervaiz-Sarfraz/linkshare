from rest_framework import serializers
from .models import Company,Job,Application
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['company_id','name', 'description', 'website', 'companylogo']  
        

class JobSerializer(serializers.ModelSerializer):
    job_id = serializers.IntegerField(source='id', read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), source='company')
    company = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = Job
        fields = ['job_id', 'title', 'description', 'location', 'company_id', 'company']

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['user', 'job', 'resume', 'applied_at']