<template>
  <vue-final-modal
    name="newTicket"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    class="modal-content"
  >
    <span class="modal__title">Новый тикет</span>
    <div class="modal__content">
      <form class="modal-form" @submit="send">
        <div class="modal-form__caption">Имя:</div>
        <span class="modal-form__error" v-if="vv.name.$error">
          {{ vv.name.$errors[0].$message }}
        </span>
        <input type="text" v-model="form.name"/>
        <div class="modal-form__caption">Email:</div>
        <span class="modal-form__error" v-if="vv.email.$error">
          {{ vv.email.$errors[0].$message }}
        </span>
        <input type="text" v-model="form.email"/>
        <div class="modal-form__caption">Сообщение:</div>
        <span class="modal-form__error" v-if="vv.body_subject.$error">
          {{ vv.body_subject.$errors[0].$message }}
        </span>
        <textarea v-model="form.body_subject" placeholder="Опишите суть обращения"></textarea>
        <div class="modal-form__caption">Тип обращения:</div>
        <span class="modal-form__error" v-if="vv.subject.$error">
          {{ vv.subject.$errors[0].$message }}
        </span>
        <select v-model="form.subject">
          <option
            v-for="subject in subjects"
            :value="subject"
            :key="subject"
            :selected="subjects === form.subject"
          >
            {{ subject }}
          </option>
        </select>
        <div class="modal-form__caption">Статус:</div>
        <span class="modal-form__error" v-if="vv.status.$error">
          {{ vv.status.$errors[0].$message }}
        </span>
        <select v-model="form.status">
          <option
            v-for="key in Object.keys(status)"
            :value="key"
            :key="key"
            :selected="key === form.status"
          >
            {{ status[key] }}
          </option>
        </select>
        <div class="modal-form__caption">Приоритет:</div>
        <span class="modal-form__error" v-if="vv.priority.$error">
          {{ vv.priority.$errors[0].$message }}
        </span>
        <select v-model="form.priority">
          <option
            v-for="key in Object.keys(priority)"
            :value="key"
            :key="key"
            :selected="key === form.priority"
          >
            {{ priority[key] }}
          </option>
        </select>
        
      </form>
    </div>
    <div class="modal-form__buttons">
      <button class="button-create" @click="send">Создать</button>
      <button class="button-cancel" @click="close">Отмена</button>
    </div>
  </vue-final-modal>
</template>

<script>
import { reactive, toRef } from "vue";
import { status, priority } from "@/config.js";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

let subjects = [
  'Жалоба на пользователя',
  'Жалоба на приложение',
  'Жалоба на сайт',
  'Оплата',
  'Функционал',
  'Авторизация',
  'Модерация',
  'Другое',
]

export default {
  name: "ModalNewRequest",
  inheritAttrs: false,
  data() {
    return {
      data: {
        user: {
          name: "",
          email: "",
          avatar:
            "https://lh3.googleusercontent.com/ogw/ADGmqu9mwjd_DnKM_J5VCm0fPeUuIA1p-MU6rR7Fi0wV=s192-c-mo",
        },
        body_subject: "",
        subject: "",
        status: 1,
        priority: 1,
      },
      subjects,
      form: reactive({
        name: "",
        email: "",
        body_subject: "",
        subject: "",
        status: 1,
        priority: 1,
      }),
      rules: {
        name: { required },
        email: { required, email },
        body_subject: { required },
        subject: { required },
        status: { required },
        priority: { required },
      },
      vv: null,
      status,
      priority,
    };
  },
  created() {
    this.vv = useVuelidate(this.rules, {
      name: toRef(this.form, "name"),
      email: toRef(this.form, "email"),
      body_subject: toRef(this.form, "body_subject"),
      subject: toRef(this.form, "subject"),
      status: toRef(this.form, "status"),
      priority: toRef(this.form, "priority"),
    });
  },
  methods: {
    send() {
      window.vv = this.vv;
      this.vv.$touch();
      if (this.vv.$invalid) return;
      this.$store.commit("addTicket", {
        user: {
          name: this.form.name,
          email: this.form.email,
          avatar: this.data.user.avatar,
        },
        body_subject: this.form.body_subject,
        subject: this.form.subject,
        status: this.form.status,
        priority: this.form.priority,
      });
      this.$emit("confirm");
    },
    close() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/variables.scss";
button {
  color: white;
  padding: 10px;
  margin-right: 6px;
  border: none;
}
.modal-form {
  display: flex;
  flex-direction: column;
}
input, textarea, select {
  padding: 5px;
  background-color:#d9d9d9;
  width: 300px;
  height: 25px;
  margin:2px;
  border: none;
}
.modal-form__caption {
  margin-top: 10px;
  font-size: 12px;
}
.modal-form__error {
  font-size: 12px;
  color: #ffa0a0;
}
.modal-form__buttons {
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  justify-content: flex-start;
  & .button-create {
    background-color: #78cd51;
  }
  & .button-cancel {
    background-color: #f67a6e;
  }
}
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  color: #909090;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
