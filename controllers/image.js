const Clarifai =require( 'clarifai');

const app = new Clarifai.App({
 apiKey: '77f441700ee7479fb5f1bf0cad0caf3c'
});

const handleApiCall =(req,res) =>{
app.models.predict(
  // Clarifai.FACE_DETECT_MODEL
  'c0c0ac362b03416da06ab3fa36fb58e3',
    // THE JPG
    req.body.input)
    .then(data => res.json(data))
    .catch(err =>res.status(400).json('unable to work with API'))
}

const handleImage=(req,res,db)=>{
const {id} =req.body

db('users').where('id', '=',id)
  .increment('entries',1)
  .returning('entries')
  .then(entries => {
  	res.json(entries)
  	// console.log(entries)
  })
  .catch(err=> res.status(400).json('unable to get count'))
 	
}
module.exports={
	handleImage,
	handleApiCall


}