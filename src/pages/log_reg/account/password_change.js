{% extends "base.html" %}
{% load i18n %}
{% load crispy_forms_tags %}

{% block content %}
    <form method="post" action="{% url 'account_reset_password' %}">
        {% csrf_token %}
        {{ form|crispy }}
        <button type="submit" class="btn btn-primary w-100 mt-3">
            {% trans "Change Password" %}
        </button>
    </form>
{% endblock %}
