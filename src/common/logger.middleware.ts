export class LoggerMiddleware {
  use(req, res, next) {
    next();
  }
}
