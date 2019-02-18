const mongoose= require('mongoose')

const Team = new mongoose.Schema({
    teamName: {type: String, default: ''},
    city: {type: String, default: ''},
    league: {type: String, default: ''}
    
})

module.exports=mongoose.model('Team', Team)