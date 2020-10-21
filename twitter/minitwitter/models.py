from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.postgres.indexes import GinIndex
import django.contrib.postgres.search as pg_search

class UserData(models.Model):

    user = models.OneToOneField(User,on_delete=models.CASCADE)
    bio = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to= 'user_image',null= True)
        
@receiver(post_save, sender=User)
def profile_create(sender, instance, created, **kwargs):
    if created:
        UserData.objects.create(user=instance,bio='This is default')



class Tweet(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name= 'tweets')
    content = models.TextField(max_length=200)
    created_on = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        indexes = [
            GinIndex(fields=['user','content'])
            ]
        ordering=['-created_on']


class UserRelation(models.Model):
    '''follow relation'''
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name= 'follows')
    following = models.ForeignKey(User,on_delete=models.CASCADE,related_name= 'followers')
    class Meta:
        unique_together=('user','following')


class TweetLike(models.Model):           
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name= 'likes')
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE,related_name= 'liked_by')
    class Meta:
        unique_together= ('user','tweet')