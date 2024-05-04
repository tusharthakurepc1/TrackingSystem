const express = require('express')
const OrganizationUserModel = require('../models/OrganizationUserModel')
const OrganizationModel = require("../models/OrganizationModel")
const OrganizationUser = require('../models/OrganizationUserModel')

const DeleteOrganizationUser = async (req, res) => {
    let {_id, email, organizationValue} = req.body

    if(
        [_id, email, organizationValue].some((el)=>{
            return !el || el === ""
        })
    ){
        return res.status(400).json({status: false, msg: "Organization not defined"})
    }
    let updateUser
    const getUser = await OrganizationUserModel.findOne({_id})

    if(getUser && getUser.orgination_list && getUser.orgination_list.length <= 1){
        updateUser = await OrganizationUserModel.deleteOne({email})
    }
    else{
        updateUser = await OrganizationUserModel.updateOne(
            {_id},
            {
                $pull: {
                    orgination_list: organizationValue,
                }
            }
        )

    }

    

    const updateOrg = await OrganizationModel.updateOne(
        { name: organizationValue },
        {
            $pull:{
                userEmail: email,
            }
        }
    )

    return res.status(200).json({
        user: updateUser,
        org: updateOrg
    })
}

module.exports = DeleteOrganizationUser
