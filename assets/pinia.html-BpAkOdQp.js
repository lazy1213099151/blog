import{_ as n,o as s,c as a,a as t}from"./app-DtKoVOCb.js";const p={},o=t(`<p>Pinia是Vue.js官方推荐的新一代状态管理库，它提供了非常简洁和直观的 API,可以极大地提高我们管理应用状态的效率，是Vue3最佳搭档之一。</p><h3 id="pinia优势" tabindex="-1"><a class="header-anchor" href="#pinia优势"><span>Pinia优势</span></a></h3><p>与Vuex相比较，Pinia有以下优点：</p><ul><li>更贴合 Vue 3 的 Composition API 风格,学习成本更低。</li><li>模块化管理 States，每个模块是一个 Store。</li><li>支持TypeScript。</li><li>插件扩展。</li></ul><h3 id="安装pinia" tabindex="-1"><a class="header-anchor" href="#安装pinia"><span>安装Pinia</span></a></h3><p><code>yarn add pinia || npm install pinia</code></p><h3 id="初体验" tabindex="-1"><a class="header-anchor" href="#初体验"><span>初体验</span></a></h3><p>在项目 <code>main.ts</code> 挂载<code>pinia</code>到<code>vue</code>中</p><pre><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">&#39;./router&#39;</span>
<span class="token comment">// 导出 createPinia</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createPinia <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token comment">// 创建一个store</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 挂载在vue中</span>
<span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>store<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre><p>创建一个<code>store</code></p><p><code>pinia废弃了Mutations</code></p><pre><code class="language-js"><span class="token comment">// 导入 defineStore</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token comment">// 创建一个名叫 main 的store</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> useMainStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>

  <span class="token comment">// 状态</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">userInfo</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">countNumber</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
  <span class="token comment">// 定义修改状态的方法</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>countNumber<span class="token operator">++</span>  
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">// 定义 getter 计算属性</span>
  <span class="token literal-property property">getters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">gettersTest</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&#39;pinia&#39;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">vue之</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><p>页面使用</p><pre><code class="language-vue"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>store的state：{{ store.countNumber }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>ts<span class="token punctuation">&#39;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// 通过useXXXStore() 获取实例</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useMainStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../store/store&#39;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useMainStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

</code></pre><p>页面中使用<code>getters</code></p><pre><code class="language-vue"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>store的state：{{ store.countNumber }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>getters的使用：{{ store.gettersTest() }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>ts<span class="token punctuation">&#39;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// 通过useXXXStore() 获取实例</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useMainStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../store/store&#39;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useMainStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><p>页面中使用<code>actions</code></p><pre><code class="language-vue"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>store的state：{{ store.countNumber }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>getters的使用：{{ store.gettersTest() }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>addHandle<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>执行store的方法<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>ts<span class="token punctuation">&#39;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// 通过useXXXStore() 获取实例</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useMainStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../store/store&#39;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useMainStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">addHandle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  store<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><h3 id="数据持久化" tabindex="-1"><a class="header-anchor" href="#数据持久化"><span>数据持久化</span></a></h3><p>Pinia 默认状态不持久化，可以通过<code>pinia-plugin-persistedstate</code>插件实现</p><p>安装<code>pinia-plugin-persistedstate</code>插件</p><p><code>yarn add pinia-plugin-persistedstate || npm install pinia-plugin-persistedstate </code></p><p>开启数据持久化</p><p><code>main.ts</code>页面</p><pre><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">&#39;./router&#39;</span>
<span class="token comment">// 导出 createPinia</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createPinia <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token comment">// pinia 数据持久化插件，会自动将state的数据存储到 localstorage 和 sessionStorage</span>
<span class="token keyword">import</span> persistedState <span class="token keyword">from</span> <span class="token string">&#39;pinia-plugin-persistedstate&#39;</span>

<span class="token comment">// 创建一个store</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
store<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>persistedState<span class="token punctuation">)</span>

<span class="token comment">// 挂载在vue中</span>
<span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>store<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre><p><code>store</code>配置</p><pre><code class="language-js"><span class="token comment">// 导入 defineStore</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token comment">// 创建一个名叫 main 的store</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> useMainStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>

  <span class="token comment">// 状态</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">userInfo</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">countNumber</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
  <span class="token comment">// 定义修改状态的方法</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>countNumber<span class="token operator">++</span>  
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">// 定义 getter 计算属性</span>
  <span class="token literal-property property">getters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">gettersTest</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&#39;pinia&#39;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">vue之</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
  <span class="token comment">// 开启数据持久化</span>
  <span class="token literal-property property">persist</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 会默认将 state 下的状态名称 作为key 存储到 localstorage</span>
  
  <span class="token comment">// 如果不想存储到 localstorage ，可以这样配置</span>
  <span class="token literal-property property">persist</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;userInfo&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 把 state 下的 userInfo 存储到 sessionStorage，其他会默认存储到 localstorage， persist: true 可以注释掉</span>
     <span class="token literal-property property">storage</span><span class="token operator">:</span> window<span class="token punctuation">.</span>sessionStorage
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>`,27),e=[o];function c(l,u){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","pinia.html.vue"]]),r=JSON.parse('{"path":"/blogs/vue/pinia.html","title":"Vue3状态管理库之pinia","lang":"zh-CN","frontmatter":{"title":"Vue3状态管理库之pinia","date":"2024-06-03T22:58:18.000Z","tags":["vue","pinia"],"hideComments":true,"categories":["vue"]},"headers":[{"level":3,"title":"Pinia优势","slug":"pinia优势","link":"#pinia优势","children":[]},{"level":3,"title":"安装Pinia","slug":"安装pinia","link":"#安装pinia","children":[]},{"level":3,"title":"初体验","slug":"初体验","link":"#初体验","children":[]},{"level":3,"title":"数据持久化","slug":"数据持久化","link":"#数据持久化","children":[]}],"git":{},"filePathRelative":"blogs/vue/pinia.md"}');export{k as comp,r as data};
