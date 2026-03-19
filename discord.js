import { DiscordSDK } from "https://esm.sh/@discord/embedded-app-sdk";

const CLIENT_ID = "1281757977929453703";

// Запускаем SDK только если открыто внутри Discord (есть frame_id в URL)
const params = new URLSearchParams(window.location.search);
const isInsideDiscord = params.has("frame_id");

if (isInsideDiscord) {
    const discordSdk = new DiscordSDK(CLIENT_ID);

    try {
        await discordSdk.ready();
        console.log("Discord SDK is ready");
    } catch (e) {
        console.error("Discord SDK error:", e);
    }
} else {
    console.log("Not inside Discord, SDK skipped");