# Generated by Django 4.1.3 on 2022-11-17 10:06

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('openPharma', '0002_alter_pharmacy_addresses'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pharmacy',
            name='description',
            field=models.CharField(blank=True, default='Aucune description.', max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='pharmacy',
            name='email',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='pharmacy',
            name='images',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), blank=True, default=list, null=True, size=50),
        ),
        migrations.AlterField(
            model_name='pharmacy',
            name='phones',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), blank=True, default=list, null=True, size=10),
        ),
        migrations.AlterField(
            model_name='pharmacy',
            name='website',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
