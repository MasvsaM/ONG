from django.shortcuts import render


def index (request):
    comentario ={"titulo":"Comentario enviado desde django a la pag"}
    return render(request, 'core/index.html')

def nosotros(request):
    return render(request, 'core/nosotros.html')


def perros(request):
    return render(request, 'core/perros.html')




def gatos(request):
    return render(request, 'core/gatos.html')

def contactanos(request):
    lista = ["Santiago", "Valparaiso", "Viña", "Quilpue", "Reñaca", "Concon"]
    variables = {"ciudad":lista}
    return render(request, 'core/contactanos.html')


def detallegatos(request):
    return render(request, 'core/detallegatos.html')


def detalleperros(request):
    return render(request, 'core/detalleperros.html')
