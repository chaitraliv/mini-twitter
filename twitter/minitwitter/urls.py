from django.urls import path
from minitwitter.views import (

UserListCreateView,ProfileRetriveUpdateView,
TweetListCreateView, CurrentUserView,
FollowingFollowerListView,
FollowingRetriveDestroyView,LikeTweetListView,
LikeTweetRetriveDestroyView, SearchView,
TweetUpdateDestroyView)

from rest_framework.authtoken import views

urlpatterns = [

    path('users/', UserListCreateView.as_view(),name='list_users'),

    path('login/', views.obtain_auth_token, name= 'login'),

    path('current_user/',CurrentUserView.as_view(),name='allprofile'), 

    path('search/', SearchView.as_view(),name='search'),

    path('users/<int:pk>/', ProfileRetriveUpdateView.as_view(),name='profile'), 

    path('users/<int:pk>/follow/', FollowingFollowerListView.as_view(),name='followings_followers'),

    path('users/<int:user_id>/unfollow/<int:pk>/', FollowingRetriveDestroyView.as_view(),name='unfollow'),

    path('tweets/', TweetListCreateView.as_view(),name='timeline'),

    path('tweets/<int:pk>/', TweetUpdateDestroyView.as_view(),name='tweet_update'),

    path('tweets/<int:pk>/like/', LikeTweetListView.as_view(),name='like_tweet'),

    path('tweets/<int:tweet_id>/like/<int:pk>/', LikeTweetRetriveDestroyView.as_view(),name='unlike')

]
