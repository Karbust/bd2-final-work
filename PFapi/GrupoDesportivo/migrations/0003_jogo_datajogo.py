# Generated by Django 3.1.4 on 2021-01-22 17:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GrupoDesportivo', '0002_auto_20210102_1605'),
    ]

    operations = [
        migrations.AddField(
            model_name='jogo',
            name='DataJogo',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
    ]
