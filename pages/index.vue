<template>
  <div>
    <h1>用户列表</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
        <button @click="deleteUser(user.id)">删除</button>
      </li>
    </ul>
    <div>
      <input v-model="newUserName" placeholder="输入用户名" />
      <button @click="createUser">创建用户</button>
    </div>
  </div>
</template>

<script setup>
// 获取用户列表（默认 GET 方法）
const { data: users, refresh } = useFetch("/api/users");

// 创建用户（POST 方法）
const newUserName = ref("");
const createUser = async () => {
  await useFetch("/api/users", {
    method: "POST",
    body: { name: newUserName.value },
  });
  newUserName.value = ""; // 清空输入框
  refresh(); // 刷新用户列表
};

// 删除用户（DELETE 方法）
const deleteUser = async (id) => {
  await useFetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  refresh(); // 刷新用户列表
};
</script>

<style scoped>
h1 {
  color: #333;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
button {
  cursor: pointer;
}
</style>