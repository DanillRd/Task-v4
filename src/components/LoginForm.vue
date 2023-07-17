<template>
  <div class="registration-cssave">
    <div class="form-container">
      <form v-if="showForm" @submit.prevent="submitForm" class="login-form">
        <h3 class="text-center">Форма входа</h3>
        <div class="form-group">
          <input class="form-control item" type="text" name="username" maxlength="40" minlength="4" pattern="^[a-zA-Z0-9_.-]*$" id="username" placeholder="Логин" required v-model="formData.name">
        </div>
        <div class="form-group">
          <input class="form-control item" type="password" name="password" minlength="6" id="password" placeholder="Пароль" required v-model="formData.pass">
        </div>
        <div class="form-group">
          <input class="form-control item" type="number" name="age" id="age" placeholder="Возраст" required v-model="formData.age">
        </div>
        <div class="form-group">
          <input class="form-control item" type="email" name="email" id="email" placeholder="Email" required v-model="formData.email">
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block create-account" type="submit">Вход в аккаунт</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { saveDataToIndexedDB } from '/src/components/indexeddb';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const showForm = ref(true);
    const formData = ref({
      name: '',
      pass: '',
      age: '',
      email: '',
    });

    const formErrors = ref({
      name: '',
      pass: '',
      age: '',
      email: '',
    });

    const router = useRouter();

    const toggleForm = () => {
      if (showForm.value) {
        formData.value = {
          name: '',
          pass: '',
          age: '',
          email: '',
        };
        formErrors.value = {};
      }
      showForm.value = !showForm.value;
    };

    const submitForm = () => {
      formErrors.value = {};

      if (!formData.value.name) {
        formErrors.value.name = 'Логин обязателен.';
      }

      if (!formData.value.age) {
        formErrors.value.age = 'Возраст обязателен.';
      } else if (isNaN(formData.value.age) || formData.value.age <= 0) {
        formErrors.value.age = 'Некорректный возраст.';
      }

      if (!validateEmail(formData.value.email)) {
        formErrors.value.email = 'Некорректный формат email.';
      }

      if (Object.keys(formErrors.value).length === 0) {
        saveDataToIndexedDB(formData.value)
            .then(() => {
              console.log('Данные успешно сохранены в IndexedDB:', formData.value);
              router.push('/MoviePage'); // Правильный путь к компоненту MoviePage
            })
            .catch((error) => {
              console.error('Ошибка при сохранении данных в IndexedDB:', error);
            });
      }
    };

    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    const hasErrors = computed(() => {
      return Object.values(formErrors.value).some(error => error !== '');
    });

    return {
      showForm,
      formData,
      formErrors,
      toggleForm,
      submitForm,
      hasErrors,
    };
  },
};
</script>

<style>
html {
  background-color:#214c84;
  background-blend-mode:overlay;
  display:flex;
  align-items:center;
  justify-content:center;
  background-repeat:no-repeat;
  background-size:cover;
  height:100%;
}
.text-center {
  align-content: center;
  text-align: center;
}
body {
  background-color:transparent;
}

.registration-cssave{
  padding:50px 0;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.registration-cssave form {
  max-width:800px;
  padding:50px 70px;
  border-radius:10px;
  box-shadow:4px 4px 15px rgba(0, 0, 0, 0.2);
  background-color:#fff;
}

.registration-cssave form h3 {
  font-weight:bold;
  margin-bottom:30px;
}

.registration-cssave .item {
  border-radius:10px;
  margin-bottom:25px;
  padding:10px 20px;
}

.registration-cssave .create-account {
  border-radius:30px;
  padding:10px 20px;
  font-size:18px;
  font-weight:bold;
  background-color:#3f93ff;
  border:none;
  color:white;
  margin-top:20px;
}
.error {
  color: red;
}

@media (max-width: 576px) {
  .registration-cssave form {
    padding:50px 20px;
  }
}
</style>













