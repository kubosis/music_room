from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room 
        fields = ('id', 'id_code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')

class CreateRooomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')
