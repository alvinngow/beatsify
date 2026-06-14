package com.beatsify.project;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.UUID;

public final class ProjectDtos {
    private ProjectDtos() {
    }

    public record ProjectRequest(
            @NotBlank String title,
            @Min(40) @Max(240) Integer bpm,
            @NotBlank String ownerId,
            String arrangementSnapshot
    ) {
    }

    public record ProjectResponse(
            UUID id,
            String title,
            Integer bpm,
            String ownerId,
            Instant updatedAt,
            String arrangementSnapshot
    ) {
        static ProjectResponse from(Project project) {
            return new ProjectResponse(
                    project.getId(),
                    project.getTitle(),
                    project.getBpm(),
                    project.getOwnerId(),
                    project.getUpdatedAt(),
                    project.getArrangementSnapshot()
            );
        }
    }
}

