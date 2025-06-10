{% extends "base.html" %}
{% load i18n %}

{% block content %}
    <h3>{% trans "Email address confirmed" %}</h3>
    <p>{% trans "Thank you for confirming your email address." %}</p>
    <a class="btn btn-primary" href="{% url 'account_login' %}">{% trans "Login now" %}</a>
{% endblock %}

