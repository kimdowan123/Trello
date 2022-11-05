const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // post 요청시 필요한 코드
var cors = require('cors');
app.use(cors());

// method override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//socket
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

const qs = require("query-string");

var db;
MongoClient.connect('mongodb+srv://kdw0247:324ehdhks@cluster0.kgri4.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (에러, client) {
	if (에러) return console.log(에러);
	db = client.db('trello');
	console.log('db연결완료')

	http.listen(8080, function () {
		console.log('listening on 8080')
	}); 
})


//index 경로
app.use(express.static(path.join(__dirname + '/trello/build')))
//localhost:8080 으로 들어왓을떄 react에서 완성한 파일 build한 index.html 보여주기
app.get('/', function (req, res) {
	res.render(path.join(__dirname + '/trello/build/index.html'))
});

//db data => front
app.get('/api/home', function (req, res) {
	db.collection('list').find().toArray(function (error, result) {	
		res.json(result)
	})
})


// list add
app.post('/api/ListAdd', function (req, res) {
	db.collection('count').findOne({ name: '게시물갯수' }, function (error, result) {
		var TotalPost = result.totalPost;
		db.collection('list').insertOne({
			_id: TotalPost + 1,
			name: req.body.name,
			ListProducer:req.body.ListProducer,
			items: []
		}, function (error, result) {
			console.log('저장완료')
			db.collection('count').updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, function (error, result) {
				if (error) { return console.log(error) }
			})
			res.redirect('/')
		});
	});
});


//list delete
app.delete('/api/ListDelete',function(req,res){
	db.collection('list').deleteOne(req.body, function (error, result) {
		console.log('삭제완료');
		res.status(200).send({ message: '성공햇습니다' })
	});
})

//task add
app.put('/api/addText', function (req, res) {
	db.collection('count').findOne({ name: '테스크갯수' }, function (error, result) {
		var TotalPost = result.totalPost;
		req.body._id = parseInt(req.body._id);
		db.collection('list').updateOne({ _id: req.body._id }, {
			$push: {
				items: { id: req.body.unique, content: req.body.content, userName:req.body.userName, profile:req.body.profile , items_id: TotalPost + 1 }
			}
		}, function (error, result) {
			db.collection('count').updateOne({ name: '테스크갯수' }, { $inc: { totalPost: 1 } }, function (error, result) {

				db.collection('task').insertOne({
					content: req.body.content,
					userName:req.body.userName,
					userID:req.body.userID, 
					profile:req.body.profile , 
					items_id: TotalPost + 1,
					userID:req.body.userID,
					Description:[]
				})
				// if (error) { return console.log(error) }
			})
			res.redirect('/home')
		})
	})
});

//다른 list간 task이동
app.post('/api/Renewal', function (req, res) {
	db.collection('list').updateOne({ _id: req.body.firstBox }, {
		$set: {
			items: req.body.firstContent
		}
	},
		function (error, result) {
			db.collection('list').updateOne({ _id: req.body.afterBox }, {
				$set: {
					items: req.body.afterContent
				}
			})
		})
});

//같은 list내 task이동
app.post('/api/Renewal2', function (req, res){
	db.collection('list').updateOne({_id:req.body.firstBox},{
		$set: {
			items: req.body.firstContent
		}
	})
});

//task revise
app.put('/api/TaskRevise', function (req, res) {
	db.collection('list').updateOne({ _id: req.body._id, "items.items_id": req.body.items_id }, {
		$set: {
			"items.$.content": req.body.newTask,
			"items.$.userName": req.body.userName,
			"items.$.profile": req.body.profile,
		}
	});
	res.status(200).send({ message: '수정성공' })
});


//task Detail
app.get('/api/GetDetailText/:id',function(req,res){
	var taskId = parseInt(req.params.id)
	db.collection('task').findOne( { items_id : taskId } ,function(error, result){
		res.json(result)
	} )
})

app.post('/Description',function(req,res){
	db.collection('task').updateOne({items_id:req.body.items_id},{
		$set:{Description:req.body.Description}
	})
	res.redirect('/home')
})
app.get('/GetDescription/:id',function(req,res){
	var taskId = parseInt(req.params.id)
	db.collection('task').findOne( { items_id : taskId },function(error, result){
		res.json(result)
	})
})


app.post('/Comment',function(req,res){
	db.collection('count').findOne({name:'댓글갯수'},function(error, result){
		var TotalPost = result.totalPost;
		db.collection('task').updateOne({items_id:req.body.items_id}, {
			$push:{Comment:{Comment:req.body.Comment,Producer:req.body.Producer,userID:req.body.userID,CommentID:TotalPost + 1,modal:false,ProfileUrl:req.body.ProfileUrl}}
		}, function (error, result) {
			db.collection('count').updateOne({ name: '댓글갯수' }, { $inc: { totalPost: 1 } }, function (error, result) {
				if (error) { return console.log(error) }	
			})
			res.redirect('/home')
		})
	})
});
//
app.get('/GetComment/:id',function(req,res){
	var taskId = parseInt(req.params.id)
	db.collection('task').findOne( { items_id : taskId },function(error, result){
		res.json(result)
	})
})
//
app.put('/Comment/Edit',function(req,res){
	console.log(req.body.data.Comment)
	db.collection('task').updateOne({items_id:req.body.data.items_id,"Comment.CommentID":req.body.data.CommentID},{
		$set:{
				"Comment.$.Comment":req.body.data.Comment,
				"Comment.$.Producer":req.body.data.Producer,
				"Comment.$.userID":req.body.data.userID,
				"Comment.$.CommentID":req.body.data.CommentID,
				"Comment.$.modal":false,
				"Comment.$.ProfileUrl":req.body.data.ProfileUrl
		}
	})
	res.status(200).send({ message: 'Edit Success' })

})
//
app.put('/Comment/Delete',function(req,res){
	db.collection('task').updateOne({items_id:req.body.data.items_id},{
		$pull:{ 
			Comment:{CommentID:req.body.data.CommentID}
		}
	})
	res.status(200).send({ message: 'Success' })
})

//테스크 Description 삭제
app.delete('/Description/Delete',function(req,res){
	db.collection('task').updateOne({items_id:req.body.items_id}, {
		$set :{
			Description : []
		}
	})
	res.status(200).send({ message: '성공햇습니다' })
})




//task delete
app.delete('/api/TaskDelete', function (req, res) {
	db.collection('list').updateOne({ _id: parseInt(req.body._id) }, {
		$pull: {
			items: { items_id: req.body.items_id }
		}
	})
	res.status(200).send({ message: '성공햇습니다' })
});


const CryptoJS = require("crypto-js")

//salt값 생성
const salt = CryptoJS.lib.WordArray.random(128 / 8);
const saltPassWord=salt.toString(CryptoJS.enc.Base64)

//Sign Up // 회원가입
app.post('/api/SignUp',function(req,res){
	
	// (입력한비번+salt) => hash
	const hash = CryptoJS.SHA256(req.body.비번+saltPassWord);
  	const hashPassWord =hash.toString(CryptoJS.enc.Base64)

	db.collection('login').insertOne({
		id:req.body.아이디,
		pw:hashPassWord,
		salt:saltPassWord,
		name:req.body.이름,
		ProfileUrl:'https://dowan-portfolio-1.du.r.appspot.com/assets/user.png' 
	},function(){
		console.log('저장완료')
		res.redirect('/')
	})
});

// id 중복체크 
app.get('/api/userIdCheck',function(req,res){
	db.collection('login').find().toArray(function (error, result) {
		res.json(result)
	});
});


// 이미지업로드

let multer = require('multer');
var storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, './trello/src/assets')
  },
  filename : function(req, file, cb){
    cb(null, file.originalname )
  }
});

var upload = multer({storage : storage});

//
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('PNG, JPG만 업로드하세요'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
});


app.post('/api/upload', upload.single('Profile'), function(req, res){
	console.log(req.body)
	db.collection('login').updateOne({id:req.body.UserId},{
		$set:{
			ProfileUrl:'https://dowan-portfolio-1.du.r.appspot.com/assets/'+req.body.userProfile
			// ProfileUrl:'http://localhost:8080/assets/'+req.body.userProfile
		}
	});
	res.redirect('/home');
}); 

// 이미지 보내는법
app.get('/assets/:imageName', function(req, res){
	res.sendFile( __dirname + '/trello/src/assets/' + req.params.imageName )
})

//Seccsion login
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : 'SecretCode', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

//login
app.post('/api/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			//로그인 실패시 보낼 결과.data
			return res.send({BooleanBox:false,info:info})
		}
		req.login(user, function (err) {
			if (err) {
				return next(err);
			}else{
				res.send({BooleanBox:true,userBox:user});
			}
		});
	})(req, res, next);
});


//local 인증
passport.use(new LocalStrategy({
	usernameField: 'id',
	passwordField: 'pw',
	session: true,
	passReqToCallback: false,
  }, function (inputId, inputPw, done) {
	db.collection('login').findOne({ id: inputId }, function (error, result) {
	  //id 확인
	  if (error) return done(error)
	  if (!result) return done(null, false, { message: '존재하지않는 아이디 입니다.' })
	  //pw 확인
	  const hash = CryptoJS.SHA256(inputPw+result.salt);
  	  const hashPassWord =hash.toString(CryptoJS.enc.Base64)
	  if (hashPassWord == result.pw) {
		return done(null, result)
	  }else {
		return done(null, false, { message: '비밀번호가 다릅니다.' })
	  }
	});
  }));

  //
  passport.serializeUser(function (user, done) {
	done(null, user.id)
  });
  
  passport.deserializeUser(function (아이디, done) {
	done(null, {})
  });


//logout
app.post('/api/LogOut',function(req,res){
	req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
})


//chat
io.on('connection', function(socket){
	io.emit('comment', '채팅에 입장하셧습니다.');
	socket.on('user-send', function (data) {
		 //모든사람에게 데이터 전송
		io.emit('broadcast', data) 
	});
});

//
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/trello/build/index.html'))
});
