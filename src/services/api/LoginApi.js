import BaseAuthApi from "./BaseAuthApi";

class LoginApi extends BaseAuthApi{

    create(credentials){
      return this.post('/login', credentials)
    }
}

export default LoginApi