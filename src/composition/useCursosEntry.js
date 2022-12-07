import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getCursosEntry} from "../services/cursos";

export function useCursosEntry() {
    const route = useRoute();
    const entry = ref({
        id:'',
        title:'',
        desc: '',
        text:'',
        price:'',
        user: '',
        date: null,
    })


    onMounted(async () => {
        entry.value = await getCursosEntry(route.params.id)
    })

    return {
        entry
    }
}