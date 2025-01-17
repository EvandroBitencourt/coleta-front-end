import BaseApi from "./BaseApi";

class ManageCollectionsApi extends BaseApi {
  list() {
    return this.get("/manage-collections");
  }

  create(data) {
    return this.post("/manage-collections", data);
  }

  update(id, data) {
    return this.put(`/manage-collections/${id}`, data);
  }

  destroy(id) {
    return this.delete(`/manage-collections/${id}`);
  }
}

export default ManageCollectionsApi;
