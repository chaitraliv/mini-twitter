from django.urls import path
from minitwitter.views import (

UserListCreateView,ProfileRetriveUpdateView,
TweetListCreateView, CurrentUserView,
FollowingListView,FollowersListView,
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

    path('users/<int:pk>/followings/', FollowingListView.as_view(),name='followings'),

    path('users/<int:user_id>/followings/<int:pk>/', FollowingRetriveDestroyView.as_view(),name='unfollow'),

    path('users/<int:pk>/followers/', FollowersListView.as_view(),name='followers'),

    path('tweets/', TweetListCreateView.as_view(),name='timeline'),

    path('users/<int:user_id>/tweets/<int:pk>/', TweetUpdateDestroyView.as_view(),name='tweet_update'),

    path('tweets/<int:pk>/like/', LikeTweetListView.as_view(),name='like'),

    path('tweets/<int:user_id>/like/<int:pk>/', LikeTweetRetriveDestroyView.as_view(),name='unlike'), 

]
