const WFHApplicationModel = require('../models/WFHApplicationModel')


const WFHApplication = async (req, res) => {
    let {email} = req.user;
    let {date, orgName} = req.body

    console.log(email, date, orgName);
    if(
        [email, date, orgName].some((el)=> {
            !el || el === ""
        })
    ){
        return res.status(400).json({msg: "Data Insufficient"})
    }

    // console.log(email, date, orgName);
    // const newApplication = await WFHApplicationModel.create({
    //     email,
    //     date,
    //     orgName,
    //     status: 3,
    // })
    // newApplication.save()

    const allApplication = await WFHApplicationModel.find({email})


    return res.status(200).json({msg: "Application Filled"})
}

module.exports = WFHApplication;