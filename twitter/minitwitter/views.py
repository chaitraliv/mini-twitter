from django.db import IntegrityError
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework import generics, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import get_object_or_404
from .permissions import IsOwner,IsSafeMethod
from minitwitter.models import(
    UserData, UserRelation,
    Tweet, LikeRelation,
)
from minitwitter.serializers import(
    UserSerializer, UserDataSerializer,
    UserRelationSerializer, TweetSerializer,
    LikeRelationSerializer
)




class UserListCreateView(generics.ListCreateAPIView):
    '''
    API for registration of a new user
    '''
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    


# class ProfileRetriveView(generics.ListAPIView):
#     print('inside the view')
#     serializer_class = UserRelationSerializer
#     permission_classes = (IsAuthenticated,)
#     queryset = UserRelation.objects.all() 
#     def filter_queryset(self,queryset):
#         return queryset.filter(~Q(user=self.request.user))

    


class RetriveUpdateProfileView(generics.RetrieveUpdateAPIView):
    '''
    API View for showing profile of a user and for logged in user to edit it's own profile
    '''
    serializer_class = UserDataSerializer
    permission_classes = (IsAuthenticated,IsOwner,)
    queryset = UserData.objects.all()   



class TweetListCreateView(generics.ListCreateAPIView):
    '''
    API to post a tweet and display of logged in user's and its following users's tweets
    '''
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Tweet.objects.all()

    def perform_create(self,serializer):
        serializer.save(user= self.request.user)
    
    def get_queryset(self):
        all_tweets= Tweet.objects.filter(Q(user=self.request.user)|Q(user__followers__user=self.request.user))
        return all_tweets



class FollowingListView(generics.ListCreateAPIView):
    '''
    API to follow any user as well list the users, logged in user is following
    '''
    serializer_class = UserRelationSerializer
    permission_classes = (IsAuthenticated,IsSafeMethod)
    queryset = UserRelation.objects.all()

    def filter_queryset(self,queryset):
        return  queryset.filter(user=self.request.user)
    def perform_create(self,serializer):
        serializer.save(user_id=self.request.user.id)


class FollowingRetriveDestroyView(generics.RetrieveDestroyAPIView):
    '''
    API to unfollow any following user
    '''
    serializer_class = UserRelationSerializer
    permission_classes = (IsAuthenticated,)
    queryset = UserRelation.objects.all()

    def get_queryset(self):
        return  self.queryset.filter(user=self.request.user)       
    
class FollowersListView(generics.ListAPIView):
    '''
    API to see logged in user's followers
    '''
    serializer_class = UserRelationSerializer
    permission_classes = (IsAuthenticated,)
    queryset = UserRelation.objects.all()

    def filter_queryset(self,queryset):
       return self.queryset.filter(user=self.request.user)

class LikeTweetListView(generics.ListCreateAPIView):
    '''
    API to like any tweet
    '''
    serializer_class = LikeRelationSerializer
    permission_classes = (IsAuthenticated,)
    queryset = LikeRelation.objects.all()

    def filter_queryset(self,queryset):
        return  queryset.filter(user=self.request.user)
    def perform_create(self,serializer):
        serializer.save(user_id=self.request.user.id)

class LikeTweetRetriveDestroyView(generics.RetrieveDestroyAPIView):
    '''
    API to unlike the liked tweet
    '''
    serializer_class = LikeRelationSerializer
    permission_classes = (IsAuthenticated,)
    queryset = LikeRelation.objects.all()

    def get_queryset(self):
         return  self.queryset.filter(user=self.request.user)    
