{% extends "base.html" %}
{% load i18n %}

{% block content %}
    <h3>{% trans "Password reset sent" %}</h3>
    <p>{% trans "We've emailed you instructions for setting your password." %}</p>
{% endblock %}
