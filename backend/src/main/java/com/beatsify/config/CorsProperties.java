package com.beatsify.config;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "beatsify.cors")
public record CorsProperties(List<String> allowedOrigins) {
}

