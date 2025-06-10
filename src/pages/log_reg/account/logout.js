{% extends "base.html" %}
{% load i18n %}

{% block content %}
<form method="post" action="{% url 'account_logout' %}">
    {% csrf_token %}
    <button type="submit" class="btn btn-danger w-100 mt-3">
        {% trans "Log Out" %}
    </button>
</form>
{% endblock %}
