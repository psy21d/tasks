import { createApp } from 'vue'
import { createStore } from 'vuex'
import VueFinalModal from 'vue-final-modal'

import App from './App.vue'

const store = createStore({
    state () {
      return {
        tickets: [],
        ticket_number: 1,
        showModal: false,
      }
    },
    mutations: {
      addTicket (state, payload) {
        state.tickets.push({
          ticket_number: state.ticket_number,
          ...payload,
          date: new Date(),
        })
        state.ticket_number++;
      },
      toggleModal (state) {
        state.showModal = false;
        state.showModal = true;
      }
    }
  })

const app = createApp(App);
app.use(store);
app.mount('#app');

app.use(VueFinalModal())