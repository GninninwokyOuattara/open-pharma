from rest_framework import serializers

from openTracker.models import TrackerHistory


class TrackerHistoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackerHistory
        fields = "__all__"
