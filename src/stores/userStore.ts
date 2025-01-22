import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // data
  const currentUser = ref<{ id: number; username: string; role: string } | null>(null)
  const isLoggedIn = () => !!currentUser.value

  // methods
  const login = async (username: string, password: string) => {
    const response = await fetch('http://localhost:3001/users')
    const users = await response.json()

    const user = users.find(
      (u: { username: string; password: string }) =>
        u.username === username && u.password === password,
    )

    if (user) {
      currentUser.value = { id: user.id, username: user.username, role: user.role }
    } else {
      console.log('error')
    }
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  return {
    currentUser,
    login,
    logout,
    isLoggedIn,
  }
})
