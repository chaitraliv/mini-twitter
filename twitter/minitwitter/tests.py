from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Tweet



class UserRegistrationTests(APITestCase):
    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('list_users')
        data = {'username': 'chaitrali','password':'chaitrali','first_name':'chaitrali','last_name':'vaidya','email':'chaitrali@gmail.com'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 201)
    
    def test_get_all_accounts(self):
        '''
        Ensure we can get list of all the users
        '''
        self.user= User.objects.create(username= 'chaitrali',password='pass@123')
        self.user1 = User.objects.create(username= 'chaitraliv',password='pass@123')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get(reverse('list_users'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(User.objects.count(),2)
  

class UserProfileTests(APITestCase):

    def setUp(self):
        self.user= User.objects.create(username= 'chaitrali',password='pass@123')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.other_user = User.objects.create(username= 'vaidya',password='pass@123')
    
    def test_retrive_profile(self):
        """
        Ensure we can get profile object of logged user.
        """
        response = self.client.get(reverse('profile',kwargs= {'pk': self.user.id}))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data['user']['username'],'chaitrali')
        """
        Ensure we can get profile object of other user
        """
        response = self.client.get(reverse('profile',kwargs= {'pk': self.other_user.id}))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data['user']['username'],'vaidya')


    def test_update_profile(self):
        """
        Ensure we can update the profile object of the logged in user.
        """
        response = self.client.patch(reverse('profile',kwargs={'pk':self.user.id}),{'bio':'This is for testing'})
        self.assertEquals(response.status_code,200)
        self.assertEquals(response.data['bio'],'This is for testing')

        """
        Ensure authorization to update profile, no one else can update other's profile
        """
        response = self.client.patch(reverse('profile',kwargs={'pk':self.other_user.id}),{'bio':'This is for testing'})
        self.assertEquals(response.status_code,403)



class TweetTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create(username='chaitrali',password= 'pass@123')
        self.token = Token.objects.create(user= self.user)
        self.client.credentials(HTTP_AUTHORIZATION = 'Token '+ self.token.key)
        self.tweet1 = Tweet.objects.create(content='This to be updated',user= self.user)
        self.other_user = User.objects.create(username= 'vaidya',password='pass@123')

    def test_post_tweet(self):
        """
        Ensure we can create a new tweet object.
        """
        response = self.client.post(reverse('timeline'),data={'content':'This is a test tweet',})
        self.assertEquals(response.status_code, 201)
        self.assertEquals(response.data['content'],'This is a test tweet')


    
    def test_update_tweet(self):
        """
        Ensure we can update a tweet object.
        """
  
        response = self.client.patch(reverse('tweet_update',kwargs={'pk':self.tweet1.id}),{'content':'This is updated'})
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data['content'],'This is updated')
        self.assertEquals(Tweet.objects.get(content= 'This is updated').user, self.user)



    def test_get_followings_tweets(self):
        '''
        Ensure we can retrive tweets of the logged user
        '''
       
        url = ('http://127.0.0.1:8020/minitwitter/tweets/?list=user')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(Tweet.objects.count(),1)

    def test_get_self_tweets(self):
        '''
        Ensure we can retrive tweets of the users it follows
        '''
       
        url = ('http://127.0.0.1:8020/minitwitter/tweets/?list=timeline')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(Tweet.objects.count(),1)

