 
from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        print(' checking onwer')
        return  obj.user == request.user

class IsSafeMethod(permissions.BasePermission):
    def has_permission(self,request,view):
        return request.method in permissions.SAFE_METHODS


        