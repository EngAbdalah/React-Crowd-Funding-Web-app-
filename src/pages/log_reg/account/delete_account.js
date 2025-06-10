{% extends 'base.html' %}

{% block content %}
    <h2>Delete Account</h2>
    <p>Please confirm your password to delete your account:</p>

    {% if messages %}
        {% for message in messages %}
            <p style="color: {% if message.tags == 'error' %}red{% else %}green{% endif %};">
            {{ message }}
            </p>
        {% endfor %}
    {% endif %}

    <form method="post">
        {% csrf_token %}
        <input type="password" name="password" placeholder="Enter password" required>
        <button type="submit">Delete My Account</button>
    </form>
{% endblock %}
