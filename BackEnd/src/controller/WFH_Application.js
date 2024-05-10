const WFHApplicationModel = require('../models/WFHApplicationModel')


const WFHApplication = async (req, res) => {
    let {email} = req.user;
    let {createdDate, orgName, reason} = req.body

    console.log(email, createdDate, orgName, reason);
    if(
        [email, createdDate, orgName, reason].some((el)=> {
            return !el || el === ""
        })
    ){
        return res.status(400).json({msg: "Data Insufficient"})
    }

    const newApplication = await WFHApplicationModel.create({
        email,
        createdDate,
        orgName,
        status: 3,
        reason,
        approvedDate: new Date(0, 0, 0)
    })
    newApplication.save()


    return res.status(200).json({msg: "Application Filled"})
}

module.exports = WFHApplication;