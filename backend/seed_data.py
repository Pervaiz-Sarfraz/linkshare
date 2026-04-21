import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from linkshare.models import Company, Job

def seed():
    print("Seed process started...")
    
    # Create superuser and regular user if not exists
    users_data = [
        {"username": "admin", "email": "admin@example.com", "password": "admin123", "is_super": True},
        {"username": "user", "email": "user@example.com", "password": "user123", "is_super": False},
    ]

    for u_data in users_data:
        if not User.objects.filter(username=u_data['username']).exists():
            if u_data['is_super']:
                User.objects.create_superuser(u_data['username'], u_data['email'], u_data['password'])
                print(f"Created superuser: {u_data['username']} / {u_data['password']} ({u_data['email']})")
            else:
                User.objects.create_user(u_data['username'], u_data['email'], u_data['password'])
                print(f"Created user: {u_data['username']} / {u_data['password']} ({u_data['email']})")
    
    # Create sample companies
    companies_data = [
        {"name": "Tech Corp", "description": "Leading tech company.", "website": "https://techcorp.com", "location": "San Francisco"},
        {"name": "Design Studio", "description": "Creative agency.", "website": "https://designstudio.com", "location": "New York"},
        {"name": "Cyberdyne", "description": "Future tech.", "website": "https://cyberdyne.com", "location": "London"},
    ]
    
    for c_data in companies_data:
        company, created = Company.objects.get_or_create(name=c_data['name'], defaults=c_data)
        if created:
            print(f"Created company: {company.name}")
            
            # Create jobs for this company
            jobs_data = [
                {"title": f"Senior Developer at {company.name}", "description": "Exciting role for expert devs.", "location": company.location},
                {"title": f"Lead Designer at {company.name}", "description": "Creative leadership role.", "location": company.location},
            ]
            for j_data in jobs_data:
                Job.objects.create(company=company, **j_data)
                print(f"  Created job: {j_data['title']}")
    
    print("Seed process completed!")

if __name__ == '__main__':
    seed()
