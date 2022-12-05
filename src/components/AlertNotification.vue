
<script setup>
// export default {
//   name: "AlertNotification",
//   props: {
//     type: {
//       type: String,
//       default: 'info'
//     }
//   },
//   computed: {
//     messageTypeText(){
//       switch(this.type) {
//         case 'danger':
//           return 'Error';
//
//         case 'success':
//           return 'Éxisto';
//
//         case 'warning':
//           return 'Advertencia';
//
//         case 'info':
//           return 'Notificación';
//
//         default:
//           return ''
//       }
//     }
//   }
// };

import {computed} from "vue";

const props = defineProps({
    type: {
      type: String,
      default: 'info'
    }
});

defineEmits(['close']);

const messageTypeText = computed(() => {
  switch(props.type) {
        case 'danger':
          return 'Error';

        case 'success':
          return 'Éxisto';

        case 'warning':
          return 'Advertencia';

        case 'info':
          return 'Notificación';

        default:
          return '';
      }
});
</script>

<template>
  <div
      :class="['alert', `alert-${type}`]"
      role="alert">
    <span class="visually-hidden"> {{messageTypeText}}</span>
    <slot />
  </div>
</template>

