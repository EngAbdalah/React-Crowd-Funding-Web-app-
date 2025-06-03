from django.shortcuts import render
from django.shortcuts import render, redirect
from .forms import ProfileUpdateForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.contrib import messages
from django.contrib.auth import logout

# Create your views here.
@login_required
def profile_update_view(request):
    if request.method == "POST":
        form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect("categories-list-page")
    else:
        form = ProfileUpdateForm(instance=request.user)
    return render(request, "account/profile_update.html", {"form": form})


class DeleteAccountView(LoginRequiredMixin, View):
    template_name = "account/delete_account.html"

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        password = request.POST.get("password", "")

        if not request.user.check_password(password):
            messages.error(request, "Incorrect password.")
            return redirect("delete_account")

        user = request.user
        logout(request)
        user.delete()

        messages.success(request, "Your account has been deleted.")
        return redirect("categories-list-page")
