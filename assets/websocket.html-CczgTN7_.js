import{_ as n,o as s,c as a,a as t}from"./app-DtKoVOCb.js";const p={},o=t(`<p>记录一下在<code>uniapp</code>微信小程序中封装<code>websocket</code>功能。实现主动建立连接、心跳防断线机制、断线主动重连、提供主动断开的方法。如有不足，请大佬不吝赐教~</p><h4 id="websocket源码" tabindex="-1"><a class="header-anchor" href="#websocket源码"><span><code>websocket</code>源码</span></a></h4><pre><code class="language-js"><span class="token comment">// 重连websocket间隔，5s</span>
<span class="token keyword">const</span> interval <span class="token operator">=</span> <span class="token number">5000</span>
<span class="token comment">// 心跳间隔</span>
<span class="token keyword">const</span> heartbeatTime <span class="token operator">=</span> <span class="token number">15000</span>
<span class="token comment">// 重连最大次数</span>
<span class="token keyword">const</span> maxReconnectMaxTime <span class="token operator">=</span> <span class="token number">5</span>


<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">WS</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 状态</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">&#39;notConnected&#39;</span>
    <span class="token comment">// 配置</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>options <span class="token operator">=</span> options
    <span class="token comment">// WS实例</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask <span class="token operator">=</span> <span class="token keyword">null</span>

    <span class="token comment">// 正常关闭</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>normalCloseFlag <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token comment">// 重新连接次数</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>reconnectTime <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token comment">// 重新连接Timer</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>reconnectTimer <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token comment">// 心跳Timer</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>heartTimer <span class="token operator">=</span> <span class="token keyword">null</span>

    <span class="token comment">// 发起连接</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">initWS</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 关闭WS</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">close</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 正常关闭状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>normalCloseFlag <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token comment">// 关闭websocket</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token comment">// 关闭心跳定时器</span>
      <span class="token function">clearInterval</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>heartTimer<span class="token punctuation">)</span>
      <span class="token comment">// 关闭重连定时器</span>
      <span class="token function">clearTimeout</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reconnectTimer<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 初始化WS</span>
  <span class="token function">initWS</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask <span class="token operator">=</span> uni<span class="token punctuation">.</span><span class="token function">connectSocket</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&quot;wss://demo.com/&quot;</span><span class="token punctuation">,</span> <span class="token comment">// wss地址</span>
      <span class="token literal-property property">header</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token comment">// 可以添加请求头字段</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token function">success</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// console.debug(&#39;ws连接&#39;, res);</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 监听WS</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">watchWS</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 监听WS</span>
  <span class="token function">watchWS</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 监听 WebSocket 连接打开事件</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask<span class="token punctuation">.</span><span class="token function">onOpen</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&#39;websocket连接成功！&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">&#39;connected&#39;</span>
      <span class="token comment">// 连接成功</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">onConnected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token comment">// 重置连接次数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>reconnectTime <span class="token operator">=</span> <span class="token number">1</span>
      <span class="token comment">// 发送心跳</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onHeartBeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token comment">// 监听消息</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token comment">// 关闭Toast</span>
      uni<span class="token punctuation">.</span><span class="token function">hideLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 监听websocket 错误</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask<span class="token punctuation">.</span><span class="token function">onError</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 关闭并重连</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 监听 WebSocket 连接关闭事件</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask<span class="token punctuation">.</span><span class="token function">onClose</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> <span class="token string">&#39;断开连接------------&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>normalCloseFlag<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>normalCloseFlag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 不正常断开连接，重新连接</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onDisconnected</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 正常关闭连接</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>reconnectTime <span class="token operator">=</span> <span class="token number">1</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">&#39;notConnected&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 监听消息</span>
  <span class="token function">onMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 监听websocket 收到消息</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask<span class="token punctuation">.</span><span class="token function">onMessage</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> newRes <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
      <span class="token comment">// console.debug(newRes, &#39;ws收到的消息-----------&#39;);</span>
      <span class="token comment">//收到消息</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>newRes<span class="token punctuation">.</span>code <span class="token operator">===</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>newRes<span class="token punctuation">.</span>msgId <span class="token operator">===</span> <span class="token number">100002</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
        uni<span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;wsOperation&#39;</span><span class="token punctuation">,</span> newRes<span class="token punctuation">)</span>
        <span class="token comment">// 告诉wss已收到消息</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sendACKHandle</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">msgId</span><span class="token operator">:</span> <span class="token string">&#39;100003&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">sequenceId</span><span class="token operator">:</span> newRes<span class="token punctuation">.</span>sequenceId <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&#39;未监听到消息原因：&#39;</span><span class="token punctuation">,</span> newRes<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>


  <span class="token comment">// 断开连接</span>
  <span class="token function">onDisconnected</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">&#39;notConnected&#39;</span>
    console<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&#39;websocket断开连接，原因：&#39;</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// 关闭心跳</span>
    <span class="token function">clearInterval</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>heartTimer<span class="token punctuation">)</span>
    <span class="token comment">// 全局Toast提示，防止用户继续发送</span>
    <span class="token comment">// uni.showLoading({ title: &#39;消息收取中…&#39; })</span>
    <span class="token comment">// 尝试重新连接</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onReconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>


  <span class="token comment">// 断线重连</span>
  <span class="token function">onReconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">clearTimeout</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reconnectTimer<span class="token punctuation">)</span>
    <span class="token comment">// 多次重连</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reconnectTime <span class="token operator">&lt;</span> maxReconnectMaxTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>reconnectTimer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">第【</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>reconnectTime<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">】次重新连接中……</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">initWS</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>reconnectTime<span class="token operator">++</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> interval<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 重连失败</span>
      <span class="token comment">// uni.showModal({</span>
      <span class="token comment">//   title: &#39;温馨提示&#39;,</span>
      <span class="token comment">//   content: &#39;服务器开小差啦~请返回聊天列表重试&#39;,</span>
      <span class="token comment">//   showCancel: false,</span>
      <span class="token comment">//   confirmText: &#39;我知道了&#39;,</span>
      <span class="token comment">//   success: () =&gt; {</span>
      <span class="token comment">//     uni.navigateBack()</span>
      <span class="token comment">//   }</span>
      <span class="token comment">// })</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/** @心跳 10分钟内必须发送一次心跳 **/</span>
  <span class="token function">onHeartBeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>heartTimer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">msgId</span><span class="token operator">:</span> <span class="token string">&#39;100001&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">success</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&#39;心跳发送成功！&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> heartbeatTime<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 收到非心跳的消息回复一个ack内容</span>
  <span class="token function">sendACKHandle</span><span class="token punctuation">(</span><span class="token parameter">contentData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>contentData<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token function">success</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// console.debug(&#39;回复内容成功&#39;)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h4 id="在vue页面使用" tabindex="-1"><a class="header-anchor" href="#在vue页面使用"><span>在<code>vue</code>页面使用</span></a></h4><pre><code class="language-vue"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">const</span> <span class="token function-variable function">initWS</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>ws <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WS</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">userId</span><span class="token operator">:</span> <span class="token string">&#39;xxx&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">token</span><span class="token operator">:</span> <span class="token string">&#39;xxx&#39;</span><span class="token punctuation">,</span>
			<span class="token literal-property property">onConnected</span><span class="token operator">:</span> onConnected<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 连接ws成功回调</span>
    <span class="token keyword">const</span> <span class="token parameter">onConnected</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;成功了&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><h4 id="心跳机制" tabindex="-1"><a class="header-anchor" href="#心跳机制"><span>心跳机制</span></a></h4><p>用于告诉服务端当前用户还在通信中，防止服务端主动断开。</p><pre><code class="language-javascript"><span class="token doc-comment comment">/** @心跳 10分钟内必须发送一次心跳 **/</span>
  <span class="token function">onHeartBeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>heartTimer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">msgId</span><span class="token operator">:</span> <span class="token string">&#39;100001&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">success</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&#39;心跳发送成功！&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> heartbeatTime<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 收到非心跳的消息回复一个ack内容</span>
  <span class="token function">sendACKHandle</span><span class="token punctuation">(</span><span class="token parameter">contentData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>socketTask<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>contentData<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token function">success</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// console.debug(&#39;回复内容成功&#39;)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><h4 id="微信小程序需要注意的坑-以下是根据微信开发文档小程序运行机制总结出来的-仅代表个人见解" tabindex="-1"><a class="header-anchor" href="#微信小程序需要注意的坑-以下是根据微信开发文档小程序运行机制总结出来的-仅代表个人见解"><span>微信小程序需要注意的坑（以下是根据微信开发文档小程序运行机制总结出来的，仅代表个人见解）</span></a></h4><ol><li>小程序进入【后台】5秒后， 微信会停止小程序<code> JS</code> 线程的执行， 小程序进入【挂起】状态 。此时小程序的内存状态会被保留，但开发者代码执行会停止，事件和接口回调会在小程序再次进入「前台」时触发。但这样会导致<code>ws</code>通讯收到消息时的处理逻辑会被中断，有可能会不会处理，知道进入【前台】状态才会进行触发。这里不确定的是5秒后<code>ws</code>通讯的逻辑还会不会执行，需要进一步验证。</li><li>防止以上问题出现，可以在小程序进入【后台】状态后主动断开<code>ws</code>，等进入【前台状态】时在主动连接；但这个方案需要服务存储断开后未下发的数据，直到连接上<code>ws</code>后再主动下发。</li></ol><p>PS：只是单纯的记录一下开发过程中所涉及的技术，请勿商用！</p>`,11),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","websocket.html.vue"]]),r=JSON.parse('{"path":"/blogs/uniapp/websocket.html","title":"websocket-学习笔记","lang":"zh-CN","frontmatter":{"title":"websocket-学习笔记","date":"2024-06-04T15:15:47.000Z","tags":["uniapp","websocket"],"hideComments":true,"categories":["uniapp"]},"headers":[],"git":{},"filePathRelative":"blogs/uniapp/websocket.md"}');export{i as comp,r as data};
