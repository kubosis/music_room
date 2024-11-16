from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.request import  Request
from rest_framework.response import Response

from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format_=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        guest_can_pause = serializer.data.get('guest_can_pause')
        votes_to_skip = serializer.data.get('votes_to_skip')
        host = self.request.session.session_key
        queryset = Room.objects.filter(host=host)
        if queryset.exists():
            room = queryset[0]
            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
        else:
            room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
            room.save()

        self.request.session['room_code'] = room.code
        return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format_=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code is None:
            return Response({'Bad request': 'Room code not found in request'}, status=status.HTTP_404_NOT_FOUND)

        room = Room.objects.filter(code=code)
        if len(room) == 0:
            return Response({'Bad request': 'Invalid room code'}, status=status.HTTP_404_NOT_FOUND)

        # code is unique - just one room
        data = RoomSerializer(room[0]).data
        data['is_host'] = self.request.session.session_key == room[0].host

        return Response(data, status=status.HTTP_200_OK)

class JoinRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def post(self, request, format_=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code is None:
            return Response({'Bad request': 'No code posted'}, status=status.HTTP_400_BAD_REQUEST)

        room = Room.objects.filter(code=code)
        if len(room) == 0:
            return Response({'Bad request': 'Invalid room code'}, status=status.HTTP_400_BAD_REQUEST)

        self.request.session['room_code'] = code
        return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)


