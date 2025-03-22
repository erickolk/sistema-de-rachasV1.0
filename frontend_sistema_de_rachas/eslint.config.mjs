import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({
  // Configurações básicas
  features: {
    // Habilita regras estilísticas
    stylistic: true
  }
})
  .override('nuxt/typescript', {
    rules: {
      // Desativa a necessidade de importar componentes Vue que o Nuxt já importa automaticamente
      'vue/no-undef-components': 'off',
      // Desativa a necessidade de importar composables do Vue/Nuxt
      'vue/no-undef-properties': 'off',
      // Permite usar defineProps e defineEmits sem importação
      'vue/no-undef-methods': 'off',
      // Permite usar refs e reactive sem importação
      'vue/no-setup-props-reactivity-loss': 'off'
    }
  }) 