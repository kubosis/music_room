from django.db import models

import string
import random

def generate_uid_code():
    length = 8
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(id_code=code).count() == 0:
            # the code is unique
            break
    return code


# Create your models here.
class Room(models.Model):
    id_code = models.CharField(max_length=8, default=generate_uid_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
