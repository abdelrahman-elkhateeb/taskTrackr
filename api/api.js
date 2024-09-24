const apis = {
    getAllTasks: ["/api/Tasks", "GET"],
    createTask: ["/api/Tasks", "POST"],
    deleteTask: (id) => ["/api/Tasks/" + id, "DELETE"],
    updateTask: (id) => ["/api/Tasks/" + id, "PUT"],
    getUserTasks: (userId) => ["/api/Users/" + userId + "/tasks", "GET"],
    login: "/api/Users/login",
    user: "/api/Users/register"
}