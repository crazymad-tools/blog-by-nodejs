-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `class` int(10) NOT NULL COMMENT '文章分类',
  `md` text CHARACTER SET utf8 NOT NULL COMMENT 'markdown文本格式',
  `publish_date` datetime NOT NULL COMMENT '文章发布时间',
  `modify_date` datetime NOT NULL COMMENT '文章上次修改时间',
  `abstract` text CHARACTER SET utf8,
  `category` int(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (8,'个人博客系统开发日志1、2',2,'### 2017.8.31\nmysql数据库构建测试完毕，nodejs连接mysql测试完成。\n### 2017.9.1\nnodejs连接mysql测试完成，完成session的初步测试，简单测试了一下登录功能。\n','2017-09-02 23:19:15','2017-09-03 12:57:59','### 2017.8.31\r\nmysql数据库构建测试完毕，nodejs连接mysql测试完成。\r\n### 2017.9.1\r\nnodejs连接mysql测试完成，完成session的初步测试，简单测试了一下登录功能。\r\n',1),(9,'个人博客系统开发日志3',2,'### 2017.9.2\n简单实现了一下显示已有博客文章的功能，将以前写的markdown解析模块整合到了前端。考虑到\n开发难度的问题，我把markdown解析放到了前端，也就是说将原始markdown文本发送到前端，由\n前端调用markdown模块来解析，这样也能减小服务器的压力。\n\n完成了编写新博客文章功能，下一步准备完成编辑已有博客文章功能','2017-09-02 23:20:36','2017-09-02 23:20:36','### 2017.9.2\r\n简单实现了一下显示已有博客文章的功能，将以前写的markdown解析模块整合到了前端。考虑到\r\n开发难度的问题，我把markdown解析放到了前端，也就是说将原始markdown文本发送到前端，由\r\n前端调用markdown模块来解析，这样也能减小服务器的压力。\r\n\r\n完成了编写新博客文章功能，下一步准备完成编辑已有博客文章功能',1),(10,'个人博客系统开发日志4',2,'##2017.9.3\n完成了在线删改已有博客文章的功能','2017-09-03 00:29:48','2017-09-03 13:12:10','##2017.9.3\r\n完成了在线删改已有博客文章的功能',1),(14,'个人博客系统开发日志5',2,'## 2017.9.4\n昨天给自己放了一个假（明明已经放了一暑假的假好吧）。\n今天完成了上传图片的功能，这个功能搞了好久才搞定的，去年我用php写的上一版的博客系统也遇到了上传图片的问题，当时没解决，一年后的今天在用nodejs写的时候解决了。\n我的想法是，在写博客的同时可以完成上传图片和插入图片两个功能，如果想要在文章中插入图片的话，一个方法是用外链，一个方法就是即时上传图片到服务器专门放图片的文件夹下，如果是服务器中已有的图片的话，也可以通过查询的方法来显示服务器中已有图片列表。','2017-09-05 19:57:20','2017-09-05 19:57:20','## 2017.9.4\r\n昨天给自己放了一个假（明明已经放了一暑假的假好吧）。\r\n今天完成了上传图片的功能，这个功能搞了好久才搞定的，去年我用php写的上一版的博客系统也遇到了上传图片的问题，当时没解决，一年后的今天在用nodejs写的时候解决了。\r\n我的想法是，在写博客的同时可以完成上传图片和插入图片两个功能，如果想要在文章中插入图片的话，一个方法是用外链，一个方法就是即时上传图片到服务器专门放图片的文件夹下，如果是服务器中已有的图片的话，也可以通过查询的方法来显示服务器中已有图片列表。',1),(15,'个人博客系统开发日志6',2,'##2017.9.6\n将目前进度部署到了linux云服务器上，测试了一下，基本OK\n完成了注册功能。','2017-09-06 00:15:47','2017-09-06 22:59:31','##2017.9.6\r\n将目前进度部署到了linux云服务器上，测试了一下，基本OK\r\n完成了注册功能。',1),(16,'个人博客系统开发日志7',2,'##2017.9.7\n开始写博客文章分类的功能\n![images/blog/blog_category.png](images/blog/blog_category.png)','2017-09-07 14:46:29','2017-09-07 14:46:29','##2017.9.7\r\n开始写博客文章分类的功能\r\n![images/blog/blog_category.png](images/blog/blog_category.png)',1),(17,'个人博客系统开发日志8',2,'##2017.9.9\n昨天摸鱼摸了一整天，今天在继续搞前天在做的分类页面。把在线删改博客分类信息的功能做出来了。\n![images/blog/blog_category_edit.png](images/blog/blog_category_edit.png)\n在非登录状态下，操作栏的编辑删除按钮会变成灰色，点击的话会提醒你是否选择去登录。\n![images/blog/blog_category_gray.png](images/blog/blog_category_gray.png)','2017-09-09 23:48:03','2017-09-09 23:52:07','##2017.9.9\r\n昨天摸鱼摸了一整天，今天在继续搞前天在做的分类页面。把在线删改博客分类信息的功能做出来了。\r\n![images/blog/blog_category_edit.png](images/blog/blog_category_edit.png)',1),(18,'个人博客系统开发日志9',2,'##2019.9.10\n完善了一下登出机制\n继续昨天的工作，在写分类页面的前端显示，发现自己在UI方面真的是没天赋，做出来的页面丑得一匹。。。\n![images/blog/blog_category_show_detail.png](images/blog/blog_category_show_detail.png)','2017-09-10 11:16:10','2017-09-10 23:12:24','##2019.9.10\r\n完善了一下登出机制\r\n继续昨天的工作，在写分类页面的前端显示，发现自己在UI方面真的是没天赋，做出来的页面丑得一匹。。。\r\n![images/blog/blog_category_show_detail.png](images/blog/blog_category_show_detail.png)',1),(19,'多路复用I/O Epoll的简单使用',3,'不负责任地放上中文版[Epoll维基](https://zh.wikipedia.org/wiki/Epoll)，科学上网。\n\n原理什么的不多讲，我也不是很熟，这里就简单写一些实际应用要怎么写，当然也是很简单的demo。\n\n\n## 结构体介绍\n```cpp\ntypedef union epoll_data {     \n    void        *ptr;\n    int          fd;           // 发生事件的主体，各种描述符\n    uint32_t     u32;\n    uint64_t     u64;\n} epoll_data_t;\n\nstruct epoll_event {\n   uint32_t     events;      /* Epoll events */       // 要监听的事件类型\n   epoll_data_t data;        /* User data variable */ \n};\n```\n\n## API介绍\n\n```cpp\nint epoll_create(int size);\n// 这个函数用来创建epoll\n// 参数size是指这个epoll最多能同时监听多少个文件描述符的事件\n// 函数返回值是epoll的文件描述符，linux下面文件描述符简直无处不在\nint efd = epoll_create(10);\n```\n\n```cpp\nint epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);\n// 这个函数用来管理事件的监听\n// 参数epfd就是用epoll_create函数获得的文件描述符\n// 参数op是一个用位数来表示配置的变量，表示当前操作是增加事件还是删除事件\n// 参数event保存的是具体的事件配置\nint fd = socket(FA_INET, STREAM, 0);\n...\nstruct epoll_event event;\nevent.data.fd = fd;\nevent.events = EPOLLIN | EPOLLRDHUP;\nepoll_ctl(efd, EPOLL_CTL_ADD, fd, &event);\n```\n- op参数\n	+ EPOLL_CTL_ADD  将目标文件描述符fd已经fd对应的事件，通过efd注册到对应的epoll上\n	+ EPOLL_CTL_MOD 修改事件的具体事件通过文件描述符\n	+ EPOLL_CTL_DEL 将fd对应的事件从epoll中删除\n- struct epoll_event 事件及结构体的书写\n	- 一个epoll_event可以设置监听多种事件类型\n	- 最重要的是两件事，一个是设置对应的要监听的文件描述符，一个是设置监听事件类型，两者都是直接赋值的方式。\n	- 常用事件类型：\n		- EPOLLIN 可读事件(对等方套接字合法关闭也是可读事件)\n		- EPOLLOUT 写事件\n		- EPOLLRDHUP 对等方套接字关闭连接事件\n		- EPOLLPRI 有紧急需要读的事件\n		- EPOLLERR 文件描述符发生异常条件\n		\n```cpp\nint epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);\n// 这个函数用来获取当前的事件处于待处理状态的文件描述符\n// epfd是epoll描述符\n// events是事件列表，用来获取待处理的事件，\n// maxevents表示最多能取多少个struct epoll_event\n// timeout表示超时时间，如果一直没有事件响应，那么到了超时时间，函数会阻塞状态返回回来,-1表示没有超时时间，一直阻塞等待事件的到达\nstruct epoll_event events[10];\nint ret = epoll_wait(efd, events, 10, -1);\nfor (int i = 0; i < ret; i++) {\n	char buf[1024] = { 0 };\n	int res = read(events[i].data.fd, buf, sizeof buf);\n	if (res == 0) {\n		epoll_ctl(efd, EPOLl_CTL_DEL, &events[i]);   // 从epoll中删除文件描述符\n		close(events[i].data.fd); \n	} else {\n		cout << buf << endl;\n	}\n}\n```\n\n## 代码实现\n\n```\n#include <iostream>\n#include <algorithm>\n#include <vector>\n#include <map>\n#include <sys/epoll.h>				\n\n#include <crazy/net/Socket.h>					// 个人封装的网络库，相当简单，未来会完善（说出来我自己都不信）\n\nusing namespace std;\n\nint main() {\n	map<int, Socket> fdClient;					\n	Socket server(8080);						// 本地套接字（用我自己写的一个库封装了起来）\n	server.init();								// 初始化套接字\n	server.Bind();								// 绑定套接字\n	server.Listen(10);							// 设置监听数量\n\n	int efd = epoll_create(10);					// 创建epoll事件监听器,efd事件该事件监听器的文件描述符\n	struct epoll_event ev;						// 一次性事件\n	struct epoll_event events[10];					// 事件列表，用来从epoll中取出事件\n	ev.events = EPOLLIN;							// 仅当有可读事件事件发生唤醒\n	ev.data.fd = server.getFd();					// 将本地套接字放入事件结构体中\n	epoll_ctl(efd, EPOLL_CTL_ADD, server.getFd(), &ev);		// 将准备好的事件放入监听列表中\n\n	while (true) {								// 事件循环\n		int ret = epoll_wait(efd, events, 10, -1);			// 用events从epoll中获取事件列表\n		for (int i = 0; i < ret; i++) {\n			if (events[i].data.fd == server.getFd()) {		// 如果该套接字是本地套接字，那么证明有新链接\n				SocketData clientSock;\n				server.Accept(&clientSock);\n				ev.data.fd = clientSock.fd;					// 给临时事件结构体赋值网络套接字\n				ev.data.fd == EPOLLIN | EPOLLET;			// 设置要监听的事件\n				epoll_ctl(efd, EPOLL_CTL_ADD, clientSock.fd, &ev);	// 将配置好的事件放入监听列表中\n				Socket client(clientSock);					// 创建对应的客户端套接字（方便读写）\n				fdClient.insert(pair<int, Socket>(clientSock.fd, client));\n			} else {								// 正常的I/O读写事件\n				char buf[100] = { 0 };\n				int ret = fdClient[events[i].data.fd].Read(buf, 100);\n				if (ret == 0) {						// 如果read返回值为0的话，对等方关闭套接字\n					map<int, Socket>::iterator it = fdClient.find(events[i].data.fd);		// 从映射列表中找到要删除的套接字\n					if (it != fdClient.end()) {		// 确定有这个映射\n						epoll_ctl(efd, EPOLL_CTL_DEL, events[i].data.fd, NULL);			// 从epoll中删除事件\n						close(events[i].data.fd);			// 关闭回收文件描述符\n						fdClient.erase(it);				\n					}\n				} else if (ret == -1) {				// I/O异常\n					perror(\"peer connection error:\");\n				} else {							// 读到有效信息\n					cout << buf << endl;\n					fdClient[events[i].data.fd].Write(buf, strlen(buf));			// 并将收到的消息转发回去\n				}\n			}\n		}\n	}\n	\n	server.Close();			// 关闭本地套接字\n	close(efd);				// 关闭epoll文件描述符\n\n	return 0;\n}\n```\n上面代码中用到的网络套接字封装我放在github中了 : [crazy_net](https://github.com/crazymad-tools/lib/tree/master/net_http/net/net/net)\n\n','2017-09-10 11:33:46','2017-09-12 23:23:20','不负责任地放上中文版[Epoll维基](https://zh.wikipedia.org/wiki/Epoll)，科学上网。\r\n\r\n原理什么的不多讲，我也不是很熟，这里就简单写一些实际应用要怎么写，当然也是很简单的demo。\r\n',2),(20,'markdown测试专用',2,'- sss\n- sss\n- sss\n+ aaa\n+ aaa\n- aaa','2017-09-12 08:32:54','2017-09-12 08:43:29','- sss\r\n- sss\r\n- sss\r\n+ aaa\r\n+ aaa\r\n- aaa',0),(21,'个人博客系统开发日志10',2,'## 2017.9.12\n今天主要是在完善show页面，也就是文章内容显示页的前端，同时也优化了一下以前写的markdown解析器，给markdown解析器配备了专用的css文件，这样以后换个模块也能用。\n\n## 代码块的显示效果\n![images/blog/show_1.png](images/blog/show_1.png)\n\n## 列表的显示效果\n![images/blog/show_2.png](images/blog/show_2.png)','2017-09-12 21:58:51','2017-09-12 22:07:04','## 2017.9.12\r\n今天主要是在完善show页面，也就是文章内容显示页的前端，同时也优化了一下以前写的markdown解析器，给markdown解析器配备了专用的css文件，这样以后换个模块也能用。',1),(22,'个人博客系统开发日志11',2,'## 2017.9.22\n开学在忙着补考的事情，所以没怎么写代码，再加上最近还要学其他东西，所以进度变慢了。\n这两天在搞一些前端的研究，鉴于自己不是很喜欢使用现有的库（我连jquery都没用），所以打算自己写一套前端框架（仿佛在做梦）。\n今天搞定了动态淡入淡出加移动的效果。\n## 演示效果\n![images/blog/show_hide.gif](images/blog/show_hide.gif)\n之后我会将这个效果广泛应用到页面中','2017-09-22 18:18:24','2017-09-22 18:18:24','## 2017.9.22\r\n开学在忙着补考的事情，所以没怎么写代码，再加上最近还要学其他东西，所以进度变慢了。\r\n这两天在搞一些前端的研究，鉴于自己不是很喜欢使用现有的库（我连jquery都没用），所以打算自己写一套前端框架（仿佛在做梦）。\r\n今天搞定了动态淡入淡出加移动的效果。',1),(23,'个人博客系统开发日志12',2,'## 2017.11.5\n最近在摸鱼，没怎么写代码，但是断断续续也在写，这两天把首页好好写了一下，效果还不错，以后主页的排版应该是不会改了，就会在现在的基础上修修补补了。\n## 当前的主页\n![images/blog/2017-11-05.png](images/blog/2017-11-05.png)','2017-11-05 18:34:37','2017-11-05 18:34:37','## 2017.11.5\n最近在摸鱼，没怎么写代码，但是断断续续也在写，这两天把首页好好写了一下，效果还不错，以后主页的排版应该是不会改了，就会在现在的基础上修修补补了。',1);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `class_id` int(10) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `count` int(10) NOT NULL,
  `deleted` int(2) DEFAULT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'默认',1,0),(2,'个人博客系统开发日志',11,0),(3,'socket',1,0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_article`
--

DROP TABLE IF EXISTS `category_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_article` (
  `class_id` int(10) NOT NULL,
  `article_id` int(10) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `abstract` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '摘要，200字符限制'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_article`
--

LOCK TABLES `category_article` WRITE;
/*!40000 ALTER TABLE `category_article` DISABLE KEYS */;
INSERT INTO `category_article` VALUES (2,8,'个人博客系统开发日志1、2',NULL),(2,9,'个人博客系统开发日志3',NULL),(2,10,'个人博客系统开发日志4',NULL),(2,14,'个人博客系统开发日志5',NULL),(2,15,'个人博客系统开发日志6',NULL),(2,16,'个人博客系统开发日志7',NULL),(2,17,'个人博客系统开发日志8',NULL),(2,18,'个人博客系统开发日志9',NULL),(3,19,'多路复用I/O Epoll的简单试用',NULL);
/*!40000 ALTER TABLE `category_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_data`
--

DROP TABLE IF EXISTS `test_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_data`
--

LOCK TABLES `test_data` WRITE;
/*!40000 ALTER TABLE `test_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) NOT NULL,
  `head` varchar(255) NOT NULL,
  `admin` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'crazy_mad','r13858251304','default.png',1),(2,'test','123','default.png',0),(3,'Chen','123','default.png',0),(4,'Liu','123','default.png',0),(5,'yuan','123','default.png',0),(6,'刘亦菲','123','default.png',0),(7,'波多野结衣','123','default.png',0),(8,'小泽玛利亚','123','default.png',0),(9,'苍井空','123','default.png',0),(10,'松岛枫','123','default.png',0),(11,'加藤鹰','123','default.png',0),(12,'王震之','123','default.png',0),(13,'陈家乐','123','default.png',0),(14,'袁晶','123','default.png',0),(15,'猪','123','default.png',0),(16,'狗','123','default.png',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-22 21:45:58
