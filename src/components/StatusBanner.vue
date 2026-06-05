<script setup>
import { AlertTriangle, CheckCircle2, Loader2, RefreshCw } from 'lucide-vue-next';

defineProps({
  status: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['retry']);
</script>

<template>
  <section class="status-banner" :class="`status-${status.type}`" aria-live="polite">
    <Loader2 v-if="loading" class="spin" :size="18" aria-hidden="true" />
    <AlertTriangle v-else-if="status.type === 'warning'" :size="18" aria-hidden="true" />
    <CheckCircle2 v-else :size="18" aria-hidden="true" />
    <span>{{ status.message }}</span>
    <button class="icon-button" type="button" title="Odswiez dane" @click="emit('retry')">
      <RefreshCw :size="16" aria-hidden="true" />
    </button>
  </section>
</template>
