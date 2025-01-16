# consumers.py

import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import ChatMessage
from django.contrib.auth.models import User

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        self.room_name = f'chat_{self.user.id}'
        async_to_sync(self.channel_layer.group_add)(
            self.room_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        recipient_id = data['recipient_id']
        recipient = User.objects.get(id=recipient_id)

        # Save the message in the database
        ChatMessage.objects.create(sender=self.user, recipient=recipient, message=message)

        async_to_sync(self.channel_layer.group_send)(
            f'chat_{recipient.id}',
            {
                'type': 'chat_message',
                'message': message,
                'sender': self.user.username
            }
        )

    def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        self.send(text_data=json.dumps({
            'message': message,
            'sender': sender,
        }))
