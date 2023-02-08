// import express

// const {app} = require("express");

const express=require ('express')

//import data service
const dataService =require('./services/data.service')

//import cors
const cors =require('cors')





// // 2  creaating a application for express

const app=express()

//to parse JSON from request body
app.use(express.json())//type conversion


//give command to share data via cors 
app.use(cors({
   origin:['http://localhost:4200',  'http://192.168.1.204:8080']
}))

// // 3 create port number
app.listen(3000,()=>{
   console.log('listening on port 3000');
})
const jwt=require('jsonwebtoken')
//applicatioin specific middleware

//  const appMiddleware=(req,res,next)=>{
//     console.log('application specific middleware');
//     next();
//  }
//  app.use(appMiddleware)

//Router specific middleware
const jwtMiddleware=(req,res,next)=>{
   console.log('Router specic middleware');
   const token=req.headers['x-access-token'];
   //verify token -verify()
   const data=jwt.verify(token,'superkey2022')
   console.log(data);
       next();
}
// app.use(jwtMiddleware)



// // 4 resolovinng http request
// //get http request

// app.get('/',(req,res)=>{
//     res.send('get request')
// })

// app.post('/',(req,res)=>{
//     res.send('post request')
// })
// app.put('/',(req,res)=>{
//     res.send('put request')
// })
// app.delete('/',(req,res)=>{
//     res.send('delete request')
// })
// app.patch('/',(req,res)=>{
//     res.send('patch request')
// })




//API call
//registration request
app.post('/register',(req,res)=>{
   console.log(req.body);
  dataService.register(req.body.acno,req.body.username,req.body.password)
  .then(result=>{
   res.status(result.statusCode).json(result)
  })//access
 

})


//login request

app.post('/login',(req,res)=>{
   console.log(req.body);
   dataService.login(req.body.acno,req.body.password)
   .then(result=>{
       res.status(result.statusCode).json(result)
   })
  
   
})
//deposit request
app.post('/deposit',jwtMiddleware,(req,res)=>{
   console.log(req.body);
   dataService.deposit(req.body.acno,req.body.password,req.body.amount)
   .then(result=>{
       res.status(result.statusCode).json(result)
   })
  
   
})
app.post('/withdraw',jwtMiddleware,(req,res)=>{
   console.log(req.body);
   dataService.withdraw(req.body.acno,req.body.password,req.body.amount)
   .then(result=>{
       res.status(result.statusCode).json(result)
   })
 
   
})
//withdraw request
//transaction request
app.post('/transaction',jwtMiddleware,(req,res)=>{
   console.log(req.body);
   dataService.getTransaction(req.body.acno)
   .then(result=>{
       res.status(result.statusCode).json(result)
   })
   
   
})

//delete request
app.delete('/deleteAcc/:acno',(req,res)=>{
   console.log(req.body);
   dataService. deleteAcc(req.params.acno)
   .then(result=>{
       res.status(result.statusCode).json(result)
   })
   
   
})
