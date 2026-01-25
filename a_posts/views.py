from django.shortcuts import render

def home_view(request):
    context = {
        'page': 'Home',
        'partial': request.htmx,
    }
    if request.htmx:
        return render(request, 'a_posts/partials/_home.html', context)
    return render(request, 'a_posts/home.html', context)


def explore_view(request):
    context = {
        'page': 'Explore',
        'partial': request.htmx,
    }
    if request.htmx:
        return render(request, 'a_posts/partials/_explore.html', context)
    return render(request, 'a_posts/explore.html', context)


def upload_view(request):
    context = {
        'page': 'Upload',
        'partial': request.htmx,
    }
    if request.htmx:
        return render(request, 'a_posts/partials/_upload.html', context)
    return render(request, 'a_posts/upload.html', context)