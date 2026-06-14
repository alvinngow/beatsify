import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export type CollaborationEvent = {
  projectId: string;
  actorId: string;
  type: "STEP_TOGGLED" | "TRANSPORT_CHANGED" | "SNAPSHOT_SAVED";
  payload: Record<string, unknown>;
};

export function createCollaborationClient(projectId: string, onEvent: (event: CollaborationEvent) => void) {
  const client = new Client({
    webSocketFactory: () => new SockJS("/ws"),
    reconnectDelay: 3000,
    onConnect: () => {
      client.subscribe(`/topic/projects/${projectId}`, (message: IMessage) => {
        onEvent(JSON.parse(message.body) as CollaborationEvent);
      });
    }
  });

  return {
    connect: () => client.activate(),
    disconnect: () => client.deactivate(),
    publish: (event: CollaborationEvent) => {
      client.publish({
        destination: `/app/projects/${projectId}/events`,
        body: JSON.stringify(event)
      });
    }
  };
}

