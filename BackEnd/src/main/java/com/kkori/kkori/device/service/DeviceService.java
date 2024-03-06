package com.kkori.kkori.device.service;


import com.kkori.kkori.device.dto.RegisterDogRequest;
import com.kkori.kkori.device.dto.RegisterDogResponse;
import com.kkori.kkori.device.entity.Device;
import com.kkori.kkori.device.repository.DeviceRepository;
import com.kkori.kkori.member.entity.Member;
import com.kkori.kkori.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeviceService {

    private final DeviceRepository deviceRepository;

    private final MemberRepository memberRepository;

    public RegisterDogResponse registerDog (Long memberId, RegisterDogRequest request){

        Member member = getMember(memberId);

        Device device = request.toDevice();
        device.setMember(member);

        Device saved = deviceRepository.save(device);

        return new RegisterDogResponse(saved);
    }

    private Member getMember(Long id){
          return memberRepository.findById(id)
                .orElseThrow(()
                        -> new IllegalArgumentException("존재하지 않는 회원")
                );

    }

}
