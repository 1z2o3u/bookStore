const express =require('express');
const mysql=require('mysql');
var app =express();



var formidable = require('formidable'); //上传功能的插件
var path = require('path')
var fs = require("fs");


app.use(function(req,res,next){
	res.set('Access-Control-Allow-origin','*');
	res.set('Access-Control-Allow-Headers','content-type')
	next();
})

// 注册
app.post('/register',function(req,res){
		var body=''
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'bookstore'
		});
		req.on('data',function(chunk){
			body+=chunk;
		})
		req.on('end',function(){
			body=JSON.parse(body)
			console.log(body,'+++++++')
			var params={
				phone:body.phone,
				pwd:body.pwd,
				rePwd:body.rePwd,
				nickName:body.nickName,
				idf:body.idf
			}
			connection.connect(); 
			var  addSql = `INSERT INTO UserInfo(pwd,nickname,phone) VALUES('${ params.pwd}',
			"${ params.nickName}","${ params.phone}")`;
			connection.query(addSql,function (err, result) {
			       if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})
			        }else{
			         	res.send({code:1,msg:'注册成功！'})
			        }            
			});  
			connection.end();
		})
	})


 // 判断用户名是否存在


app.post('/isUser',function(req,res){
		var body=''
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'bookstore'
		});
		req.on('data',function(chunk){
			body+=chunk;
		})
		req.on('end',function(){
			body=JSON.parse(body)
			console.log(body,'+++++++')
			var params={
				phone:body.phone,
			}
			connection.connect(); 
			var select=`select * from UserInfo where phone='${params.phone}' `
			connection.query(select,function (err, result) {
			        if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})
			         }else if(result.length>0){
			         	console.log('用户名已存在',result);
			         	res.send({code:2,msg:'用户名已存在！'})
			         	
			         }else {
			         	res.send({code:1,msg:'可用！'})
			         	
			         }               
			});
			connection.end();
		})
	})


 // 登录

app.post('/login',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body+=chunk;
	});
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		var params={
			phone:body.phone,
			pwd:body.pwd
		}
		client.connect();
		var sql=`select * from UserInfo where phone='${params.phone}' and pwd='${params.pwd}' `
		client.query(sql,function(err,result){
			if(err){
				res.send({code:0,msg:'网络异常，请稍后重试！'})
			}else{
				if(result.length>0){
					res.send({code:1,msg:'登录成功！'})
				}else{
					res.send({code:2,msg:'手机号或密码错误!'})
				}
			}
		})
		client.end();
		})

})

////////

app.post('/bookList',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body+=chunk;
	});
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		var params={
			bookName:body.bookName,
		}
		var searchList=[]
		client.connect();
		var sql=`select * from books `
		client.query(sql,function(err,result){
			if(err){
				res.send({code:0,msg:'网络异常，请稍后重试！'})
			}else{
				if(result.length>0){
                    var reg = new RegExp(params.bookName);
                    for(var i=0;i<result.length;i++){
                    	 console.log(params.bookName,'22222')
                        if(reg.test(result[i].Title)&&params.bookName){
                            console.log(1122,result[i].Title,typeof(reg))
                            searchList.push(result[i])
                        }
                    }
					res.send({code:1,msg:'加载成功！',result:result,searchList:searchList})
					
				}else{
					res.send({code:2,msg:'加载失败，请稍后重试！'})
				}
			}
		})
		client.end();
		})
})


// Search

app.post('/searchList',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body+=chunk;
	});
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		var params={
			bookName:body.bookName,
		}
		var searchList=[]
		client.connect();
		var sql=`select * from books `
		client.query(sql,function(err,result){
			if(err){
				res.send({code:0,msg:'网络异常，请稍后重试！'})
			}else{
				if(result.length>0){
                  
                    var reg = new RegExp(params.bookName);

                    for(var i=0;i<result.length;i++){
                    	 console.log(params.bookName,'22222')
                        if(reg.test(result[i].Title)){
                            // console.log(1122,result[i].Title)
                            searchList.push(result[i])
                        }
                    }
					res.send({code:1,msg:'加载成功！',result:result,searchList:searchList})
					
				}else{
					res.send({code:2,msg:'加载失败，请稍后重试！'})
				}
			}
		})
		client.end();
		})
})



// 判断书是否存在购物车


app.post('/isCar',function(req,res){
		var body=''
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'bookstore'
		});
		req.on('data',function(chunk){
			body+=chunk;
		})
		req.on('end',function(){
			body=JSON.parse(body)
			var params={
				bookId:body.bookId,
			}
			connection.connect(); 
			var select=`select * from car where BookID='${params.bookId}' `
			connection.query(select,function (err, result) {
			        if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})
			         }else if(result.length>0){
			         	res.send({code:2,result:result,msg:'书名已存在！'})
			         	
			         }else {
			         	res.send({code:1,msg:'书名不存在，加入！'})
			         	
			         }               
			});
			connection.end();
		})
	})

// 书名存在，加入购物车

app.post('/addMore',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body=chunk;
	})
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		var params={
			bookId:body.data.bookId,
            count:body.data.count,
            username:body.data.username,
		}
		client.connect();
		var  addSql = `update car set Count='${params.count}' 
		 where BookID='${params.bookId}' and UserName='${params.username}' `
			client.query(addSql,function (err, result) {
			        if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})
			        	console.log(err,'试试手');

			         }else{
			         	res.send({code:1,msg:'加入购物车成功！'})
			         }            
			}); 
			client.end();
	})

})


//书名不存在， 加入购物车

app.post('/addCar',function(req,res){
		var body=''
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'bookstore'
		});
		req.on('data',function(chunk){
			body+=chunk;
		})
		req.on('end',function(){
			body=JSON.parse(body)
			var params={
				bookId:body.data.bookId,
				src:body.data.src,
                title:body.data.title,
                costPrice:body.data.costPrice,
                count:body.data.count,
                username:body.data.username,
			}
			connection.connect(); 
				var  addSql = `INSERT INTO car(BookID,Src,Title,CostPrice,Count,UserName) 
				VALUES('${ params.bookId}','${ params.src}',"${ params.title}","${ params.costPrice}",
				"${ params.count}","${ params.username}")`;
				connection.query(addSql,function (err, result) {
					if(err){
					    res.send({code:0,msg:'网络异常，请稍后重试！'})
					    console.log("看看看看",params,err)
					}else{
					        res.send({code:1,msg:'加入购物车成功！'})
					}             
				});  	
				
			connection.end();
		})
	})

// 展示购物车

app.post('/carList',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body+=chunk;
	});
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		var params={
                username:body.data.username,
			}
		var carList=[]
		client.connect();
		var sql=`select * from car where UserName=${params.username}`
		client.query(sql,function(err,result){
			if(err){
				res.send({code:0,msg:'网络异常，请稍后重试！'})
			}else{
				if(result.length>0){
                    for(var i=0;i<result.length;i++){
                        if(result[i].UserName==params.username){
                            carList.push(result[i])
                        }
                    }
					res.send({code:1,msg:'加载成功！',carList:carList})
				}else{
					res.send({code:2,msg:'加载失败，请稍后重试！'})
				}
			}
		})
		client.end();
		})
})


// 购物车操作

app.post('/operateCar',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body+=chunk;
	});
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		var params={
                bookId:body.data.id,
                operate:body.data.operate,
                count:body.data.count,

			}
		// var carList=[]
		client.connect();

			// 加一
		if(params.operate=='add'){
			var  sql = `UPDATE car SET Count='${params.count}' WHERE BookID='${params.bookId}'`;
			client.query(sql,function(err,result){
				if(err){
					res.send({code:0,msg:'网络异常，请稍后重试！'})
				}else{
					res.send({code:1,msg:'加载成功！'})
				}
			})
		
		}
			// 减一

		if(params.operate=='minus'){
			var  sql = `UPDATE car SET Count='${params.count}' WHERE BookID='${params.bookId}'`;
			client.query(sql,function(err,result){
				if(err){
					res.send({code:0,msg:'网络异常，请稍后重试！'})
				}else{
					res.send({code:1,msg:'加载成功！'})
				}
			})
		}

		// 删除


		if(params.operate=='del'){
			var  sql =  `DELETE FROM car WHERE BookID='${params.bookId}'`;
			client.query(sql,function(err,result){
				if(err){
					res.send({code:0,msg:'网络异常，请稍后重试！'})
				}else{
					res.send({code:1,msg:'删除成功！'})
				}
			})
		}

		client.end();
	})
})

// 结算，数据存入订单表

app.post('/addOrder',function(req,res){
		var body=''
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'bookstore'
		});
		req.on('data',function(chunk){
			body+=chunk;
		})
		req.on('end',function(){
			body=JSON.parse(body)
			body=body.data
			var val=''
			var carID=''
			for(var i=0;i<body.length;i++){
				var params={
					bookId:body[i].BookID,
					src:body[i].Src,
	                title:body[i].Title,
	                costPrice:body[i].CostPrice,
	                count:body[i].Count,
	                username:body[i].UserName,
	                state:body[i].state,
				}
				if(i==(body.length-1)){
					val+=`("${ params.bookId}","${ params.src}","${ params.title}","${ params.costPrice}",
					"${ params.count}","${ params.username}","${ params.state}")`
				}else{
					val+=`("${ params.bookId}","${ params.src}","${ params.title}","${ params.costPrice}",
					"${ params.count}","${ params.username}","${ params.state}"),`	
				}
			}	
				connection.connect(); 
				var  addSql = `INSERT INTO orders (BookID,Src,Title,CostPrice,Count,UserName,State) 
				 VALUES ${val}`
				connection.query(addSql,function (err, result) {
					if(err){
					    res.send({code:0,msg:'网络异常，请稍后重试！'})
					}else{
					       res.send({code:1,msg:'生成订单成功！'})
					}             
				}); 

				connection.end(); 

	    })			
})


// 订单数据展示


app.post('/orderList',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body+=chunk;
	});
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		var params={
                username:body.data.username,
			}
		var orderList=[]
		client.connect();
		var sql=`select * from orders where UserName=${params.username}`
		client.query(sql,function(err,result){
			if(err){
				res.send({code:0,msg:'网络异常，请稍后重试！'})
			}else{
				if(result.length>0){
                    for(var i=0;i<result.length;i++){
                        if(result[i].UserName==params.username){
                            orderList.push(result[i])
                        }
                    }
					res.send({code:1,msg:'加载成功！',orderList:orderList})
				}else{
					res.send({code:2,msg:'加载失败，请稍后重试！'})
				}
			}
		})
		client.end();
		})
})

// 获取昵称
app.post('/getNick',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body+=chunk;
	});
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		var params={
                username:body.user,
			}
		var userinfo=''
		client.connect();
		var sql=`select * from userinfo where phone=${params.username}`
		client.query(sql,function(err,result){
			if(err){
				res.send({code:0,msg:'网络异常，请稍后重试！'})
			}else{
				if(result.length>0){
					res.send({code:1,msg:'加载成功！',userinfo:result})
				}else{
					res.send({code:2,msg:'加载失败，请稍后重试！'})
				}
			}
		})
		client.end();
		})
})

// 修改用户信息

app.post('/updateUser',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body=chunk;
	})
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		body=body.data
		var params={
			nickName:body.nickName,
			rePwd:body.rePwd,
			phone:body.phone,
		}
		client.connect();

		if(params.rePwd==''){
			var  addSql = `UPDATE userinfo SET nickName='${params.nickName}' where phone='${params.phone}'`;
			client.query(addSql,function (err, result) {
			        if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})
			         }else{
			         	res.send({code:1,msg:'修改成功！'})
			         }            
			}); 	
		}else{
			var  addSql = `UPDATE  userinfo SET nickName='${params.nickName}'
			,pwd='${params.rePwd}' where phone='${params.phone}'`;
			client.query(addSql,function (err, result) {
			        if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})
			        	console.log('sss',err)
			         }else{
			         	res.send({code:1,msg:'修改成功！'})
			         	
			         }            
			}); 
		}
		
			client.end();
	})

})


// 添加地址

app.post('/addAddress',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body=chunk;
	})
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		var params={
			address:body.data.address,
			phone:body.data.phone
		}
		client.connect();
		var  addSql = `update userinfo set address='${params.address}' 
		 where phone='${params.phone}' `
			client.query(addSql,function (err, result) {
			        if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})

			         }else{
			         	res.send({code:1,msg:'添加地址成功！'})
			         }            
			}); 
			client.end();
	})

})

// 删除地址

app.post('/delAddress',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body=chunk;
	})
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		var params={
			phone:body.phone
		}
		client.connect();
			var  addSql = `UPDATE  userinfo SET address='' where phone='${params.phone}'`;
			client.query(addSql,function (err, result) {
			        if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})
			         }else{
			         	res.send({code:1,msg:'删除成功！'})
			         	
			         }            
			}); 
		client.end();
	})

})






////////////////////

app.post('/image', (req, res,next) => {
	console.log(req.body,'ppppppppppp')
  		//上传文件只能通过这个插件接收  file是上传文件 fields是其他的
  		var form = new formidable.IncomingForm();
  		form.uploadDir = path.join(__dirname, '../BookStore/static/'); //文件保存的临时目录为static文件夹（文件夹不存在会报错，一会接受的file中的path就是这个）
  		form.maxFieldsSize = 1 * 1024 * 1024; //用户头像大小限制为最大1M    
  		form.keepExtensions = true; //使用文件的原扩展名  
  		form.parse(req, function (err, fields, file) {
    		var filePath = '';
    		//如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。  
		    if(file.tmpFile){
				filePath = file.tmpFile.path;
		    }else{
		      	for (var key in file) {
		        	if (file[key].path && filePath === '') {
		          		filePath = file[key].path;
		          		break;
		        	}
		      	}
		    }
    			//文件移动的目录文件夹，不存在时创建目标文件夹  
    		var targetDir = path.join(__dirname, '../BookStore/static/uploads');
    		if(!fs.existsSync(targetDir)){
      			fs.mkdir(targetDir);
    		}
    		var fileExt = filePath.substring(filePath.lastIndexOf('.'));
    			//判断文件类型是否允许上传  
    		if(('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
      			var err = new Error('此文件类型不允许上传');
      			res.json({
        			code: -1,
        			message: '此文件类型不允许上传'
      			});
    		}else{
     			 //以当前时间戳对上传文件进行重命名  
      			var fileName = new Date().getTime() + fileExt;
      			var targetFile = path.join(targetDir, fileName);
      			//移动文件  
      			fs.rename(filePath, targetFile, function (err) {
		        	if (err) {
		        		console.info(err);
			        	res.json({
			        		code: -1,
			            	message: '操作失败'
			        	});
		        	}else{
		        		// User.update(
		          //   		{username: req.cookies.username},
		          // 			{avatar: fileName}, 
		          // 			(err2, doc2) => {
		          // 		 		console.log('BBBBBBBBBBBBBBB');
		          //   			//上传成功，返回文件的相对路径  
		          //   			// var fileUrl = '/static/upload/' + fileName;
		          //   			res.json({
		          //     				code: 0,
		          //     				fileUrl: fileName
		          //   			});
		          // 			}
		          // 		)

		          			res.send({avatar:fileName,code:1})
		          			// console.log('uuuuuuuuuuuuuuu')
		        	}
      			});
    		}
  		
  	})	
})

/////////////////

// 后端操作

// 新增
app.post('/add',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body=chunk;
	})
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		body=body.data
		var params={
			title:body.title,
            present_price:parseFloat(body.present_price),
            cost_price:parseFloat(body.cost_price),
            author:body.author,
            src:body.src
		}
		client.connect();
		var  addSql = `INSERT INTO books(Title,Src,PresentPrice,CostPrice,SellID) VALUES
		('${ params.title}','${ params.src}','${ params.present_price}','${ params.cost_price}','${ params.author}')`;
			client.query(addSql,function (err, result) {
			        if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})
			         }else{
			         	res.send({code:1,msg:'添加成功！'})
			         }            
			}); 
			client.end();
	})

})

// 删除

app.post('/del',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body=chunk;
	})
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		let BookID=body.BookID
		var params={
			
		}
		client.connect();
		var  addSql = `DELETE FROM books
        WHERE BookID='${BookID}'`;
			client.query(addSql,function (err, result) {
			        if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})
			         }else{
			         	res.send({code:1,msg:'删除成功！'})
			         }            
			}); 
			client.end();
	})

})

// 修改


app.post('/update',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body=chunk;
	})
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		body=body.data
		var params={
			title:body.title,
            present_price:parseFloat(body.present_price),
            cost_price:parseFloat(body.cost_price),
            // author:body.author,
            src:body.src,
            BookID:body.BookID
		}
		client.connect();
		var  addSql = `UPDATE books SET Title='${params.title}',PresentPrice='${params.present_price}',
		CostPrice='${params.cost_price}'  WHERE BookID='${params.BookID}'`;
			client.query(addSql,function (err, result) {
			        if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})
			        	// console.log('哈哈',params)

			         }else{
			         	res.send({code:1,msg:'修改成功！'})
			         	
			         }            
			}); 
			client.end();
	})

})

// 查询

app.post('/select',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body=chunk;
	})
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		let BookID=body.BookID
		var params={
			
		}
		client.connect();
		var  addSql = `select * from books where BookID='${BookID}'`;
			client.query(addSql,function (err, result) {
			        if(err){
			        	res.send({code:0,msg:'网络异常，请稍后重试！'})
			         }else{
			         	res.send({code:1,msg:'查询成功！',result:result})
			         }            
			}); 
			client.end();
	})

})


//订单管理

app.post('/getOrder',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body+=chunk;
	});
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		client.connect();
		var sql=`select * from orders `
		client.query(sql,function(err,result){
			if(err){
				res.send({code:0,msg:'网络异常，请稍后重试！'})
			}else{
				if(result.length>0){
					res.send({code:1,msg:'加载成功！',orderList:result})
				}else{
					res.send({code:2,msg:'加载失败，请稍后重试！'})
				}
			}
		})
		client.end();
		})
})

//用户管理

app.post('/getUser',function(req,res){
	var body=''
	req.on('data',function(chunk){
		body+=chunk;
	});
	req.on('end',function(){
		var client=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'bookstore'
		});
		body=JSON.parse(body);
		client.connect();
		var sql=`select * from userinfo `
		client.query(sql,function(err,result){
			if(err){
				res.send({code:0,msg:'网络异常，请稍后重试！'})
			}else{
				if(result.length>0){
					res.send({code:1,msg:'加载成功！',userList:result})
				}else{
					res.send({code:2,msg:'加载失败，请稍后重试！'})
				}
			}
		})
		client.end();
		})
})


app.listen(3000); 