module.exports=(app)=>{
    const doctorController=require('../controllers/doctor')
    app.get('/doctor/signin',doctorController.signin)
    app.post('/doctor/signin',doctorController.login)
    app.get('/doctor/home',doctorController.home)
    app.get('/doctor/myappointments',doctorController.myappointments)
    app.get('/doctor/updateschedule',doctorController.updateschedule)
    app.get('/doctor/changepassword',doctorController.changepassword)
    
}