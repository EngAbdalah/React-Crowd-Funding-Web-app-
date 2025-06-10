{% extends "base.html" %}
{% load i18n %}
{% load crispy_forms_tags %}
{% load socialaccount %}  

{% block content %}
    <form method="post" action="{% url 'account_login' %}">
        {% csrf_token %}
        {{ form|crispy }}
        <p class="mt-3 text-center">
            {% trans "Don't have an account?" %}
            <a href="{% url 'account_signup' %}">{% trans "Sign Up" %}</a>
        </p>
        <button type="submit" class="btn btn-primary w-100 mt-3">
            {% trans "Log In" %}
        </button>
    </form>
{% endblock %}

