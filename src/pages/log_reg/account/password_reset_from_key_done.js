{% extends "base.html" %}
{% load i18n %}

{% block content %}
    <h3>{% trans "Password reset complete" %}</h3>
    <p>{% trans "Your password has been successfully changed. You may now log in." %}</p>
    <a href="{% url 'account_login' %}" class="btn btn-primary">{% trans "Log in" %}</a>
{% endblock %}
