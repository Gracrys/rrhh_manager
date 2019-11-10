var express = require('express');
const Vue = require('vue')
const server = express();
var eVue = require("express-vue");
// var eVue = require('@doweb/vuexpress').vueRenderer;
const cors = require('cors');
const path = require("path");
const renderer = require('vue-server-renderer').createRenderer()

// const fs = require('fs');
// app.use(cors());
// app.use(require('body-parser')());

// function readPosts () {
// 	return JSON.parse(fs.readFileSync('./storage/posts.json', 'utf8'));
// }
// const vueOptions = {
// 	views: './src',
	
// 	watch: false,
	
// 	publicPath: './public',
// 	 onError: (err) => console.log("help" , err), // error handler
//     onReady: () => console.log("success")
// };

//     //Setup
//     const env = process.env.NODE_ENV || "development";
//     const router = express.Router();
//     let logType = "dev";
//     app.locals.ENV = env;
//     app.locals.ENV_DEVELOPMENT = (env === "development");
//     app.locals.rootPath = process.env.ROOT_PATH;

//     //ExpressVue Setup
    

// const vueOptions = {
//     rootPath: path.join(__dirname, '../src')
// };
// // eVue.use(app, vueOptions);
// const expressVueMiddleware = eVue.init(vueOptions);
//     app.use(expressVueMiddleware);
// // const renderer = eVue(vueOptions);
// // app.use(renderer);
// app.use(express.static(path.join(__dirname, 'src')));
// // const expressVueMiddleware = eVue.init(vueOptions);
// // eVue.use(app, vueOptions)
//     //the rest of your express routes.
// app.use("/", router);
// // app.use(expressVueMiddleware).then(x => {
// app.get('/', 
// 	function(req, res){
// 		// res.json(readPosts());
// 		const data = {
//         otherData: 'Something Else'
//     };
//     req.vueOptions = {
//         head: {
//             title: 'RRHH Manager',
            
//         }
//     }
//     console.log("/")
//      res.renderVue('./App.vue');
//     // res.render('./App.vue', {newData : "myData"});
// });
import app from './App.vue'
const app1 = new Vue({
  render: h => h(xApp),
}).$mount('#app')

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>The visited URL is: {{ url }}</div>`
  })

 renderer.renderToString(app1).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
})

// app.post('/', 
// 	function(req, res){
// 		// console.log(req)
// 		console.log(req.body)
// 		// console.log(req.header)
// 		// console.log(res)
// 		var newPost = Array.from(JSON.parse(fs.readFileSync('./storage/posts.json', 'utf8')))
// 		newPost.push(req.body)
// 		console.log(newPost)
// 		fs.writeFile('./storage/postState.json', JSON.stringify(newPost), function(err) {
// 		  // If an error occurred, show it and return
// 		  if(err) return console.error(err);
// 		  // Successfully wrote to the file!
// 		});
// 	});

server.listen(8081);
console.log("Server Listening on port 3001....");
