from django.http import QueryDict
from django.utils.deprecation import MiddlewareMixin
from rest_framework.utils import json


class HttpPostTunnelingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if 'x-methodoverride' in request.headers:
            http_method = request.headers['x-methodoverride']
            if http_method.lower() == 'put':
                request.method = 'PUT'
                request.META['REQUEST_METHOD'] = 'PUT'
                request.PUT = json.loads(request.body.decode('utf-8'))
            if http_method.lower() == 'delete':
                request.method = 'DELETE'
                request.META['REQUEST_METHOD'] = 'DELETE'
                request.DELETE = json.loads(request.body.decode('utf-8'))
        return None
