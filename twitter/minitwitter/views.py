from django.db import IntegrityError
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework import filters
from rest_framework import generics, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import get_object_or_404
from .permissions import IsOwner,IsSafeMethod
from minitwitter.models import(
    UserData, UserRelation,
    Tweet, TweetLike,
)
from minitwitter.serializers import(
    UserSerializer, UserDataSerializer,
    UserRelationSerializer, TweetSerializer,
    TweetLikeSerializer
)



class UserListCreateView(generics.ListCreateAPIView):
    '''
    API for registration of a new user
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        current_user = self.request.user
        # following= UserRelation.objects.filter(user=self.request.user).values_list('following',flat=True)
        following_list= current_user.follows.all().values_list('following',flat=True)
        all_users = User.objects.exclude(pk__in=following_list).exclude(id= self.request.user.id)
        return all_users
    


class CurrentUserView(generics.RetrieveAPIView):
    '''
    API View to return detials of logged in user
    '''
    serializer_class = UserSerializer
    permission_classes= (IsAuthenticated,)
    def get_object(self):
        return self.request.user



class ProfileRetriveUpdateView(generics.RetrieveUpdateAPIView):
    '''
    API View for showing profile of a user and for logged in user to edit it's own profile
    '''
    queryset = UserData.objects.all()   
    serializer_class = UserDataSerializer
    permission_classes = (IsAuthenticated,IsOwner)

    
#different generic api for search
class SearchView(generics.ListAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    filter_backends = [filters.SearchFilter]
    search_fields = ['user__username','user__first_name','user__last_name','content']


class TweetListCreateView(generics.ListCreateAPIView):
    '''
    API to post a tweet and display, logged in user's and its following users's tweets
    also to perform full text search
    '''
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    
    def perform_create(self,serializer):
        serializer.save(user= self.request.user)
    
    
    def get_queryset(self):
        all_tweets= Tweet.objects.filter(Q(user=self.request.user)|Q(user__followers__user=self.request.user))
        return all_tweets



class FollowingListView(generics.ListCreateAPIView):
    '''
    API to follow any user as well list the users, logged in user is following
    '''
    queryset = UserRelation.objects.all()
    serializer_class = UserRelationSerializer
    permission_classes = (IsAuthenticated,)

    def filter_queryset(self,queryset):
        return  queryset.filter(user=self.kwargs["pk"])
        
    def perform_create(self,serializer):
        serializer.save(user_id=self.request.user.id)


class FollowingRetriveDestroyView(generics.RetrieveDestroyAPIView):
    '''
    API to unfollow any following user
    '''
    queryset = UserRelation.objects.all()
    serializer_class = UserRelationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return  self.queryset.filter(user=self.request.user)     

    
class FollowersListView(generics.ListAPIView):
    '''
    API to see logged in user's followers
    '''
    queryset = UserRelation.objects.all()
    serializer_class = UserRelationSerializer
    permission_classes = (IsAuthenticated,)

    def filter_queryset(self,queryset):
       return self.queryset.filter(following=self.kwargs["pk"])

class LikeTweetListView(generics.ListCreateAPIView):
    '''
    API to like any tweet
    '''
    queryset = TweetLike.objects.all()
    serializer_class = TweetLikeSerializer
    permission_classes = (IsAuthenticated,)

    def filter_queryset(self,queryset):
        return  queryset.filter(user=self.request.user)

    def perform_create(self,serializer):
        serializer.save(user_id=self.request.user.id)

class LikeTweetRetriveDestroyView(generics.RetrieveDestroyAPIView):
    '''
    API to unlike the liked tweet
    '''
    queryset = TweetLike.objects.all()
    serializer_class = TweetLikeSerializer
    permission_classes = (IsAuthenticated,IsOwner)
    

    def get_queryset(self):
        return  self.queryset.filter(tweet= self.request.user.id)    
