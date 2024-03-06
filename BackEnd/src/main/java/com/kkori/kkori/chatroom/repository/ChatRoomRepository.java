package com.kkori.kkori.chatroom.repository;

import com.kkori.kkori.chatroom.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository <ChatRoom, Long> {
}
