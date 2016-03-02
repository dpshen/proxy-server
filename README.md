### proxy服务
	在取到response的时候向wensocket服务器发送数据
### websocket服务
	在取到proxy发送的reqHeader和resHeader时，向所有client广播数据
### webui（静态服务）
	取到websoclet服务器发送的reqHeader和resHeader数据，根据选择的客户端IP过滤展示数据

### 数据库

#### proxyList表
每几分钟更新IP的recentTime，新增加的IP直接插入
name        | type  | discription 
------------|-------|-------------
IP          |string |调试的移动端IP
recentTime  |string |最近连接代理时间
mock        |bool   |是否开启mock功能

#### mockList表
 name   | type  | discription 
--------|-------|-------------
IP      |string |调试的移动端IP
url     |string |请求路径
public  |bool   |是否公用mock数据（true：IP必须为空。当修改为true时判断是否存在重复数据，清除IP，false：同时判断IP）
mockfile|string |mock的文件路径


### 功能设计
1. 选择调试IP，列表从数据库取，只显示n小时内的连接
2. 后端向前端发送所有数据，前端js过滤显示IP的请求
3. mock功能
    * mock功能总开关，对应proxyList表中的mock，proxy只mock该字段为true的数据
    * 点击需要mock的请求的mock按钮，输入mock数据
    * 选择是否公用mock数据（对应mockList的public，true不保存IP，false保存IP，proxy分别mock）

### 页面设计
仿照chrome的network功能进行开发