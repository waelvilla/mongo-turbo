// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Profile= require('../models/Profile')
const Team= require('../models/Team')


////// GET requests
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

router.get('/team/:id', (req,res)=>{
	const id=req.params.id

	Team.findById(id)
	.then(team =>{
		res.json({
			confirmation: 'true',
			data: team
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			data: err.message
		})
	})
})
////// POST requsts
router.post('/profile', (req,res)=>{

	Profile.create(req.body)
	.then(profile =>{
		res.json({
		confirmation: 'sucess',
		data: profile
	})})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			data: err.message
		})
	})
})

router.post('/team', (req,res)=>{
	Team.create(req.body)
	.then(team =>{
		res.json({
			confirmation: 'success',
			data: team
		})
	})
	.catch(err =>{
		res.json({
			confirmation: 'fail',
			data: err.message
		})
	})
})


module.exports = router
