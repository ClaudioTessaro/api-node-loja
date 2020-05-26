import SessionService from "../service/SessionService";

class SessionController {
  store(req, res) {
    SessionService.store(req, res);
  }
}

export default new SessionController();
