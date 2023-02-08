//import JWT token
const jwt = require('jsonwebtoken')

//import db
const db = require('./db')


//database
userDetails = {
  1000: { acno: 1000, username: 'Adwaith', password: 1000, balance: 1000, transaction: [] },
  1001: { acno: 1001, username: 'Anna', password: 1001, balance: 1000, transaction: [] },
  1002: { acno: 1002, username: 'Arvind', password: 1002, balance: 1000, transaction: [] }
}


const register = (acno, username, password) => {
  return db.User.findOne({ acno })
    .then(user => {

      if (user) {
        return {
          status: false,
          statusCode: 400,
          message: 'user alredy registered'
        }
      }
      else {

        const newUser = new db.User({
          acno: acno,
          username: username,
          password: password,
          balance: 0,
          transaction: []


        })
        newUser.save();//data saved in mongodb

        return {
          status: true,
          statusCode: 200,
          message: 'Register succesfulll'
        }
      }
    })
}




const login = (acno, pswd) => {
  return db.User.findOne({ acno, pswd })
    .then(user => {
      if (user) {
        currentUser = user.username
        currentAcno = acno
        const token = jwt.sign({ currentAcno: acno }, 'superkey2022')
        return {
          status: true,
          statusCode: 200,
          message: ' login succesfull',
          token: token,
          currentUser:currentUser,
          currentAcno:acno

        }
      }


      else {
        return {
          status: false,
          statusCode: 400,
          message: 'Invalid user dateails '
        }
      }
    })
}
const deposit = (acno, pswd, amt) => {

  var amount = parseInt(amt)
  return db.User.findOne({ acno, pswd })//data
    .then(user => {
      if (user) {

        user.balance += amount;
        user.transaction.push({
          Type: 'credit',
          Amount: amount
        })
        user.save();
        return {
          status: true,
          statusCode: 200,
          message: `${amount} is credited and balance : ${user.balance}`

        }
      }
      else {

        return {
          status: false,
          statusCode: 400,
          message: 'invalid user deatils'
        }
      }
    })
}

const withdraw = (acno, pswd, amt) => {

  var amount = parseInt(amt)
  return db.User.findOne({ acno, pswd })
    .then(user => {
      if (user) {




        if (user.balance > amount) {
          user.balance -= amount;
          user.transaction.push({
            Type: 'debit',
            Amount: amount
          }
          )
          user.save()
          return {
            status: true,
            statusCode: 200,
            message: `${amount} is debited and Balance: ${user.balance}`

          }
        }

         else {

          return {
            status: false,
            statusCode: 400,
            message: 'Insufficient balance'
          }


        }
      }
    })
  }
      
      const getTransaction = (acno) => {
return db.User.findOne({acno})
.then(user=>{
  if(user){
    return {
      status: true,
      statusCode: 200,
      transaction: user.transaction

  }
}
else{
  return{
    status:false,
    statusCode:400,
    message:'user not found'
  }
}
       
        })
      }

      //TO delete ran account
     const deleteAcc=(acno)=>{
      return db.User.deleteOne({acno})
      .then(user=>{
        if(user){
          return {
            status: true,
            statusCode: 200,
            message: `Account removed`
  
          }

        }else{
          return {
            status: false,
            statusCode: 400,
            message: `User not found`
  
          }
        }
      })

     }
    




      module.exports = {
        register,
        login,
        deposit,
        withdraw,
        getTransaction,
        deleteAcc
      }