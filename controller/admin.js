const { book } = require('../models')

const findAllUser = async (req, res) => {
    try {
        const data= await user.findAll()
        const result ={
            status:'ok',
            data:data


        }
    } catch (error) {
        console.log(error, "error find all user")
    }

    const getUserById = async (req, res) => {
        try {
            const id= req.params
            const data = await user.findByPk(id)
    
            if(data === null)
                {
                    return res.status(404).json({
                    status : 'failed',
                   message : 'not found'
                })
            }
            res,json({
                status: 'ok',
                data: data
            })
        } catch (error) {
            console.log(error, "error find all user")
        }
    }
}