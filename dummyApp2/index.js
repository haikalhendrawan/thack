import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


// -------------------------------

const app = express();
var userData ;
//{"user_id":1,"username":"root","nik":"3174050804990001","name":"Muhammad Haikal Putra H","accessToken":"xx"
//"role":[{"app_id":1,"role_id":2,"app_name":"superapp","role_name":"admin"},{"app_id":2,"role_id":5,"app_name":"dummyappA","role_name":"super admin"},
//{"app_id":3,"role_id":11,"app_name":"dummyappB","role_name":"admin level 5"}],"msg":"Login Sucess"}

// --------------------------------

app.set('view engine', 'ejs');

// ------------------------------- Middleware ------


function loggedSSO (req, res, next) {
    const accessToken = req.query.accessToken;

    if (userData) {
        next();
    } else if(accessToken){
        userData=accessToken;
        next();
    } else{
        res.redirect(`http://localhost:3030/login?origin=http://localhost:3003`)
    }
}

const checkRole = (allowedRole, appId) => {
    const allRole = userData.role;
    const filteredData = allRole.filter(item => item.app_id === allowedRole);
    const hasRole = filteredData.some(item => item.app_id === appId && item.role_id === allowedRole);

    return (req, res, next) => {
        
      hasRole?next():res.redirect('403')
    }
  }

app.use(express.static('public'));
app.use(express.json());


// -------------------------------- endpoint -----





app.get('/', loggedSSO, (req, res) => {
    res.render('adminPage1');
})

app.get('/home:accessToken?', loggedSSO, (req, res) => {
    res.render('homePage');
})

app.get('/admin1', loggedSSO, (req, res) => {
    res.render('adminPage1');
})
app.get('/admin2',loggedSSO, (req, res) => {
    res.render('adminPage2');
})
app.get('/admin3', loggedSSO,(req, res) => {
    res.render('adminPage3');
})
app.get('/admin4',loggedSSO, (req, res) => {
    res.render('adminPage4');
})
app.get('/admin5',loggedSSO, (req, res) => {
    res.render('adminPage5');
})


app.get('/403', (req, res) => {
    res.render('403');
})


// app.post('/login', (req, res) => {
//     const {username, password} = req.body;

//     console.log('Received request:', username, password);

//     if(username && password) {
//         res.redirect('/admin');
//     }else {
//         res.json({msg:'Incorrect Username or password'})
//     }
// })

app.listen(3003, () => {
    console.log('aplikasi run di port 3003')
});