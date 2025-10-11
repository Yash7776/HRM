from django.contrib import admin
from .models import Salary,Employee,UserAccount,Attendance,Leave
# Register your models here.

admin.site.register(Salary)
admin.site.register(Employee)
admin.site.register(UserAccount)
admin.site.register(Attendance)
admin.site.register(Leave)

