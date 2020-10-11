import http from "../http-common";

class MedManagementDataService {
  getAll() {
    return http.get("/inventory-management/med-management");
  }

  get(id) {
    return http.get(`/inventory-management/med-management/${id}`);
  }

  create(data) {
    return http.post("/inventory-management/med-management", data);
  }

  update(id, data) {
    return http.put(`/inventory-management/med-management/${id}`, data);
  }

  delete(id) {
    return http.delete(`/inventory-management/med-management/${id}`);
  }

  deleteAll() {
    return http.delete(`/inventory-management/med-management`);
  }

  findByBrandName(brandName) {
    return http.get(`/inventory-management/med-management?brandName=${brandName}`);
  }
}

export default new MedManagementDataService();
