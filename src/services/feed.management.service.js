import http from "../http-common";

class FeedManagementDataService {
  getAll() {
    return http.get("/inventory-management/feed-management");
  }

  get(id) {
    return http.get(`/inventory-management/feed-management/${id}`);
  }

  create(data) {
    return http.post("/inventory-management/feed-management", data);
  }

  update(id, data) {
    return http.put(`/inventory-management/feed-management/${id}`, data);
  }

  delete(id) {
    return http.delete(`/inventory-management/feed-management/${id}`);
  }

  deleteAll() {
    return http.delete(`/inventory-management/feed-management`);
  }

  findBySupplierName(supplierName) {
    return http.get(`/inventory-management/feed-management?supplierName=${supplierName}`);
  }
}

export default new FeedManagementDataService();
