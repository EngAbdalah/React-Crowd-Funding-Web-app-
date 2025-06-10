{% extends "base.html" %}
{% load i18n %}
{% load crispy_forms_tags %}

{% block content %}
   <form method="post" action="{% url 'account_reset_password_from_key' uidb36=view.kwargs.uidb36 key=view.kwargs.key %}">


        {% csrf_token %}
        {{ form|crispy }}
        <button type="submit" class="btn btn-primary w-100 mt-3">
            {% trans "Reset Password" %}
        </button>
    </form>
{% endblock %}
