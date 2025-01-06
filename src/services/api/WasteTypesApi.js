import BaseApi from "./BaseApi";

class WasteTypesApi extends BaseApi{

    list(){
        return this.get('/waste-types')
    }

    create(data){
      return this.post('/waste-types', data)
    }

    update(id, data){
       return this.put(`/waste-types/${id}`,data)
    }
    
    destroy(id){
        return this.delete(`/waste-types/${id}`)
     }
}

export default WasteTypesApi