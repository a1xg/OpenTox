# Generated by Django 3.2 on 2021-07-15 14:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_alter_request_id'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Request',
        ),
    ]