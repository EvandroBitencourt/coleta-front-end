import BaseApi from "./BaseApi";

class RoutesApi extends BaseApi{

    list(){
        return this.get('/routes')
    }

    create(data){
      return this.post('/routes', data)
    }

    update(id, data){
       return this.put(`/routes/${id}`,data)
    }
    
    destroy(id){
        return this.delete(`/routes/${id}`)
     }
}

export default RoutesApi