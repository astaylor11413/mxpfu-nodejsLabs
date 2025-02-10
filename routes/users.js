const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
    res.send(JSON.stringify({users},null,4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  let filteredUsers = users.filter((user)=>user.email===email);
  if(filteredUsers.length>0){
    res.send(filteredUsers[0]);
  }else{
    res.send("User could not be found");
  }
});


// POST request: Create a new user
router.post("/",(req,res)=>{
    users.push({
        "firstName":req.query.firstName,
        "lastName":req.query.lastName,
        "email":req.query.email,
        "DOB":req.query.DOB
    });
    res.send(users[(users.length)-1].firstName+" has been added!")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    //retrieve user that needs to be updated
    let filteredUsers = users.filter((user)=>user.email===email);

    if(filteredUsers.length>0){
        let filteredUser = filteredUsers[0];
        //update user info depending on query request
        if(req.query.firstName){
            filteredUser.firstName = req.query.firstName;
        }

        if(req.query.lastName){
            filteredUser.lastName = req.query.lastName;
        }

        if(req.query.email){
            filteredUser.email = req.query.email;
        }

        if(req.query.DOB){
            filteredUser.email = req.query.DOB;
        }
        //remove old user object and add updated user object
        users = users.filter((user)=>user.email!==email);
        users.push(filteredUser);
        res.send(filteredUser.firstName+"'s profile has been updated");
    }else{
        res.send("User could not be found");
      }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {

    users = users((user)=>user.email!==req.params.email);
    res.send("The user with the following id has been deleted: "+ req.params.email);
});

//GET request: Retrieve all users with a particular last name
router.get("/lastName/:lastName",(req,res)=>{
    const lastName = req.params.lastName;
    let filteredUsers = users.filter((user)=>user.lastName===lastName);
    if(filteredUsers.length>0){
        res.send(filteredUsers);
    }else{
        res.send("No users currently have that last name");
    }
});
function getDate(strDate){
    //DOB:"21-03-1989"
    let dateArray = strDate.split('-');
    return new Date(dateArray[2]+"/"+dateArray[1]+"/"+dateArray[0]);
}

//GET request: Retrieve users as a list sorted by date of birth
router.get("/sort/DOB",(req,res)=>{
    let sortedUsers = users.sort((userA,userB)=>{
        let date1 = getDate(userA.DOB);
        let date2 = getDate(userB.DOB);
        return date1-date2;
    });
    res.send(sortedUsers);
});

module.exports=router;
