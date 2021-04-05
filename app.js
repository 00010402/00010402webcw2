const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()
const fs = require('fs')

app.set('view engine', 'pug')

const DB = path.resolve(__dirname, './data/employees.json')
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, idgenerator() + file.originalname);
    }
});
const upload = multer({ storage: storageConfig })

// dev process
app.use(express.json())
app.use('/static/styles', express.static('public/styles'))
app.use('/static/images', express.static('public/images'))
app.use(express.urlencoded({ extended: false }))


// HOME PAGE DEPENDED CODE
app.get('/', (req, res) => {
    res.render('index')
})

// CONTACT PAGE DEPENDED CODE
app.get('/contact', (req, res) => {
    res.render('contact')
})

// ADDEMPLOYEE DEPENDED CODE
app.get('/addemployee', (req, res) => {
    res.render('addemployee')
})
app.post('/addemployee', upload.single('file'), (req, res) => {
    // creating new employee
    if (req.body) {

        fs.readFile(DB, (err, data) => {
            if (err) throw err

            const employees = JSON.parse(data)

            employees.push({
                id: idgenerator(),
                em_name: req.body.name,
                em_surname: req.body.surname,
                em_address: req.body.address,
                em_dob: req.body.dob,
                em_briefstory: req.body.briefdesc,
                em_job: req.body.job,
                em_img: req.file.filename
            })

            fs.writeFile(DB, JSON.stringify(employees), (err) => {
                if (err) throw err


                res.render('addemployee', { success: true })
            })
        })
    }
})

// ALLEMPLOYEES DEPENDED CODE
app.get('/allemployees', (req, res) => {

    fs.readFile('./data/employees.json', (err, data) => {
        if (err) throw err

        const employees = JSON.parse(data)
        res.render('allemployees', { employees: employees })

    })
})

// EMPLOYEE DELETE DEPENDED CODE
const DbContext = require("./services/db")
const dbc = new DbContext()
dbc.useCollection("employees.json")

app.get('/:id/delete', (req, res) => {
    dbc.deleteOne(
        req.params.id,
        () => res.redirect('/')),
        () => res.sendStatus(500)
})


// SINGLE EMPLYEE DEPENDED CODE
app.get('/allemployees/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/employees.json', (err, data) => {
        if (err) throw err

        const employees = JSON.parse(data)
        const employee = employees.filter(employee => employee.id == id)[0]

        res.render('employeedetail', { employee: employee })
    })
})

// REST API DEPENDED CODE
app.get('/api/v1/employees', (req, res) => {
    fs.readFile('./data/employees.json', (err, data) => {
        if (err) throw err
        const employees = JSON.parse(data)
        res.json(employees)
    })
})

// LISTENING THE PROJECT CODE
app.listen(5050, err => {
    if (err) throw err
    console.log('App is running on port http://localhost:5050/')
})

function idgenerator() {
    return '_' + Math.random().toString(36).substr(2, 9);
}