package com.kkori.kkori.postlikes.controller;

import com.kkori.kkori.postlikes.dto.PostLikeRequest;
import com.kkori.kkori.postlikes.dto.PostLikeResponse;
import com.kkori.kkori.postlikes.service.PostLikeService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@Api
public class PostLikeController {

    private final PostLikeService postLikeService;

    @PostMapping("/add-like")
    public ResponseEntity<PostLikeResponse> addLike(
            final Authentication authentication,
            @RequestBody PostLikeRequest postLikeRequest) {

        return ResponseEntity.ok(postLikeService.addLike(Long.parseLong(authentication.getName()), postLikeRequest));

    }


}
