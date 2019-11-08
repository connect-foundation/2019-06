const isAdmin = (req, res, next) => next();
const isSuperAdmin = (req, res, next) => next();
const isAuth = (req, res, next) => next();

export { isAdmin, isSuperAdmin, isAuth };
