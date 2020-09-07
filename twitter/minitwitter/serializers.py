from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from minitwitter.models import UserData, UserRelation,Tweet, LikeRelation
from rest_framework import serializers

class ThinUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name']
        


class TweetSerializer(serializers.ModelSerializer):
    '''Serializer for tweets'''
    user= ThinUserSerializer(read_only=True)
    class Meta:
        model = Tweet
        fields = ['id','user','content','created_on']
        read_only_fields = ['user','created_on']



class UserSerializer(serializers.ModelSerializer):
    '''Serializer for User model'''
    first_name = serializers.CharField(required=True)
    last_name= serializers.CharField(required=True)
    email= serializers.EmailField(required=True)
    tweets= TweetSerializer(many=True,required=False)

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','password','tweets','email']
        extra_kwargs = {'password': {'write_only': True}}
        

class UserDataSerializer(serializers.ModelSerializer):
    '''Serializer for data ie. bio'''
    user = UserSerializer(read_only= True)
    class Meta:
        model = UserData
        fields = ['user','bio',]


class UserRelationSerializer(serializers.ModelSerializer):
    '''Serializer for follow relation of users'''
    user=UserSerializer(read_only= True)
    following= UserSerializer(read_only=True)
    following_id= serializers.IntegerField(required=True)
    class Meta:
        model = UserRelation
        fields = ('id','user','following','following_id')
        read_only_fields = ('id','user','following')



class LikeRelationSerializer(serializers.ModelSerializer):
    '''Serializer for tweet likes'''
    tweet=TweetSerializer(read_only=True)
    tweet_id=serializers.IntegerField(required=True)

    class Meta:
        model = LikeRelation
        fields = ['id','user','tweet','tweet_id']
        read_only_fields = ['user','tweet']