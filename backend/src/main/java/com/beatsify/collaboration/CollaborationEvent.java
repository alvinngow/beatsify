package com.beatsify.collaboration;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

public record CollaborationEvent(
        UUID projectId,
        String actorId,
        String type,
        Map<String, Object> payload,
        Instant occurredAt
) {
    public CollaborationEvent withServerTimestamp() {
        return new CollaborationEvent(projectId, actorId, type, payload, Instant.now());
    }
}

