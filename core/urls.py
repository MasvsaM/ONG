from django.urls import path
from .views import index, nosotros, perros,  gatos, contactanos,detallegatos, detalleperros


urlpatterns=[
    path('', index, name="index"),
    path('nosotros/', nosotros, name="nosotros"),
    path('perros/', perros, name="perros"),
    path('gatos/', gatos, name="gatos"),
    path('contactanos/', contactanos , name="contactanos"),
    path('detallegatos/', detallegatos , name="detallegatos"),
    path('detalleperros/', detalleperros , name="detalleperros"),
] 