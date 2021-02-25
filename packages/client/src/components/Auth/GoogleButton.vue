<template>
    <Button color="gray" icon="google" @click="googleLogin">
        Login with Google
    </Button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { openPopup } from "@/compositions/auth";
import { Button } from "@/components/Forms";

const component = defineComponent({
    name: "GoogleAuthButton",
    components: { Button },
    setup() {
        const qs = new URLSearchParams();
        qs.append(
            "client_id",
            "77598589513-08uj972lr28be5cdcl6a2bp8frk3h94j.apps.googleusercontent.com"
        );
        qs.append("redirect_uri", "http://localhost:8081/auth_cb");
        qs.append("scope", "profile email openid");
        qs.append("response_type", "code");
        qs.append("access_type", "offline");
        qs.append("include_granted_scopes", "true");
        const link = `https://accounts.google.com/o/oauth2/v2/auth?${qs.toString()}`;
        const googleLogin = () => {
            openPopup(link, "auth_pop");
        };
        return { googleLogin, link };
    }
});

export default component;
</script>

<style lang="scss" scoped>
</style>