export class LoggerMiddleware {
  use(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
  }
}
