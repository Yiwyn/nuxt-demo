// server/plugins/api.ts
export default defineNitroPlugin((nitroApp) => {
    let users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
    ];

    // 获取用户列表
    nitroApp.router.get("/api/users", () => {
        return users;
    });

    // 创建用户
    nitroApp.router.post("/api/users", async (event) => {
        const body = await readBody(event);
        const newUser = { id: users.length + 1, name: body.name };
        users.push(newUser);
        return { message: "用户创建成功", user: newUser };
    });

    // 删除用户
    nitroApp.router.delete("/api/users/:id", (event) => {
        const id = Number(event.context.params?.id);
        const userIndex = users.findIndex((u) => u.id === id);
        if (userIndex === -1) {
            throw createError({ statusCode: 404, message: "用户未找到" });
        }
        const deletedUser = users.splice(userIndex, 1)[0];
        return { message: "用户删除成功", user: deletedUser };
    });
});