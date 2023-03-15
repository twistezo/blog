---
colorspace: green # [cyan/green/orange/pink/purple/red/yellow]
---

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
      <p>{{ post.date | date: '%Y-%m-%d ' }}</p>
    </li>
  {% endfor %}
</ul>

<div class="tags orange">
  {% for tag in site.tags %}
    <a href="{{ site.baseurl }}{{ tag.url }}">#{{ tag[0] }}</a>
  {% endfor %}
</div>
