import { useUserStore } from "@/stores";
import { useWebSocket } from "@vueuse/core";
import { useMyFetch } from ".";


export function ping(){
  return useMyFetch('/users/ping',{immediate:true}).json<Result<boolean>>()
}

export function wsSystem() {
  return useWebSocket("/ws-api/system/monitor", {
    heartbeat: {
      message:'info',
      interval: 5000,
      pongTimeout:3000
    },
    immediate:false
  });
}
