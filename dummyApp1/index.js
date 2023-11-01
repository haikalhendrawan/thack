import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";


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

app.use(express.static('public'));
app.use(express.json());

async function loggedSSO (req, res, next) {
    const accessToken = req.query.accessToken;

    if (userData) {
        next();
    } else if(accessToken){
        const decode = jwt.decode(JSON.parse(accessToken));
        userData = decode;
        res.setHeader('Set-Cookie', `jwtApp2=${accessToken}`);
        next();
    } else{
        res.redirect(`http://localhost:3030/login?origin=http://localhost:3004`)
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



// -------------------------------- endpoint -----



app.get('/', loggedSSO, (req, res) => {
    res.render('homePage');
})

app.get('/home', loggedSSO, allowedRole(3, 2), (req, res) => {
    res.render('homePage');
})

app.get('/admin',loggedSSO, allowedRole(4, 2), (req, res) => {
    res.render('adminPage');
})

app.get('/superadmin', loggedSSO, allowedRole(5, 2), (req, res) => {
    res.render('superAdminPage');
})

app.get('/403', (req, res) => {
    res.render('403');
})

app.get('/logout',loggedSSO, (req, res) => {
    userData = null;
    res.clearCookie('jwtApp2');
    res.redirect('http://localhost:3030/login?origin=http://localhost:3002')
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

app.listen(3004, () => {
    console.log('aplikasi run di port 3004')
});