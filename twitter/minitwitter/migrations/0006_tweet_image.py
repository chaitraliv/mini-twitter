# Generated by Django 3.1.1 on 2020-09-28 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('minitwitter', '0005_auto_20200928_0537'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='image',
            field=models.ImageField(null=True, upload_to='User_Posts'),
        ),
    ]
