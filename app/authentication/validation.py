import re

from marshmallow import Schema, ValidationError, validates, validates_schema
from marshmallow.fields import Date, Dict, Float, Int, List, Nested, Str, DateTime
from marshmallow.validate import Length, OneOf, Range, Email

class RegisterSchema(Schema):

    name = Str(required=True, validate=Length(min=3, max=20))
    email = Str(required=True, validate=Email())
    psw = Str(required=True, validate=Length(min=6, max=124))
    r_psw = Str(required=True, validate=Length(min=6, max=124))

    @validates('psw')
    def validate_psw(self, psw: str):
        if not re.fullmatch(r"[A-Za-z0-9]+", psw):
            raise ValidationError("Пароль должен содержать только цифры и буквы")

    @validates('name')
    def validate_name(self, name: str):
        if not re.fullmatch(r"[A-Za-z0-9]+", name):
            raise ValidationError("Имя должно содержать только цифры и буквы")

    @validates_schema
    def validate_repeat_password(self, data, **kwargs):
        if data['psw'] != data['r_psw']:
            raise ValidationError("Введенные пароли не совпадают")

class NameSchema(Schema):
    name = Str(required=True, validate=Length(min=3, max=20))

    @validates('name')
    def validate_name(self, name: str):
        if not re.fullmatch(r"[A-Za-z0-9]+", name):
            raise ValidationError("Имя должно содержать только цифры и буквы")





