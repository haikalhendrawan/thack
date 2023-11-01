import express from "express";
import cors from "cors";


// -------------------------------

const app = express();


// --------------------------------

app.set('view engine', 'ejs');

// ------------------------------- Middleware ------

app.use(express.static('public'));
app.use(express.json());


// -------------------------------- endpoint -----


app.get('/', (req, res) => {
    res.render('homePage');
})

app.get('/home', (req, res) => {
    res.render('homePage');
})

app.get('/admin', (req, res) => {
    res.render('adminPage');
})

app.get('/superadmin', (req, res) => {
    res.render('superAdminPage');
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

app.listen(3004, () => {
    console.log('aplikasi run di port 3004')
});