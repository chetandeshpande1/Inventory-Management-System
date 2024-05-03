
export const setLastVisit = (req, res, next) =>{
    // if cookie is set, then add a local variable with last visit time date
    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }

    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 2*24*60*60*1000        // formula to calculate milisecond for 2 days:2*24*60*60*1000
    });
    next();
};