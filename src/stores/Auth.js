import { defineStore } from "pinia";
import { BASE_URL } from "@/services/api/config";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({

        // carregamos o token do localStorage
        // que foi definido no /login ou /register
        token: localStorage.getItem('access_token'),

        //Inicializamos os dados do usuário como null
        user: null,

        //indica se esta carregando os dados do usuário
        loadingUser: false
    }),

    //os getter são metodos que permitem acessar o estado (state) de forma reativa
    getters: {
       getUser: (state) => state.user,
       getToken: (state) => state.token,

       isSuperadmin: (state) => state.user && state.user.roles.includes('superadmin')
    },

     //são os metodos que permitem alterar os estados(state) do store
    actions: {
        setToken(token){

            //define o token no state
           this.token =  token

           //definimos no localstorage o token informado
           localStorage.setItem('access_token',token)

           //chama a função para carregar os dados do usuário
           this.fetchUser()
        },

        async fetchUser(router){

           if(! this.token){
             return
           }

           //estamos carregando o usuário
           this.loadingUser = true

           try {

            const response = await axios.get(`${BASE_URL}/user`, {
                headers: {
                    //Enviamos o authorization header no cabeçalho da requisição
                    Authorization: `Bearer ${this.token}`
                }  
            })

            //define os dados do usuário
            this.user = response.data
            
           } catch (error) {

              console.error('Erro ao obter os dados do usuário:', error)

              this.clearToken()

              if(error.response && error.response.status === 401){
                router.push('/login')
              }
            
           } finally {
             this.loadingUser = false
           }
        },

        clearToken(){
           localStorage.removeItem('access_token')
           this.token = null
        },

        logout(){
           this.clearToken()
           this.user = null
        }
    }
})