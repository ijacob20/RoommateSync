const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    description: {type: String, required: [true, 'desc is required']}
}
);

module.exports = mongoose.model('Main', mainSchema);

/* const Main = mongoose.model('Main', mainSchema);
let main = new Main({
    title: 'test',
    description: 'test1'
});

main.validate()
.then(()=>{
    console.log('validated successfully');
})
.catch(err=>console.log(err.message));

console.log(main); */