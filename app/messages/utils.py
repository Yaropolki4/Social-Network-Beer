from typing import List

from .models.message_models import Messages

def create_list_from_messages(messages: List[Messages], current_user_id) -> dict:
    m_list = []
    for message in messages:
        message: Messages
        message_dict = {'content': message.content, 'date': message.date, 'from-me': False}
        if current_user_id==message.user_id:
            message_dict['from-me'] = True
        m_list.append(message_dict)
    return m_list