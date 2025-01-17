import BaseApi from "./BaseApi";

class UserCollectionsRequestsApi extends BaseApi {
  list() {
    return this.get("/collection-requests");
  }

  create(data) {
    return this.post("/collection-requests", data);
  }

  update(id, data) {
    return this.put(`/collection-requests/${id}`, data);
  }

  destroy(id) {
    return this.delete(`/collection-requests/${id}`);
  }
}

export default UserCollectionsRequestsApi;
