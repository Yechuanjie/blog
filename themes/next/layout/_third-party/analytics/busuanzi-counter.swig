{% if theme.busuanzi_count.enable %}
<div class="busuanzi-count">
  <script async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>

  {% if theme.busuanzi_count.site_uv %}
    <span class="site-uv">
      {{ theme.busuanzi_count.site_uv_header }}
      {{ theme.busuanzi_count.site_uv_footer }}
      <span class="busuanzi-value" id="busuanzi_value_site_uv">{{ theme.busuanzi_count.site_uv_loadtxt }}</span>

    </span>
  {% endif %}

  {% if theme.busuanzi_count.site_pv %}
    <span class="site-pv">
      {{ theme.busuanzi_count.site_pv_header }}
      {{ theme.busuanzi_count.site_pv_footer }}
      <span class="busuanzi-value" id="busuanzi_value_site_pv">{{ theme.busuanzi_count.site_pv_loadtxt }}</span>

    </span>
  {% endif %}
</div>
{% endif %}
