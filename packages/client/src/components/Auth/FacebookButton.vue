
<template>
    <div>
        <Button color="gray" icon="facebook" @click="logInWithFacebook">
            Login with Facebook
        </Button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button } from "@/components/Forms";
import { openPopup } from "@/compositions/auth";

declare const window: Window & { FB: any; fbAsyncInit: Function };

const component = defineComponent({
    name: "FacebookAuthButton",
    components: { Button },
    setup() {
        const qs = new URLSearchParams();
        qs.append("client_id", "179526800321947");
        qs.append("redirect_uri", "http://localhost:8080/auth_cb");
        qs.append("response_type", "code");
        qs.append("scope", "email,public_profile,user_birthday")
        qs.append("display", "popup");
        qs.append("state", "facebook");

        const link = `https://www.facebook.com/v10.0/dialog/oauth?${qs.toString()}`;

        const logInWithFacebook = () => {
            openPopup(link, "auth_pop");
        };

        return { logInWithFacebook };
    },
});

export default component;
</script>

<style lang="scss" scoped></style>
