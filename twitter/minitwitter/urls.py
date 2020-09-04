from django.urls import path
from minitwitter.views import (UserListCreateView,RetriveUpdateProfileView,
TweetListCreateView,#ProfileRetriveView,
FollowingListView,
FollowersListView,FollowingRetriveDestroyView,
LikeTweetListView,LikeTweetRetriveDestroyView)

from rest_framework.authtoken import views

urlpatterns = [

    path('users/', UserListCreateView.as_view(),name='sign up'),


    path('users/login/', views.obtain_auth_token, name= 'login'),

    # path('users/all/',ProfileRetriveView.as_view(),name='allprofile'),

    path('users/<int:pk>/', RetriveUpdateProfileView.as_view(),name='profile'),

    path('users/<int:pk>/followings/', FollowingListView.as_view(),name='followings')
    ,
    path('users/<int:user_id>/followings/<int:pk>/', FollowingRetriveDestroyView.as_view(),name='unfollow'),

    path('users/<int:pk>/followers/', FollowersListView.as_view(),name='followers'),

    path('tweets/', TweetListCreateView.as_view(),name='timeline'),

    path('tweets/<int:pk>/like/', LikeTweetListView.as_view(),name='like'),

    path('tweets/<int:user_id>/like/<int:pk>/', LikeTweetRetriveDestroyView.as_view(),name='unline'),

]
