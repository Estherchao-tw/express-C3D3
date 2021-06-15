# express-ejs-layout

安裝 express-generator到系統中，只要安裝⼀次，之後不必再安裝
---

    $ npm install express-generator -g

=> ⽤express-generatator產⽣Web app基本程式框架 express-ejs-layout
--

    $ express --view=ejs express-ejs-layout

=> 在express-ejs-layout⽬錄下安裝node modules
--
    $ cd expreses-ejs-layout

    $ npm install

    $ npm start

在 app.js 中加入路由 /home
--
    var homeRouter = require('./routes/home');
    app.use('/home', homeRouter);
    
views ⽬錄下，新增home.ejs & header.ejs &  footer.ejs

在home.ejs 內輸入
        
        <%- include('header') %>


        <p>Hellow!EJS!</p>

        <%- title %>
        <% if(sayhi) { %>
          Hi
          <% }; %>
    
        <%- include('footer') %>

##之後輸入 `npm start` 就可以在 localhostL3000/home看到網頁了



