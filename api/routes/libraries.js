const express=require('express')
const Route=express.Router()

const {get_libraries,get_library,update_library,delete_library,create_library,search_by_name}=require('../controllers/libraries')
Route.route('/').get(get_libraries)
.post(create_library)
Route.route('/searched_libraries').get(search_by_name)
Route.route('/:id').get(get_library)
.put(update_library)
.delete(delete_library)



module.exports=Route