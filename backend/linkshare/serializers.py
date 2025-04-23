from rest_framework import serializers
from .models import Company,Job,Application,SavedJob
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['company_id','name', 'description', 'website', 'location','companylogo']  
        read_only_fields = ['company_id']

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


class SavejobSerializer(serializers.ModelSerializer):
    job_title = serializers.SerializerMethodField()
    job_company = serializers.SerializerMethodField()
    job_description = serializers.SerializerMethodField()
    job_location = serializers.SerializerMethodField()
    job_id = serializers.PrimaryKeyRelatedField(source='job', read_only=True)

    class Meta:
        model = SavedJob
        fields = ['id', 'job_id', 'job_title', 'job_company', 'job_description', 'job_location', 'saved_at']

    def get_job_title(self, obj):
        return obj.job.title if obj.job else None

    def get_job_company(self, obj):
        return obj.job.company.name if obj.job and obj.job.company else None

    def get_job_description(self, obj):
        return obj.job.description if obj.job else None

    def get_job_location(self, obj):
        return obj.job.location if obj.job else None


