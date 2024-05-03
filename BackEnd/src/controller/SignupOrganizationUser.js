const OrganizationUser = require("../models/OrganizationUserModel")
const Organization = require("../models/OrganizationModel")

const SignupOrganizationUser = async (req, res) =>{
    let {_orginizationName, firstName, lastName, email, password, dob, doj} = req.body;
    
    if(
        [_orginizationName, firstName, email, password, dob, doj].some((el)=>{
            return el === "" || typeof(el) === 'undefined'
        })
    ){
        return res.status(400).json({status: "false", msg: "Fill the details"})
    }

    let orgData = await Organization.findOne({name: _orginizationName})
    if(!orgData){
        return res.status(400).json({status: "false", msg: "Organization not exists"})
    }
    else if(orgData.userEmail.includes(email)){
        return res.status(400).json({status: "true", msg: "Email ID already exists"})
    }
    else{
        const ack = await Organization.updateOne(
            {name: _orginizationName},
            {
                $push:{
                    userEmail: email,
                }
            }
        )
    }
    console.log("User: ",_orginizationName, firstName, lastName, email, password, dob, doj);


    let userData = await OrganizationUser.findOne({email: email})
    if(!userData){
        const new_user = await OrganizationUser.create({
            isAdmin: false,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            dob: dob,
            doj: doj,
            organizationList: []
        })
        new_user.save()

        await OrganizationUser.updateOne(
            {email : email},
            {
                $push: {
                    orgination_list: _orginizationName
                }
            }
        )
        return res.status(200).json({status: "true", msg: "Organization User created sucessfully"})
    }
    else{
        await OrganizationUser.updateOne(
            {email : email},
            {
                $push: {
                    orgination_list: _orginizationName
                }
            }
        )

        return res.status(200).json({status: "true", msg: "Organization User added sucessfully"})
    }
    

}

module.exports = SignupOrganizationUser;