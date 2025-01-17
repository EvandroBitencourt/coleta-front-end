import BaseAuthApi from "./BaseAuthApi";

class RegisterApi extends BaseAuthApi{

    create(userData){
      return this.post('/register', userData)
    }
}

export default RegisterApi