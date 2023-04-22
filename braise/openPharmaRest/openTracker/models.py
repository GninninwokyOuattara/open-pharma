import uuid

from django.db import models

# Create your models here.


class TrackerHistory(models.Model):
    class Meta:
        db_table = 'tracker_history'

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    duration = models.DurationField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    collected_data = models.JSONField()
    # field 'mode' which is either 'manual' or 'automatic'
    mode = models.CharField(max_length=10)
