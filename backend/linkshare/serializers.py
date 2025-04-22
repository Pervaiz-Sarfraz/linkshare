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
    job_id = serializers.PrimaryKeyRelatedField(source='job', read_only=True)

    class Meta:
        model = SavedJob
        fields = ['id', 'job_id', 'job_title', 'saved_at']

    def get_job_title(self, obj):
        return obj.job.title
