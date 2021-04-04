const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()
const fs = require('fs')

app.set('view engine', 'pug')

// const __dirname = path.resolve()
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
app.use('/static/styles', express.static('public/styles'))
app.use('/static/images', express.static('public/images'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/addemployee', (req, res) => {
    res.render('addemployee')
})
app.post('/addemployee', upload.single('file'), (req, res) => {
    // const image = req.body.image

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

app.get('/allemployees', (req, res) => {

    fs.readFile('./data/employees.json', (err, data) => {
        if (err) throw err

        const employees = JSON.parse(data)
        res.render('allemployees', { employees: employees })

    })
})




app.get('/contact', (req, res) => {
    res.render('contact')
})




app.get('/allemployees/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/employees.json', (err, data) => {
        if (err) throw err

        const employees = JSON.parse(data)
        const employee = employees.filter(employee => employee.id == id)[0]

        res.render('employeedetail', { employee: employee })
    })
})

// app.post('/create', (req, res) => {
//     const title = req.body.title
//     const desc = req.body.desc

//     if (title.trim() !== '' && desc.trim() !== '') {

//         fs.readFile(DB, (err, data) => {
//             if (err) throw err

//             const notes = JSON.parse(data)

//             notes.push({
//                 id: id(),
//                 title: title,
//                 description: desc,
//             })

//             fs.writeFile(DB, JSON.stringify(notes), err => {
//                 if (err) throw err

//                 res.render('create', { success: true })
//             })

//         })

//     } else {
//         res.render('create', { error: true })
//     }
// })


// app.get('/notes', (req, res) => {

//     fs.readFile(DB, (err, data) => {
//         if (err) throw err

//         const notes = JSON.parse(data)

//         res.render('notes', { noteList: notes })
//     })
// })

// app.get('/notes/:id', (req, res) => {

//     const id = req.params.id

//     fs.readFile(DB, (err, data) => {
//         if (err) throw err

//         const notes = JSON.parse(data)

//         const note = notes.filter(note => note.id == id)[0]

//         res.render('detail', { noteDetail: note })


//     })
// })

app.listen(5050, err => {
    if (err) throw err

    console.log('App is running on port 5050...')
})


function idgenerator() {
    return '_' + Math.random().toString(36).substr(2, 9);
}