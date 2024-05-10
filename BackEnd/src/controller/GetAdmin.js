const OrganizationModel = require("../models/OrganizationModel")
const WFHApplicationModel = require('../models/WFHApplicationModel')

const GetAdmin = async (req, res) => {
    let {orgList, email} = req.body;

    if(
        [orgList, email].some((el)=>{
            return !el || el === ""
        })
    )
    {
        return res.status(400).json({status: false, msg: "Fill the Details"})
    }

    let response = await OrganizationModel.find({})
    let result = []
    let orgResult = []
    
    response.forEach((el)=>{
        if(el.admin === email && orgList.find((comp)=> comp === el.name)){
            result.push(el)
            orgResult.push(el.name)
        }
    })

    let application_res = await WFHApplicationModel.find({
        orgName: {
            $in: orgResult
        }
    })
        
    
    return res.status(200).json({
        status: true,
        data: result,
        applications : application_res
    })  
}

module.exports = GetAdmin