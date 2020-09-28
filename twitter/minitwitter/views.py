from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework import filters
from rest_framework import generics, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IsOwner 
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

    ''' Function to display all users from the data base, except the ones user follows '''
    def get_queryset(self):
        current_user = self.request.user
        following_list= current_user.follows.all().values_list('following',flat=True)
        all_users = User.objects.exclude(pk__in=following_list).exclude(id= self.request.user.id)
        return all_users
    


class CurrentUserView(generics.RetrieveAPIView):
    '''
    API View to return user instance of the current logged in user
    '''
    serializer_class = UserSerializer
    permission_classes= (IsAuthenticated,)
    def get_object(self):
        return self.request.user



class ProfileRetriveUpdateView(generics.RetrieveUpdateAPIView):
    '''
    API View for showing profile of any user
    also for logged in user to update his profile
    '''
    queryset = UserData.objects.all()   
    serializer_class = UserDataSerializer
    permission_classes = (IsAuthenticated,IsOwner)

    

class SearchView(generics.ListAPIView):
    '''
    APIView for full text search
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    filter_backends = [filters.SearchFilter]
    search_fields = ['username','first_name','last_name','tweets__content']




class TweetListCreateView(generics.ListCreateAPIView):
    '''
    API to post a tweet and display, logged in user's and its following users's tweets
    '''
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    ''' To save the tweet '''    
    def perform_create(self,serializer):
        serializer.save(user= self.request.user)
    
    ''' Timeline function to display tweets of logged in user and user it follows'''
    def get_queryset(self):
        current_user = self.request.user
        list_type = self.request.query_params['list']

        
        if list_type == 'user':
            all_users = Tweet.objects.filter(user= current_user)
            return all_users

        elif list_type == 'timeline':
            '''tweets of logged user and user it follows'''
            following_list= current_user.follows.all().values_list('following',flat=True)
            all_users = Tweet.objects.filter(Q(user_id__in=following_list) | Q(user= current_user))
            return all_users
       



class TweetUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    ApiView to retrive,update and delete any tweet of logged in user
    """
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated, IsOwner)



class FollowingFollowerListView(generics.ListCreateAPIView):
    '''
    API to follow any user as well list the users, logged in user is following
    '''
    queryset = UserRelation.objects.all()
    serializer_class = UserRelationSerializer
    permission_classes = (IsAuthenticated,IsOwner)

    ''' Function to display followers and followings of logged user '''      

    def get_queryset(self):
        list_type= self.request.query_params['list']
        if list_type == 'followings':
            return  self.queryset.filter(user_id=self.request.user)
        elif list_type == 'followers':
            return self.queryset.filter(following= self.request.user)

    ''' To create follow instance'''
    def perform_create(self,serializer):
        if self.request.user.id == self.kwargs['pk']:
            raise ValidationError("Self following is not allowed")
        else:    
            serializer.save(user_id=self.request.user.id,following_id= self.kwargs['pk'])
        




class FollowingRetriveDestroyView(generics.RetrieveDestroyAPIView):
    '''
    API to unfollow any following user
    '''
    queryset = UserRelation.objects.all()
    serializer_class = UserRelationSerializer
    permission_classes = (IsAuthenticated,IsOwner)

   

class LikeTweetListView(generics.ListCreateAPIView):
    '''
    API to like any tweet
    '''
    queryset = TweetLike.objects.all()
    serializer_class = TweetLikeSerializer
    permission_classes = (IsAuthenticated,)

    ''' Get list of users who liked a perticular tweet '''
    def get_queryset(self):
        return  self.queryset.filter(tweet= self.kwargs['pk'])

    ''' Create instance of like for that particular tweet and user '''
    def perform_create(self,serializer):
        serializer.save(tweet_id= self.kwargs["pk"],user_id= self.request.user.id)



class LikeTweetRetriveDestroyView(generics.RetrieveDestroyAPIView):
    '''
    API to unlike the liked tweet
    '''
    queryset = TweetLike.objects.all()
    serializer_class = TweetLikeSerializer
    permission_classes = (IsAuthenticated,IsOwner)