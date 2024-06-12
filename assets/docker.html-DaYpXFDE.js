import{_ as e,o as n,c as o,a as c}from"./app-DtKoVOCb.js";const i={},l=c(`<p>记录docker常用命令和含义。</p><h3 id="容器管理操作命令" tabindex="-1"><a class="header-anchor" href="#容器管理操作命令"><span>容器管理操作命令</span></a></h3><ul><li><code>docker run</code>： 创建一个新的容器并运行</li><li><code>docker start</code>：启动一个或者多个容器</li><li><code>docker stop</code>：停止运行的容器（一个）</li><li><code>docker restart</code>： 重启容器</li><li><code>docker rm</code>：删除一个或者多个容器</li><li><code>docker pause</code>： 暂停容器中所有的进程</li><li><code>docker unpause</code>：恢复容器中所有的进程</li><li><code>docker create</code>：创建一个新的容器但不启动它</li><li><code>docker ps</code>：列出容器</li><li><code>docker port</code>：列出指定容器的端口映射</li></ul><h3 id="镜像仓库命令" tabindex="-1"><a class="header-anchor" href="#镜像仓库命令"><span>镜像仓库命令</span></a></h3><ul><li><code>docker pull</code>：拉取镜像（后面跟镜像名称，例如：mysql:版本）</li><li><code>docker login</code>：登陆到一个Docker镜像仓库</li><li><code>docker logout</code>：从当前Docker镜像仓库退出</li><li><code>docker pull</code>：从镜像仓库中拉取或者更新指定镜像</li><li><code>docker push</code>：将本地的镜像上传到镜像仓库</li><li><code>docker search</code>：从Docker Hub 查找镜像</li><li><code>docker images</code>：列出本地镜像</li><li><code>docker rmi</code>：删除本地一个或者多个镜像</li><li><code>docker tag</code>：给本地镜像打标签</li><li><code>docker build</code>：使用Dockerfile创建镜像</li></ul><h3 id="运行nginx容器" tabindex="-1"><a class="header-anchor" href="#运行nginx容器"><span>运行nginx容器</span></a></h3><ul><li><p><code>sudo docker run --name test-nginx -d -p 80:80 nginx</code>：创建并运行test-nginx 容器</p><pre><code>sudo docker run 运行一个新的Docker容器
--name 容器名称
-d 在后台运行容器并返回容器ID
-p 80:80将容器的80端口映射到主机的80端口
nginx 使用官方的Nginx镜像来创建容器
</code></pre></li></ul><h3 id="第一次运行nginx容器并复制相应配置文件到指定目录" tabindex="-1"><a class="header-anchor" href="#第一次运行nginx容器并复制相应配置文件到指定目录"><span>第一次运行nginx容器并复制相应配置文件到指定目录</span></a></h3><ol><li><p>先运行一次nginx，为了拷贝容器内配置文件到本地</p><pre><code>docker run -d -p 80:80 --name nginx
-v /usr/local/docker/nginx/html:/usr/share/nginx/html
-v /usr/local/docker/nginx/logs:/var/log/nginx nginx:latest


说明：
docker run -d -p 80:80 --name nginx名称
-v /usr/local/docker/nginx/html:/usr/share/nginx/html
-v /usr/local/docker/nginx/logs:/var/log/nginx nginx镜像（nginx:latest）
</code></pre></li><li><p>拷贝容器内配置文件到本地</p><pre><code>docker container cp nginx:/etc/nginx(拷贝对象) /usr/local/docker/nginx/(目标地址)
</code></pre></li><li><p>删除之前的容器</p><pre><code>docker stop nginx（创建的nginx容器名）
docker rm nginx -- 删除容器
</code></pre></li><li><p>根据本地配置文件运行新容器</p><pre><code>docker run -d -p 80:80 -p 443:443 --name nginx容器名称
-v /usr/local/docker/nginx/conf:/etc/nginx
-v /usr/local/docker/nginx/logs:/var/log/nginx
-v /usr/local/docker/nginx/html:/usr/share/nginx/html
-v /usr/local/docker/nginx/conf/mime.types: /usr/local/docker/nginx/conf/mime.types nginx:latest


说明：使用-v 进行映射到指定配置文件
</code></pre></li><li><p>访问服务器80端口出现以下内容表示成功</p><pre><code>Welcome to nginx!
If you see this page, the nginx web server is successfully installed and working. Further configuration is required.

For online documentation and support please refer to nginx.org.
Commercial support is available at nginx.com.

Thank you for using nginx.
</code></pre></li></ol>`,9),r=[l];function d(a,s){return n(),o("div",null,r)}const g=e(i,[["render",d],["__file","docker.html.vue"]]),p=JSON.parse('{"path":"/blogs/docker/docker.html","title":"docker-学习笔记","lang":"zh-CN","frontmatter":{"title":"docker-学习笔记","date":"2024-06-04T15:53:52.000Z","tags":["docker"],"hideComments":true,"categories":["docker"]},"headers":[{"level":3,"title":"容器管理操作命令","slug":"容器管理操作命令","link":"#容器管理操作命令","children":[]},{"level":3,"title":"镜像仓库命令","slug":"镜像仓库命令","link":"#镜像仓库命令","children":[]},{"level":3,"title":"运行nginx容器","slug":"运行nginx容器","link":"#运行nginx容器","children":[]},{"level":3,"title":"第一次运行nginx容器并复制相应配置文件到指定目录","slug":"第一次运行nginx容器并复制相应配置文件到指定目录","link":"#第一次运行nginx容器并复制相应配置文件到指定目录","children":[]}],"git":{},"filePathRelative":"blogs/docker/docker.md"}');export{g as comp,p as data};
