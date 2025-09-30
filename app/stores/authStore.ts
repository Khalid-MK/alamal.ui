// import { defineStore } from 'pinia'

// interface User {
//   id: string
//   firstName: string
//   lastName: string
//   email: string
//   role: string
// }

// interface AuthState {
//   user: User | null
//   loading: boolean
//   isAuthenticated: boolean
// }

// export const useAuthStore = defineStore('auth', {
//   state: (): AuthState => ({
//     user: null,
//     loading: false,
//     isAuthenticated: false
//   }),

//   getters: {
//     getUser: (state) => state.user,
//     getLoading: (state) => state.loading,
//     getIsAuthenticated: (state) => state.isAuthenticated
//   },

//   actions: {
//     async verifyUser() {
//       this.loading = true
//       try {
//         // Check if user is logged in (e.g., check localStorage, cookies, or API)
//         const token = localStorage.getItem('authToken')
//         if (token) {
//           // Here you would typically make an API call to verify the token
//           // For now, we'll simulate a user
//           this.user = {
//             id: '1',
//             firstName: 'John',
//             lastName: 'Doe',
//             email: 'john@example.com',
//             role: 'student'
//           }
//           this.isAuthenticated = true
//         } else {
//           this.user = null
//           this.isAuthenticated = false
//         }
//       } catch (error) {
//         console.error('Error verifying user:', error)
//         this.user = null
//         this.isAuthenticated = false
//       } finally {
//         this.loading = false
//       }
//     },

//     async login(email: string, password: string) {
//       this.loading = true
//       try {
//         // Here you would typically make an API call to login
//         // For now, we'll simulate a successful login
//         const user = {
//           id: '1',
//           firstName: 'John',
//           lastName: 'Doe',
//           email: email,
//           role: 'student'
//         }
        
//         this.user = user
//         this.isAuthenticated = true
//         localStorage.setItem('authToken', 'dummy-token')
        
//         return { success: true, user }
//       } catch (error) {
//         console.error('Login error:', error)
//         return { success: false, error: 'Login failed' }
//       } finally {
//         this.loading = false
//       }
//     },

//     async logout() {
//       this.loading = true
//       try {
//         // Clear user data and token
//         this.user = null
//         this.isAuthenticated = false
//         localStorage.removeItem('authToken')
//       } catch (error) {
//         console.error('Logout error:', error)
//       } finally {
//         this.loading = false
//       }
//     },

//     async register(userData: Partial<User>) {
//       this.loading = true
//       try {
//         // Here you would typically make an API call to register
//         // For now, we'll simulate a successful registration
//         const user = {
//           id: '1',
//           firstName: userData.firstName || '',
//           lastName: userData.lastName || '',
//           email: userData.email || '',
//           role: 'student'
//         }
        
//         this.user = user
//         this.isAuthenticated = true
//         localStorage.setItem('authToken', 'dummy-token')
        
//         return { success: true, user }
//       } catch (error) {
//         console.error('Registration error:', error)
//         return { success: false, error: 'Registration failed' }
//       } finally {
//         this.loading = false
//       }
//     }
//   }
// })
