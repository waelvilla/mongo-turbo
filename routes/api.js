// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Profile= require('../models/Profile')
const Team= require('../models/Team')
router.get('/profile', (req,res)=>{
	let filters= req.query
	if(filters.age != null){
		filters= {
			age: {$gte: req.query.age}
		}
	}

	Profile.find(filters)
	.then(profiles => {
		res.json({
			confirmation: 'success',
			data: profiles
		})
	})
	.catch (err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})

router.get('/team', (req,res)=>{

	Team.find()
	.then(teams => {
		res.json({
			confirmation: 'success',
			data: teams
		})
	})
	.catch (err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})

router.get('/profile/:id', (req,res) =>{
	const id= req.params.id

	Profile.findById(id)
	.then(profile =>{
		res.json({
			confirmation: 'success',
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: `Profile ${id} not found`
		})
	})
})
module.exports = router
