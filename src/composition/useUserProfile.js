import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getUserProfile} from "../services/user-profiles.js";

export function useUserProfile() {

    const route = useRoute();
    const user = ref({
        id: '',
        email: '',
        displayName: '',
        photoURL: '',
    });

    onMounted(async () => {
        user.value = await getUserProfile(route.params.id);
        console.log(user.value)
    })

    return {
        user,
    }
}