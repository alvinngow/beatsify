package com.beatsify.collaboration;

import java.util.UUID;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CollaborationController {
    @MessageMapping("/projects/{projectId}/events")
    @SendTo("/topic/projects/{projectId}")
    public CollaborationEvent publishProjectEvent(
            @DestinationVariable UUID projectId,
            CollaborationEvent event
    ) {
        return new CollaborationEvent(
                projectId,
                event.actorId(),
                event.type(),
                event.payload(),
                event.occurredAt()
        ).withServerTimestamp();
    }
}

