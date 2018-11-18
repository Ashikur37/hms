const {doctor,admin} =require('../data/Connect')
exports.signin=(req,res)=>{
    res.render('doctor/signin',{error:'',email:''})
}
exports.login=(req,res)=>{
    doctor.findOne({email:req.body.email,password:req.body.password},(err,Doctor)=>{
        if(Doctor)
        {
                req.session.doctor=Doctor;
                res.redirect('/doctor/home')
        }
        else{
            res.render('doctor/signin',{error:'Invalid email or password',email:req.body.email})
        }
    })
}
exports.home=(req,res)=>{
    
    res.render('doctor/home')
}
exports.myappointments=(req,res)=>{

}
exports.updateschedule=(req,res)=>{

}
exports.changepassword=(req,res)=>{

}