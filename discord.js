// ═══════════════════════════════════════════════════════════════
// DISCORD EMBEDDED APP SDK
// Подключается через esm.sh — не требует сборщика
// ═══════════════════════════════════════════════════════════════

import { DiscordSDK } from "https://esm.sh/@discord/embedded-app-sdk";

// Вставьте сюда ваш Discord Client ID из Discord Developer Portal
const CLIENT_ID = "1281757977929453703";

export const discordSdk = new DiscordSDK(CLIENT_ID);

async function setup() {
    await discordSdk.ready();
    console.log("Discord SDK is ready");
}

setup();
