package com.kkori.kkori.member.auth.tokens;

import com.kkori.kkori.error.entity.CustomException;
import com.kkori.kkori.error.entity.ErrorCode;
import io.jsonwebtoken.JwtException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//        String token = resolveToken((HttpServletRequest) request);
//        try {
//            // 토큰 유효성 검사
//            if (token!=null && jwtTokenProvider.validateToken(token)) {
//                Authentication authentication = jwtTokenProvider.getAuthentication(token);
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//            chain.doFilter(request, response);
//        } catch (JwtException e){
//            setErrorResponse(response);
//        }
//
//    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request);
        try {
            // 토큰 유효성 검사
            if (token!=null && jwtTokenProvider.validateToken(token)) {
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        } catch (JwtException e){
            setErrorResponse(response);
        }
    }

    public void setErrorResponse(HttpServletResponse res) throws IOException {
        CustomException customException = new CustomException(ErrorCode.AT_UNAUTHORIZED_ERROR);
        res.setHeader("Content-Type","text/plain;charset=utf-8" );
        res.setStatus(customException.getErrorCode().getStatus().value());
        res.getWriter().write(customException.getErrorCode().getMessage());
    }
    // 헤더에서 토큰 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
