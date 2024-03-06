package com.kkori.kkori.member.entity;

import com.kkori.kkori.chatroom.entity.ChatRoom;
import com.kkori.kkori.baseEntity.BaseEntity;
import com.kkori.kkori.device.entity.Device;
import com.kkori.kkori.location.userregion.entity.UserRegion;
import com.kkori.kkori.postlikes.entity.PostLikes;
import com.kkori.kkori.review.entity.Review;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@EqualsAndHashCode
@DynamicInsert
@ToString
public class Member extends BaseEntity {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String code;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String birthday;
    @Column(nullable = false)
    private String gender;

    @Enumerated(EnumType.STRING)
    private OAuthProvider oAuthProvider;
    @Column(nullable = true, name = "refresh_token") // 초기에는 없음
    private String refreshToken;
    @Embedded
    private MemberInfo memberInfo;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserRegion> userRegions = new HashSet<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostLikes> postLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatRoom> chatRooms = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Device> devices = new ArrayList<>();

    public void reJoinMember(MemberInfo memberInfo){
        this.memberInfo = memberInfo;
    }
    // 비즈니스 로직
    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void deleteRefreshToken() {
        this.refreshToken = null;
    }
}
