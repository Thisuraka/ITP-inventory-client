import http from "../http-common";

class DocManagementDataService {
  getAll() {
    return http.get("/inventory-management/doc-management");
  }

  get(id) {
    return http.get(`/inventory-management/doc-management/${id}`);
  }

  create(data) {
    return http.post("/inventory-management/doc-management", data);
  }

  update(id, data) {
    return http.put(`/inventory-management/doc-management/${id}`, data);
  }

  delete(id) {
    return http.delete(`/inventory-management/doc-management/${id}`);
  }

  deleteAll() {
    return http.delete(`/inventory-management/doc-management`);
  }

  findBySupplierName(supplierName) {
    return http.get(`/inventory-management/doc-management?supplierName=${supplierName}`);
  }
}

export default new DocManagementDataService();
