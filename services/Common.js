const passport=require('passport');

exports.isAuth=(req, res, done)=>{
    return passport.authenticate('jwt');
  };

  exports.santizeUser=(user)=>{
    return {id:user.id,role:user.role}
  }

  exports.cookieExtracter=function(req){
    var token=null;
    if(req && req.cookies){
      token=req.cookies['jwt'];
    }
    // Temporary token test purpose
    // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTFiNWI2Y2YzZGZiZTkwMzVmODkzOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEyNDM2NjYyfQ.L9vcv0zhPd-XKa0iaeycKvlFV-Y4dXCJZfAaV9faHTk";
    return token;
  }