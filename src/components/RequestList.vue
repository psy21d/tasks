<template>
  <div class="page-request-list">
    <div class="request-list-header">
      <button  class="request-list-header__button" @click="showModalToAddTicket">
        Добавить обращение
      </button>
    </div>
    <div class="request-list-item" v-for="item in tickets" :key="item.ticket_number">
        <div class="request-list-item__item-element request-list-item__item-number">#{{ item.ticket_number }}</div>
        <div class="request-list-item__item-user request-list-item__item-element">
          <img class="request-list-item__item-avatar-img" :src="item.user.avatar" />
          <div>{{ item.user.name }}</div>
        </div>
        <div class="request-list-item__item-element request-list-item__item-message">
          <div class="request-list-item__item-subject">Тип обращения: <span class="colored">{{ item.subject }}</span></div>
          <div class="request-list-item__item-body_subject">{{ item.body_subject }}</div>
        </div>
        <div class="request-list-item__item-element request-list-item__item-status">
          <div class="badge" :class="{ [`badge-${item.status}`]: true }">
          </div>
          {{ status[item.status] }}
        </div>
        <div class="request-list-item__item-element request-list-item__item-priority">! &nbsp; {{ priority[item.priority] }}</div>
        <div class="request-list-item__item-element request-list-item__item-date">{{ dayjs(item.date).format("DD.MM.YYYY HH:mm") }}</div>
      </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { status, priority } from '@/config.js'
import ModalNewRequest from '@/components/ModalNewRequest.vue'
import dayjs from 'dayjs'

export default {
  name: 'RequestList',
  components: { 
    ModalNewRequest
  },
  data() {
    return {
      status,
      priority,
      dayjs,
      showModal: false
    }
  },
  computed: {
    tickets() {
      return this.$store.state.tickets
    }
  },
  methods: {
    showModalToAddTicket() {
      this.$store.commit('toggleModal');
      let this_ = this;
      this.$vfm.show({
        component: ModalNewRequest,
        on: {
          // event by v-modal
          confirm() {
            this_.$vfm.hide('newTicket');
          },
          cancel() {
            this_.$vfm.hide('newTicket');
          },
          // event by vue-final-modal
          'click-outside'() {
            this.close();
          },
          'before-open'() {
          },
          opened() {
          },
          'before-close'() {
          },
          closed() {
          }
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
@import '@/variables.scss';
.colored {
  color: #0088f0;
}
.badge {
  width: 20px;
  height:20px;
  border-radius: 10px;
  &-0 {
    background-color: $color-status-0;
  }
  &-1 {
    background-color: $color-status-1;
  }
  &-2 {
    background-color: $color-status-2;
  }
  &-3 {
    background-color: $color-status-3;
  }
}
</style>

<style lang="scss">
@import '@/variables.scss';
.page-request-list {
  display: flex;
  flex-direction: column;
}
.request-list-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 40px;
  padding: 5px;
  background-color: #fff;
  border-radius: 3px;
  &__button {
    margin-right: 40px;
  }
}
.request-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  padding: 5px;
  background-color: #fff;
  border-radius: 3px;
  margin-top: 5px;
  font-size: 12px;
  flex-wrap: wrap;
  &__item-element {
    margin-left: 5px;
    margin-right:15px;
    min-height: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 30px;
  }
  &__item-status {
    width: 125px;
    display: flex;
    flex-direction: row;
    align-items: center;
    & .badge {
      margin-right: 5px;
    }
  }
  &__item-number {
    min-height: 20px;
    background-color: #f67a6e;
    border-radius: 3px;
    color: #fff;
    padding-left: 3px;
    padding-right: 3px;
    line-height: 20px;
  }
  &__item-date {
    margin-right: 40px;
  }
  &__item-avatar-img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 10px;
  }
  &__item-user {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
  }
  &__item-message {
    width: 35%;
    max-width: 35%;
    background-color: #f0f0f0;
    border: none;
    border-radius: 3px;
    border-left-color: #cccccc;
    border-left-width: 3px;
    border-left-style: solid;
    padding-left: 6px;
    padding-right: 6px;
  }
  &__item-priority {
    width: 90px;
  }
}
.page-request-list {
  background-color: #f0f0f0;
  padding: 20px;
}
</style>
