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

app.get('/allemployees', (req, res) => {
    res.render('allemployees')
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

app.listen(8000, err => {
    if (err) throw err

    console.log('App is running on port 8000...')
})


function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
}