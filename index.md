---
---

<div class="cyan">
  <ul>
    {% for post in site.posts %}
      <li>
        <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
        <p>{{ post.date | date: '%Y-%m-%d ' }}</p>
      </li>
    {% endfor %}
  </ul>
</div>

<div class="tags green">
  {% assign sorted_tags = site.tags | sort %}
  {% for tag in sorted_tags %}
    {% assign tag_name = tag[0] %}
    <a href="{{ site.baseurl }}/tag/{{ tag_name }}">#{{ tag_name }}</a>
  {% endfor %}
</div>
