package com.kkori.kkori.jobboard.service;

import com.kkori.kkori.jobboard.dto.RegisterJobBoardRequest;
import com.kkori.kkori.jobboard.dto.RegisterJobBoardResponse;
import com.kkori.kkori.jobboard.entity.JobBoard;
import com.kkori.kkori.jobboard.repository.JobBoardRepository;
import com.kkori.kkori.location.dto.LocationRequest;
import com.kkori.kkori.location.entity.LocationInfo;
import com.kkori.kkori.location.repository.LocationRepository;
import com.kkori.kkori.location.service.LocationService;
import com.kkori.kkori.member.entity.Member;
import com.kkori.kkori.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@Slf4j
@RequiredArgsConstructor
public class JobBoardService {

    private final JobBoardRepository jobBoardRepository;
    private final MemberRepository memberRepository;
    private final LocationService locationService;
    private final LocationRepository locationRepository;

    @Transactional
    public RegisterJobBoardResponse register(Long id, RegisterJobBoardRequest request) {
        Member member = memberRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 회원")
        );

        JobBoard jobBoard = request.toJobBoard();
        jobBoard.assignMember(member);

        LocationRequest locationRequest = locationService.callXY(request.getAddress());

        if (locationRequest != null) {
            // 먼저 데이터베이스에서 좌표로 LocationInfo 검색
            LocationInfo locationInfo = locationRepository.findByLatitudeAndLongitude(
                    BigDecimal.valueOf(locationRequest.getLatitude()),
                    BigDecimal.valueOf(locationRequest.getLongitude())
            ).orElseGet(() ->
                    locationService.callApi(locationRequest));

            jobBoard.assignLocation(locationInfo);
        }

        return new RegisterJobBoardResponse(jobBoardRepository.save(jobBoard));
    }
}
