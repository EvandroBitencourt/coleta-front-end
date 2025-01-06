import BaseApi from "./BaseApi";

class collectionRecordsApi extends BaseApi{

    create(data){
      return this.post('/collection-records', data)
    }
    
    destroy(id){
        return this.delete(`/collection-records/${id}`)
     }
}

export default collectionRecordsApi