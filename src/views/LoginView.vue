<template>
  <main class="flex items-center justify-center h-screen bg-zinc-100">
    <div class="w-96 bg-white shadow py-8 px-8 relative">
      <div class="flex items-center flex-col text-md text-zinc-700">
        <div class="flex items-center gap-1 px-4">
          <i class="bx bxs-hot text-xl text-purple-700"></i>
          <h1>Comet | <strong class="text-purple-600 font-semibold">Finance</strong></h1>
        </div>
        <p class="text-xs text-zinc-500">Acesse com suas credenciais</p>
      </div>

      <form class="flex flex-col gap-3 mt-6 text-sm" @submit.prevent="submit()">
        <div class="flex flex-col gap-1">
          <label for="email" class="text-zinc-500">E-mail</label>
          <input v-model="formGroup.email" type="email" id="email"
            class="outline-none py-2 border px-3 rounded-sm focus:border-zinc-800" placeholder="Digite seu e-mail"
            autocomplete="off" required>
        </div>
        <div class="flex flex-col gap-1">
          <label for="password" class="text-zinc-500">Senha</label>
          <input v-model="formGroup.password" type="password" id="password"
            class="outline-none py-2 border px-3 rounded-sm focus:border-zinc-800" placeholder="Digite sua senha"
            autocomplete="off" required>
        </div>

        <div class="flex">
          <span class="text-start text-xs text-zinc-600 hover:underline hover:text-purple-600">
            Esqueci minha senha
          </span>
        </div>

        <div class="flex items-center justify-between mt-10">
          <span class="text-zinc-600 text-xs">
            Não possui cadastro?<br />
            <a href="#" class="underline font-medium text-purple-600">Registre-se aqui.</a>
          </span>

          <button
            class="bg-zinc-800 py-2 px-6 rounded-sm text-white font-medium tracking-wide hover:bg-zinc-900">Entrar</button>
        </div>
      </form>
    </div>
  </main>

  <footer class="flex justify-center px-8 text-xs py-4 text-zinc-400 absolute bottom-0 left-0 w-full">
    <p class="text-center">
      Copyright (&copy;) 2023 Comet Finance <br>
      Todos os direitos reservados
    </p>
  </footer>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const formGroup = reactive({
  email: '',
  password: ''
})

const submit = () => {
  if (!formGroup.email || !formGroup.password) {
    alert('Preencha os campos corretamente.')
    return
  }

  formGroup.email = ''
  formGroup.password = ''
  router.push('/dashboard')
}
</script>