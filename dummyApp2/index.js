import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";


// -------------------------------

const app = express();
var userData ;
// { bentuknya:
//     user_id: 1,
//     username: 'root',
//     nik: '3174050804990001',
//     name: 'Muhammad Haikal Putra H',
//     role: [
//       { app_id: 1, role_id: 2, app_name: 'superapp', role_name: 'admin' },
//       {
//         app_id: 2,
//         role_id: 5,
//         app_name: 'dummyappA',
//         role_name: 'super admin'
//       },
//       {
//         app_id: 3,
//         role_id: 11,
//         app_name: 'dummyappB',
//         role_name: 'admin level 5'
//       }
//     ],
//     iat: 1698854017,
//     exp: 1698855817
//   }

// --------------------------------

app.set('view engine', 'ejs');

// ------------------------------- Middleware ------


async function loggedSSO (req, res, next) {
    const accessToken = req.query.accessToken;

    if (userData) {
        next();
    } else if(accessToken){
        const decode = jwt.decode(JSON.parse(accessToken));
        userData = decode;
        res.setHeader('Set-Cookie', `jwtApp1=${accessToken}`);
        next();
    } else{
        res.redirect(`http://localhost:3030/login?origin=http://localhost:3003`)
    }
}


function allowedRole(roleId, appId) {
    return (req, res, next) => {
        if (userData) {
            const allRole = userData.role;
            const filteredData = allRole.filter(item => item.app_id === appId);
            const hasRole = filteredData.some(item => item.app_id === appId && item.role_id >= roleId);

            if(hasRole){
                next();
            }else{
                res.redirect("/403")
            }
            
        } else {
            console.log('no user Data');
            next();
        }
    };
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

// allowed Role 6, 7, 8, 9, 10, 11 (user, admin1, admin2, ....), app id (3)

app.get('/admin1', loggedSSO, allowedRole(7,3), (req, res) => {
    res.render('adminPage1');
})
app.get('/admin2',loggedSSO, allowedRole(8,3), (req, res) => {
    res.render('adminPage2');
})
app.get('/admin3', loggedSSO, allowedRole(9,3), (req, res) => {
    res.render('adminPage3');
})
app.get('/admin4',loggedSSO, allowedRole(10,3),(req, res) => {
    res.render('adminPage4');
})
app.get('/admin5',loggedSSO, allowedRole(11,3), (req, res) => {
    res.render('adminPage5');
})

app.get('/logout',loggedSSO, (req, res) => {
    userData = null;
    res.clearCookie('jwtApp1');
    res.redirect('http://localhost:3030/login?origin=http://localhost:3003')
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