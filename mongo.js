const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://dantonprettibcs_db_user:${password}@ac-byuswfw-shard-00-00.ytvfwlr.mongodb.net:27017,ac-byuswfw-shard-00-01.ytvfwlr.mongodb.net:27017,ac-byuswfw-shard-00-02.ytvfwlr.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-ymrf9m-shard-0&authSource=admin&appName=Saving-data-to-mongo-db`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

// Document databases like Mongo are schemaless, meaning that the database itself does not care 
// about the structure of the data that is stored in the database.

// The idea behind Mongoose is that the data stored in the database 
// is given a schema at the level of the application that defines the shape of the documents stored 
// in any given collection.

// First, we define the schema of a note that is stored in the noteSchema variable. 
// The schema tells Mongoose how the note objects are to be stored in the database.
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// The name of the collection will be the lowercase plural notes, 
// because the Mongoose convention is to automatically name collections as the plural (e.g. notes) 
// when the schema refers to them in the singular (e.g. Note).
const note = new Note({
  content: 'Mongoose makes things easier',
  important: true,
})
/*
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/

/* The objects are retrieved from the database with the find method of the Note model. 
The parameter of the method is an object expressing search conditions. 
Since the parameter is an empty object{}, we get all of the notes stored in the notes collection */

Note.find({}).then(result =>{
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})