{% extends "base.html" %}
{% load i18n %}
{% load crispy_forms_tags %}

{% block content %}
    <form method="post" action="{% url 'account_signup' %}" enctype="multipart/form-data">
        {% csrf_token %}
        {{ form|crispy }}
        <p class="mt-3 text-center">
            {% trans "Have an account?" %}
            <a href="{% url 'account_login' %}">{% trans "Login" %}</a>
        </p>
        <button type="submit" class="btn btn-primary w-100 mt-3">
            {% trans "Sign Up" %}
        </button>
    </form>
{% endblock %}
