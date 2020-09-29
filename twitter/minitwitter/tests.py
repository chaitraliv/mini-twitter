from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import Tweet

   


class UserRegistrationTests(APITestCase):

    url = reverse('list_users')       
    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        data = {'username': 'chaitraliv','password':'chaitrali','first_name':'chaitrali','last_name':'vaidya','email':'chaitrali@gmail.com'}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_create_account_with_same_username(self):
        """
        Ensure another account with same username can not be created. 
        """
        self.test_create_account()
        data = {'username': 'chaitraliv','password':'chaitrali','first_name':'chaitrali','last_name':'vaidya','email':'chaitrali@gmail.com'}
        response = self.client.post(self.url,data)
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    
    def test_get_all_accounts(self):
        '''
        Ensure we can get list of all the users
        '''
        self.user= User.objects.create(username= 'chaitrali',password='pass@123')
        self.user1 = User.objects.create(username= 'chaitraliv',password='pass@123')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get(reverse('list_users'))
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(User.objects.count(),2)


class UserProfileTests(APITestCase):

    def setUp(self):
        self.user= User.objects.create(username= 'chaitrali',password='pass@123')
        self.other_user = User.objects.create(username= 'vaidya',password='pass@123')
        self.login(self.user)
    
    def login(self,user):
        """
        To login any user with right credentials and give token authorization
        """
        self.token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)


    def test_retrive_profile_of_logged_user(self):
        """
        Ensure we can get profile object of logged user.
        """
        response = self.client.get(reverse('profile',kwargs= {'pk': self.user.id}))
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['user']['username'],'chaitrali')
        
    def test_get_profile_of_another_user(self):    
        """
        Ensure we can get profile object of other user
        """
        response = self.client.get(reverse('profile',kwargs= {'pk': self.other_user.id}))
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['user']['username'],'vaidya')


    def test_update_profile_by_onwer_of_profile(self):
        """
        Ensure we can update the profile object of the logged in user.
        """
        response = self.client.patch(reverse('profile',kwargs={'pk':self.user.id}),{'bio':'This is for testing'})
        self.assertEquals(response.status_code,status.HTTP_200_OK)
        self.assertEquals(response.data['bio'],'This is for testing')

        
    def test_update_profile_by_other_user(self):    
        """
        Ensure authorization to update profile, no one else can update other's profile
        """
        response = self.client.patch(reverse('profile',kwargs={'pk':self.other_user.id}),{'bio':'This is for testing'})
        self.assertEquals(response.status_code,status.HTTP_403_FORBIDDEN)

   
        

class TweetTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create(username='chaitrali',password= 'pass@123')
        self.other_user = User.objects.create(username= 'vaidya',password='pass@123')
        self.tweet1 = Tweet.objects.create(content='This to be updated',user= self.user)
        self.login(self.user)

    def login(self,user):
        self.token = Token.objects.create(user= user)
        self.client.credentials(HTTP_AUTHORIZATION = 'Token '+ self.token.key)

    def test_post_tweet(self):
        """
        Ensure we can create a new tweet object.
        """
        response = self.client.post(reverse('timeline'),data={'content':'This is a test tweet',})
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        self.assertEquals(response.data['content'],'This is a test tweet')


    
    def test_update_tweet(self):
        """
        Ensure we can update a tweet object.
        """
  
        response = self.client.patch(reverse('tweet_update',kwargs={'pk':self.tweet1.id}),{'content':'This is updated'})
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['content'],'This is updated')
        self.assertEquals(Tweet.objects.get(content= 'This is updated').user, self.user)


    def test_update_tweet_by_other_owner(self):
        """ Ensure no other user except the owner can update the tweet"""
        self.login(self.other_user)
        response = self.client.patch(reverse('tweet_update',kwargs={'pk':self.tweet1.id}),{'content':"This is updated"})
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)


    def test_delete_tweet(self):
        """
        Ensure only the owner of a tweet can delete it
        """
        response = self.client.delete(reverse('tweet_update', kwargs= {'pk': self.tweet1.id}))
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
    
    def test_delete_tweet_by_other_user(self):
        """
        Ensure no one,except the owner can delete a tweet
        """
        self.login(self.other_user)
        response = self.client.delete(reverse('tweet_update', kwargs= {'pk': self.tweet1.id}))
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_tweets_following_users(self):
        '''
        Ensure we can retrive tweets of the logged user
        '''
       
        url = ('http://127.0.0.1:8020/minitwitter/tweets/?list=user')
        response = self.client.get(url)
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(Tweet.objects.count(),1)

    def test_get_self_tweets(self):
        '''
        Ensure we can retrive tweets of the users it follows
        '''
       
        url = ('http://127.0.0.1:8020/minitwitter/tweets/?list=timeline')
        response = self.client.get(url)
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(Tweet.objects.count(),1)

class TweetLikeTests(APITestCase):
    """
    Not working, in process
    """
    def test_like_tweet(self):
        self.other_user = User.objects.create(username= 'vaidya',password='pass@123')
        self.user = User.objects.create(username= 'chaitrali',password='pass')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION= 'Token '+self.token.key)
        self.tweet1 = Tweet.objects.create(user= self.user, content= 'This is user1 tweet')
        self.tweet2 = Tweet.objects.create(user=self.user, content='This is 2nd tweet')
        

        response = self.client.post(reverse('like_tweet',kwargs={'pk':self.tweet1.id,}),tweet_id= self.tweet1.id, user_id= self.user.id)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

