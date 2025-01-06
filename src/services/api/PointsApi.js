import BaseApi from "./BaseApi";

class PointsApi extends BaseApi{

    list(){
        return this.get('/points')
    }

    create(data){
      return this.post('/points', data)
    }

    update(id, data){
       return this.put(`/points/${id}`,data)
    }
    
    destroy(id){
        return this.delete(`/points/${id}`)
     }
}

export default PointsApi