from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.request import  Request

from .models import Room
from .serializers import RoomSerializer, CreateRooomSerializer

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRooomSerializer

    def post(self, request, format_=None):
        ...
