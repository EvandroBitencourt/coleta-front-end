import BaseApi from "./BaseApi";

class CompaniesApi extends BaseApi{

    list(){
        return this.get('/companies')
    }

    create(company){
      return this.post('/companies', company)
    }

    update(id, company){
       return this.put(`/companies/${id}`,company)
    }

    //Método para deletar um registro
    //Importante: deixei como destroy para nao conflitar com delete da classe pai 
    // e dar erro de Maximum call stack size exceeded
    destroy(id){
        return this.delete(`/companies/${id}`)
     }
}

export default CompaniesApi