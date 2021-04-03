const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine', 'pug')

const DB = './data/employees.json'

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
app.post('/addemployee', (req, res) => {

    const name = req.body.name
    const surname = req.body.surname
    const address = req.body.address
    const dob = req.body.dob
    const briefdesc = req.body.briefdesc
    const job = req.body.job
    // const image = req.body.image.filename

    fs.readFile('./data/employees.json', (err, data) => {
        if (err) throw err

        const employees = JSON.parse(data)

        employees.push({
            id: idgenerator(),
            em_name: name,
            em_surname: surname,
            em_address: address,
            em_dob: dob,
            em_briefstory: briefdesc,
            em_job: job,
            // em_img: image
        })

        fs.writeFile('./data/employees.json', JSON.stringify(employees), err => {
            if (err) throw err


            res.render('addemployee', { success: true })
        })
    })
})


const employees = ['em1', 'em2']

app.get('/allemployees', (req, res) => {
    res.render('allemployees', { employee: employees })
})




app.get('/contact', (req, res) => {
    res.render('contact')
})




app.get('/employeedetail', (req, res) => {
    res.render('employeedetail')
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