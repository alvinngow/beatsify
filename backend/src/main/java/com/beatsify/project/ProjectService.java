package com.beatsify.project;

import com.beatsify.project.ProjectDtos.ProjectRequest;
import com.beatsify.project.ProjectDtos.ProjectResponse;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> findByOwner(String ownerId) {
        return projectRepository.findByOwnerIdOrderByUpdatedAtDesc(ownerId)
                .stream()
                .map(ProjectResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse findOne(UUID id) {
        return projectRepository.findById(id)
                .map(ProjectResponse::from)
                .orElseThrow(() -> new ProjectNotFoundException(id));
    }

    @Transactional
    public ProjectResponse create(ProjectRequest request) {
        Project project = new Project(
                request.title(),
                request.bpm(),
                request.ownerId(),
                request.arrangementSnapshot()
        );
        return ProjectResponse.from(projectRepository.save(project));
    }

    @Transactional
    public ProjectResponse update(UUID id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException(id));
        project.update(request.title(), request.bpm(), request.arrangementSnapshot());
        return ProjectResponse.from(project);
    }
}

