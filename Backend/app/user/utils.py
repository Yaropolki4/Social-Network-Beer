from .models.friend_models import Friends
from .models.user_models import UserNotifications
from app.authentication.auth_models import Users

def create_friends_list(user_id):
    friends = Friends.objects.get_all_friends(user_id)

    friends_names = []
    for friend in friends:
        friends_names.append(Users.query.filter_by(id=friend.friend_id).first().name)
    friends_list = friends_names
    return friends_list


def create_notifications_list(notifications: dict):
    notifications_list = []
    for key in notifications.keys():
        for notification in notifications[key]:
            user = Users.get_user_by_id(notification.from_user_id)
            notification_dict = {'user_name': user.name,
                                 'notification_type': key}
            notifications_list.append(notification_dict)
    return notifications_list