package com.kkori.kkori.jobboard.dto;

import com.kkori.kkori.jobboard.entity.JobBoard;
import com.kkori.kkori.location.dto.LocationRequest;
import com.kkori.kkori.validation_field.Content;
import com.kkori.kkori.validation_field.Title;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterJobBoardRequest {

    private String title;

    private String content;

    @NotNull (message = "페이는 빈값일 수 없습니다.")
    private int payment;

    private String address;


    public JobBoard toJobBoard(){
        return JobBoard
                .builder()
                .title(new Title(this.title))
                .content(new Content(this.content))
                .payment(payment)
                .build();

    }
}
