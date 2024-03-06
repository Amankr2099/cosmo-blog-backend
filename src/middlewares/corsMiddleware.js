
const allowedOption = [
    process.env.ORIGIN1,
    process.env.ORIGIN2,
]

const corsOption = {
    origin:(origin,callback) =>{
        if (allowedOption.indexOf(origin) != -1 || !origin) {
            callback(null,true)
        } else {
            callback(null,false)
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOption;