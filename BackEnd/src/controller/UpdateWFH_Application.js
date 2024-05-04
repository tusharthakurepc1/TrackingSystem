const WFHApplicationModel = require("../models/WFHApplicationModel")

const UpdateWFH_Application = async (req, res) => {
    let {_id, statusValue} = req.body;

    if(!_id || _id === "" || !statusValue || statusValue === ""){
        return res.status(400).json({status: false, msg: "Fill the detail"})
    }

    const response = await WFHApplicationModel.updateOne(
        {_id},
        {
            $set: {
                status: statusValue,
                approvedDate: Date.now()
            }
        }
    )

    return res.status(200).json({status: true, response})
}


module.exports = UpdateWFH_Application
