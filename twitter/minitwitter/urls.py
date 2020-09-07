from django.urls import path
from minitwitter.views import (

UserListCreateView,RetriveUpdateProfileView,
TweetListCreateView, CurrentUserView,
FollowingListView,FollowersListView,
FollowingRetriveDestroyView,LikeTweetListView,
LikeTweetRetriveDestroyView)

from rest_framework.authtoken import views

urlpatterns = [

    path('users/', UserListCreateView.as_view(),name='list_users'),

    path('login/', views.obtain_auth_token, name= 'login'),#call after register, give username password

    path('current_user/',CurrentUserView.as_view(),name='allprofile'), #call after login,give token

    path('users/<int:pk>/', RetriveUpdateProfileView.as_view(),name='profile'),

    path('users/<int:pk>/followings/', FollowingListView.as_view(),name='followings'),

    path('users/<int:user_id>/followings/<int:pk>/', FollowingRetriveDestroyView.as_view(),name='unfollow'),

    path('users/<int:pk>/followers/', FollowersListView.as_view(),name='followers'),

    path('tweets/', TweetListCreateView.as_view(),name='timeline'),

    path('tweets/<int:pk>/like/', LikeTweetListView.as_view(),name='like'),

    path('tweets/<int:user_id>/like/<int:pk>/', LikeTweetRetriveDestroyView.as_view(),name='unline'),

]
