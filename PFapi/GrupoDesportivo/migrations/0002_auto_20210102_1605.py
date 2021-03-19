# Generated by Django 3.1.4 on 2021-01-02 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GrupoDesportivo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campeonato',
            name='NomeCampeonato',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterUniqueTogether(
            name='campeonato',
            unique_together={('NomeCampeonato', 'Epoca')},
        ),
    ]