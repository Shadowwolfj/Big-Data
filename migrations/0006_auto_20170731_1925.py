# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-31 19:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0005_auto_20170731_1920'),
    ]

    operations = [
        migrations.AlterField(
            model_name='soldier',
            name='end_time_of_service',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='soldier',
            name='time_of_service_s',
            field=models.DateField(null=True),
        ),
    ]
