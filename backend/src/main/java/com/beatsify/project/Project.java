package com.beatsify.project;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer bpm;

    @Column(nullable = false)
    private String ownerId;

    @Column(nullable = false)
    private Instant updatedAt;

    @Column(columnDefinition = "jsonb")
    private String arrangementSnapshot;

    protected Project() {
    }

    public Project(String title, Integer bpm, String ownerId, String arrangementSnapshot) {
        this.title = title;
        this.bpm = bpm;
        this.ownerId = ownerId;
        this.arrangementSnapshot = arrangementSnapshot;
        this.updatedAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Integer getBpm() {
        return bpm;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public String getArrangementSnapshot() {
        return arrangementSnapshot;
    }

    public void update(String title, Integer bpm, String arrangementSnapshot) {
        this.title = title;
        this.bpm = bpm;
        this.arrangementSnapshot = arrangementSnapshot;
        this.updatedAt = Instant.now();
    }
}

