from models.user import User
def create_user()->User:
    user = User()
    user.first_name=input("enter first")
    user.last_name=input("enter last")
    user.email = input("enter email")
    user.password = input("enter pass")
    print(user.last_name)
    return user

create_user()