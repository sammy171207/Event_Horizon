
const getProfile=async(req,res)=>{
    try {
        console.log('Profile Fetch Successful',req.user)
      res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}

export {getProfile}