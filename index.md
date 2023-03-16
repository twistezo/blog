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
  {% capture temptags %}
    {% for tag in site.tags %}
      {{ tag[1].size | plus: 1000 }}#{{ tag[0] }}#{{ tag[1].size }}
    {% endfor %}
  {% endcapture %}

{% assign sortedtemptags = temptags | split:' ' | sort | reverse %}

{% for temptag in sortedtemptags %}
  {% assign tagitems = temptag | split: '#' %}
  {% capture tagname %}{{ tagitems[1] }}{% endcapture %}
  <a href="{{ site.baseurl }}/tag/{{ tagname }}">#{{ tagname }}</a>
{% endfor %}

</div>
